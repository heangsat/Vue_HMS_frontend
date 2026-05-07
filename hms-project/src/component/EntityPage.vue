<script setup>
import { computed, ref, watch } from 'vue'
import { CirclePlus, Filter, PencilLine, Search, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  columns: { type: Array, required: true },
  initialRows: { type: Array, default: () => [] },
  primaryKey: { type: String, default: '' },
  onUpdate: { type: Function, default: null },
})

const rows = ref([])
const search = ref('')
const showForm = ref(false)
const form = ref({})
const editingRow = ref(null)
const submitError = ref('')
const saving = ref(false)

const summaryCards = computed(() => [
  { label: 'Total Rows', value: rows.value.length },
  { label: 'Shown Rows', value: filteredRows.value.length },
  { label: 'Columns', value: props.columns.length },
  { label: 'Required Fields', value: props.columns.filter((column) => column.required).length },
])

const resetForm = () => {
  const next = {}

  for (const column of props.columns) {
    if (column.type === 'number') {
      next[column.key] = null
    } else {
      next[column.key] = ''
    }
  }

  form.value = next
}

watch(
  () => props.initialRows,
  (data) => {
    rows.value = data.map((item) => ({ ...item }))
  },
  { immediate: true },
)

watch(
  () => props.columns,
  () => {
    resetForm()
  },
  { immediate: true },
)

const filteredRows = computed(() => {
  if (!search.value.trim()) {
    return rows.value
  }

  const keyword = search.value.trim().toLowerCase()

  return rows.value.filter((row) =>
    props.columns.some((column) => String(row[column.key] ?? '').toLowerCase().includes(keyword)),
  )
})

const totalFields = computed(() => props.columns.length)

const getInputType = (column) => {
  if (column.type === 'number') return 'number'
  if (column.type === 'date') return 'date'
  if (column.type === 'time') return 'time'
  if (column.type === 'email') return 'email'
  return 'text'
}

const getNextPrimaryKey = () => {
  if (!props.primaryKey) return null

  const numericIds = rows.value
    .map((row) => Number(row[props.primaryKey]))
    .filter((value) => Number.isFinite(value))

  if (!numericIds.length) return 1

  return Math.max(...numericIds) + 1
}

const addRow = async () => {
  submitError.value = ''
  saving.value = true

  const nextRow = {}

  for (const column of props.columns) {
    let value = form.value[column.key]

    if (column.type === 'number' && value !== null && value !== '') {
      value = Number(value)
    }

    nextRow[column.key] = value
  }

  if (props.primaryKey && (nextRow[props.primaryKey] === null || nextRow[props.primaryKey] === '')) {
    nextRow[props.primaryKey] = getNextPrimaryKey()
  }

  try {
    if (editingRow.value) {
      const targetIndex = rows.value.findIndex((item) => item === editingRow.value)
      if (targetIndex !== -1) {
        if (props.onUpdate) {
          const updated = await props.onUpdate(nextRow, editingRow.value)
          rows.value[targetIndex] = updated ? { ...updated } : nextRow
        } else {
          rows.value[targetIndex] = nextRow
        }
      }
    } else {
      rows.value.unshift(nextRow)
    }

    editingRow.value = null
    resetForm()
    showForm.value = false
  } catch (error) {
    submitError.value = error?.message || 'Failed to save changes.'
  } finally {
    saving.value = false
  }
}

const removeRow = (row) => {
  const targetIndex = rows.value.findIndex((item) => item === row)
  if (targetIndex !== -1) {
    rows.value.splice(targetIndex, 1)
  }

  if (editingRow.value === row) {
    editingRow.value = null
    resetForm()
  }
}

const updateRow = (row) => {
  editingRow.value = row
  form.value = { ...row }
  showForm.value = true
}

const cancelEdit = () => {
  editingRow.value = null
  resetForm()
  showForm.value = false
}

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  return value
}
</script>

<template>
  <section class="space-y-5">
    <header class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">{{ title }}</h2>
          <p v-if="description" class="mt-1 text-sm text-slate-600">{{ description }}</p>
        </div>

        <div class="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <label
            class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500"
          >
            <Search class="h-4 w-4" />
            <input
              v-model="search"
              type="text"
              placeholder="Search rows..."
              class="w-full bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none sm:w-52"
            />
          </label>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-1 rounded-lg border border-indigo-100 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            @click="showForm = !showForm"
          >
            <CirclePlus class="h-4 w-4" />
            {{ showForm ? 'Close Form' : 'Add Row' }}
          </button>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <article
          v-for="card in summaryCards"
          :key="card.label"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2"
        >
          <p class="text-xs text-slate-500">{{ card.label }}</p>
          <p class="text-base font-semibold text-slate-900">{{ card.value }}</p>
        </article>
      </div>
    </header>

    <form
      v-if="showForm"
      class="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3"
      @submit.prevent="addRow"
    >
      <label v-for="column in columns" :key="column.key" class="flex flex-col gap-1 text-sm text-slate-700">
        <span class="inline-flex items-center gap-1">
          {{ column.label }}
          <span v-if="column.required" class="text-rose-500">*</span>
        </span>
        <select
          v-if="column.options?.length"
          v-model="form[column.key]"
          class="rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          :required="column.required"
        >
          <option disabled value="">Select {{ column.label }}</option>
          <option v-for="option in column.options" :key="option" :value="option">{{ option }}</option>
        </select>

        <input
          v-else
          v-model="form[column.key]"
          :type="getInputType(column)"
          class="rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          :required="column.required"
        />
      </label>

      <div class="md:col-span-3">
        <p v-if="submitError" class="mb-2 text-sm text-rose-600">{{ submitError }}</p>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            :disabled="saving"
            class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {{ saving ? 'Saving...' : editingRow ? 'Update Row' : 'Save Row' }}
          </button>
          <button
            v-if="editingRow"
            type="button"
            class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
            @click="cancelEdit"
          >
            Cancel
          </button>
          <span class="text-xs text-slate-500">Required inputs: {{ columns.filter((column) => column.required).length }} / {{ totalFields }}</span>
        </div>
      </div>
    </form>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2">
        <p class="text-sm font-semibold text-slate-700">Records</p>
        <span class="inline-flex items-center gap-1 text-xs text-slate-500">
          <Filter class="h-3.5 w-3.5" />
          Showing {{ filteredRows.length }} of {{ rows.length }}
        </span>
      </div>
      <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-white text-left">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {{ column.label }}
            </th>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="!filteredRows.length">
            <td :colspan="columns.length + 1" class="px-4 py-6 text-center text-slate-500">
              No rows found.
            </td>
          </tr>

          <tr
            v-for="(row, index) in filteredRows"
            :key="`${row[primaryKey] ?? index}-${index}`"
            class="hover:bg-slate-50"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-3 text-slate-700"
            >
              {{ formatValue(row[column.key]) }}
            </td>
            <td class="px-4 py-3">
              <button
                type="button"
                class="mr-2 inline-flex items-center gap-1 rounded-md bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-200"
                @click="updateRow(row)"
              >
                <PencilLine class="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200"
                @click="removeRow(row)"
              >
                <Trash2 class="h-3.5 w-3.5" />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </section>
</template>
