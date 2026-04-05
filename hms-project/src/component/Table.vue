<script setup></script>

<template>
  <script setup>
    const users = [
      { id: 1, name: 'Alex Rivera', email: 'alex@example.com', role: 'Admin' },
      { id: 2, name: 'Jordan Smith', email: 'jordan@example.com', role: 'Editor' },
      { id: 3, name: 'Taylor Otwell', email: 'taylor@example.com', role: 'Viewer' },
    ]
  </script>

  <template>
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
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
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
              <button class="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>
