<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import './style.css'
import Sidebar from './component/Sidebar.vue'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Bell, Search } from 'lucide-vue-next'

const route = useRoute()
const isAuthPage = computed(() => Boolean(route.meta.authPage))
const pageTitle = computed(() => {
  if (route.path === '/') return 'Dashboard'
  return String(route.name || 'Module')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
})
</script>

<template>
  <RouterView v-if="isAuthPage" />

  <div v-else class="flex min-h-screen bg-slate-50">
    <Sidebar />

    <div class="flex h-screen w-full flex-col overflow-hidden">
      <header class="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div class="flex items-center gap-4">
          <Avatar class="h-11 w-11">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDrYivPm-jDhormbZBCzy2zsqQJyY_tJUVLF4cuC6TiA&s"
              alt="User Avatar"
            />
            <AvatarFallback>ADM</AvatarFallback>
          </Avatar>
          <div>
            <h1 class="text-xl font-semibold text-slate-900">HMS Management Portal</h1>
            <p class="text-sm text-slate-500">{{ pageTitle }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Search class="h-4 w-4" />
            Search
          </button>
          <button
            type="button"
            class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
          >
            <Bell class="h-4 w-4" />
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-auto p-5">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
