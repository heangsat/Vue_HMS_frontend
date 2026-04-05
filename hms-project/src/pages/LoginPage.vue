<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

const form = ref({
  email: '',
  password: '',
})

const onSubmit = () => {
  // Placeholder submit. Hook your authentication API here later.
  console.log('Login payload:', form.value)
}
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-sky-50 to-cyan-100 px-4"
  >
    <section class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <h1 class="text-2xl font-bold text-slate-800">Login</h1>
      <p class="mt-1 text-sm text-slate-500">Sign in to your HMS account.</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <Input v-model="form.email" type="email" placeholder="you@hospital.com" required />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <Input v-model="form.password" type="password" placeholder="Enter password" required />
        </div>

        <Button type="submit" class="w-full bg-blue-600 text-white hover:bg-blue-700">Sign In</Button>
      </form>

      <p class="mt-4 text-center text-sm text-slate-600">
        No account yet?
        <RouterLink to="/register" class="font-semibold text-blue-600 hover:text-blue-700">
          Create one
        </RouterLink>
      </p>
    </section>
  </main>
</template>
