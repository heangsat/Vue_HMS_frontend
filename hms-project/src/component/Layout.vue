<script setup>
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Search } from 'lucide-vue-next'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <router-link to="/add-user">
        <Button
          class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          + Add User
        </Button>
      </router-link>
      <Button>+Add Doctor</Button>
      <div class="flex items-center gap-2">
        <Input placeholder="Search..." class="ml-4 px-10" />
        <Button class="bg-gray-200 hover:bg-gray-600 p-2 rounded-full">
          <Search class="w-10 h-10 text-gray-500" />
        </Button>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 font-medium text-gray-900">ID</th>
            <th class="px-6 py-4 font-medium text-gray-900">Name</th>
            <th class="px-6 py-4 font-medium text-gray-900">Email</th>
            <th class="px-6 py-4 font-medium text-gray-900">Role</th>
            <th class="px-6 py-4 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr v-for="user in usersStore.users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <Button class="text-sky-600 font-medium bg-sky-100 hover:bg-blue-300">Edit</Button>
              <Button class="text-red-600 font-medium bg-red-100 hover:bg-red-300 ml-2"
                >Delete</Button
              >
              <Button class="text-green-600 font-medium bg-green-100 hover:bg-green-300 ml-2"
                >Update</Button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
