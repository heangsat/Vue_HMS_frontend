<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const usersStore = useUsersStore()

const newUser = ref({
  name: '',
  email: '',
  role: 'Viewer',
})

const addUser = () => {
  if (newUser.value.name && newUser.value.email) {
    usersStore.addUser(newUser.value)

    newUser.value = { name: '', email: '', role: 'Viewer' }
    router.push('/')
  }
}
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div
      class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border rounded-lg shadow-sm"
    >
      <input
        v-model="newUser.name"
        placeholder="Name"
        class="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        v-model="newUser.email"
        placeholder="Email"
        class="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <select v-model="newUser.role" class="border p-2 rounded bg-white">
        <option>Admin</option>
        <option>Editor</option>
        <option>Viewer</option>
      </select>
      <button
        @click="addUser"
        class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add User
      </button>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 font-medium text-gray-900">ID</th>
            <th class="px-6 py-4 font-medium text-gray-900">Name</th>
            <th class="px-6 py-4 font-medium text-gray-900">Email</th>
            <th class="px-6 py-4 font-medium text-gray-900">Role</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr v-for="user in usersStore.users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
              >
                {{ user.role }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
