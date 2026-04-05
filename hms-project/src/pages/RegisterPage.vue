<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const onSubmit = () => {
  // Placeholder submit. Hook your registration API here later.
  console.log('Register payload:', form.value)
}
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-cyan-100 via-sky-50 to-slate-100 px-4"
  >
    <section class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <h1 class="text-2xl font-bold text-slate-800">Register</h1>
      <p class="mt-1 text-sm text-slate-500">Create your HMS account for future authentication.</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
          <Input v-model="form.fullName" type="text" placeholder="Your name" required />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <Input v-model="form.email" type="email" placeholder="you@hospital.com" required />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <Input v-model="form.password" type="password" placeholder="Create password" required />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
          <Input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />
        </div>

        <Button type="submit" class="w-full bg-emerald-600 text-white hover:bg-emerald-700">
          Create Account
        </Button>
      </form>

      <p class="mt-4 text-center text-sm text-slate-600">
        Already have an account?
        <RouterLink to="/login" class="font-semibold text-blue-600 hover:text-blue-700">Login</RouterLink>
      </p>
    </section>
  </main>
</template>
