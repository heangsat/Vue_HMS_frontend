<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import './style.css'
import Sidebar from './component/Sidebar.vue'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

const route = useRoute()
const isAuthPage = computed(() => Boolean(route.meta.authPage))
</script>

<template>
  <RouterView v-if="isAuthPage" />

  <div v-else class="flex">
    <Sidebar />

    <div class="flex flex-col w-full h-screen">
      <div class="flex p-5 h-24 border-b-2 border-gray-300">
        <div class="flex items-center gap-4">
          <Avatar class="w-16 h-16 mr-4">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDrYivPm-jDhormbZBCzy2zsqQJyY_tJUVLF4cuC6TiA&s"
              alt="User Avatar"
            />
            <AvatarFallback>Fiizard</AvatarFallback>
          </Avatar>
          <h1 class="text-2xl font-bold">HMS Admin Dashboard</h1>
        </div>
      </div>
      <div class="m-4 mr-0 p-4 border-2 border-gray-300 bg-stone-100 rounded-l-lg">
        <RouterView />
      </div>
      <!-- Layout table  -->
    </div>
  </div>
</template>

<style scoped></style>
