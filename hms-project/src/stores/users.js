import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    { id: 1, name: 'Alex Rivera', email: 'alex@example.com', role: 'Admin' },
    { id: 2, name: 'Jordan Smith', email: 'jordan@example.com', role: 'Editor' },
    { id: 3, name: 'Taylor Otwell', email: 'taylor@example.com', role: 'Viewer' },
  ])

  const addUser = (user) => {
    users.value.push({
      id: Date.now(),
      ...user,
    })
  }

  return { users, addUser }
})
