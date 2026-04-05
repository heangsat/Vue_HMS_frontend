<script setup>
import { computed, ref, watch } from 'vue'

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
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">{{ title }}</h2>
        <p v-if="description" class="text-sm text-slate-500">{{ description }}</p>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row">
        <input
          v-model="search"
          type="text"
          placeholder="Search rows..."
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-56"
        />
        <button
          type="button"
          class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          @click="showForm = !showForm"
        >
          {{ showForm ? 'Close Form' : 'Add Row' }}
        </button>
      </div>
    </div>

    <form
      v-if="showForm"
      class="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-3"
      @submit.prevent="addRow"
    >
      <label v-for="column in columns" :key="column.key" class="flex flex-col gap-1 text-sm text-slate-700">
        {{ column.label }}
        <select
          v-if="column.options?.length"
          v-model="form[column.key]"
          class="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          :required="column.required"
        >
          <option disabled value="">Select {{ column.label }}</option>
          <option v-for="option in column.options" :key="option" :value="option">{{ option }}</option>
        </select>

        <input
          v-else
          v-model="form[column.key]"
          :type="getInputType(column)"
          class="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          :required="column.required"
        />
      </label>

      <div class="md:col-span-3">
        <p v-if="submitError" class="mb-2 text-sm text-rose-600">{{ submitError }}</p>
        <button
          type="submit"
          :disabled="saving"
          class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          {{ saving ? 'Saving...' : editingRow ? 'Update Row' : 'Save Row' }}
        </button>
        <button
          v-if="editingRow"
          type="button"
          class="ml-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </form>

    <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-100 text-left">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-3 font-semibold text-slate-700"
            >
              {{ column.label }}
            </th>
            <th class="px-4 py-3 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="!filteredRows.length">
            <td :colspan="columns.length + 1" class="px-4 py-6 text-center text-slate-500">
              No rows found.
            </td>
          </tr>

          <tr v-for="(row, index) in filteredRows" :key="`${row[primaryKey] ?? index}-${index}`">
            <td
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-3 text-slate-700"
            >
              {{ row[column.key] }}
            </td>
            <td class="px-4 py-3">
              <button
                type="button"
                class="mr-2 rounded-md bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-200"
                @click="updateRow(row)"
              >
                Update
              </button>
              <button
                type="button"
                class="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200"
                @click="removeRow(row)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
