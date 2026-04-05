<script setup>
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Building2,
  Pill,
  FileText,
  ScrollText,
  ClipboardList,
  UserCog,
  Bed,
  Hospital,
  Receipt,
  LogOut,
} from 'lucide-vue-next'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { name: 'Doctor', icon: Stethoscope, to: '/doctors' },
  { name: 'Patient', icon: Users, to: '/patients' },
  { name: 'Department', icon: Building2, to: '/departments' },
  { name: 'Medicine', icon: Pill, to: '/medicines' },
  { name: 'Medical Record', icon: FileText, to: '/medical-records' },
  { name: 'Prescription', icon: ScrollText, to: '/prescriptions' },
  { name: 'Prescription Detail', icon: ClipboardList, to: '/prescription-details' },
  { name: 'Staff', icon: UserCog, to: '/staff' },
  { name: 'Ward', icon: Bed, to: '/wards' },
  { name: 'Inpatient', icon: Hospital, to: '/inpatients' },
  { name: 'Bill', icon: Receipt, to: '/bills' },
  { name: 'Appointment', icon: ClipboardList, to: '/appointments' },
]
</script>

<template>
  <aside
    class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700"
  >
    <div class="flex items-center gap-x-2 px-2">
      <div class="relative">
        <Avatar>
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDrYivPm-jDhormbZBCzy2zsqQJyY_tJUVLF4cuC6TiA&s"
            alt="User Avatar"
          />
          <AvatarFallback>Fiizard</AvatarFallback>
        </Avatar>
      </div>
      <span class="text-xl font-bold dark:text-white">HMS Admin</span>
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav class="flex-1 -mx-3 space-y-3">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="mx-2 text-sm font-medium">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="mt-6">
      <router-link to="/login"> ">
        <button
          class="flex items-center w-full px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
        >
          <LogOut class="w-5 h-5"/>
          <span class="mx-2 text-sm font-medium">Login</span>
        </button>
      </router-link>
      </div>
    </div>
  </aside>
</template>
