<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  CalendarCheck,
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
  ShieldPlus,
} from 'lucide-vue-next'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'

defineOptions({
  name: 'MainSidebar',
})

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { name: 'Doctors', icon: Stethoscope, to: '/doctors' },
  { name: 'Patients', icon: Users, to: '/patients' },
  { name: 'Departments', icon: Building2, to: '/departments' },
  { name: 'Medicines', icon: Pill, to: '/medicines' },
  { name: 'Medical Record', icon: FileText, to: '/medical-records' },
  { name: 'Prescriptions', icon: ScrollText, to: '/prescriptions' },
  { name: 'Prescription Detail', icon: ClipboardList, to: '/prescription-details' },
  { name: 'Staff', icon: UserCog, to: '/staff' },
  { name: 'Wards', icon: Bed, to: '/wards' },
  { name: 'Inpatients', icon: Hospital, to: '/inpatients' },
  { name: 'Bills', icon: Receipt, to: '/bills' },
  { name: 'Appointments', icon: CalendarCheck, to: '/appointments' },
]

const activeItem = computed(() => menuItems.find((item) => item.to === route.path)?.name || 'Dashboard')

const getLinkClass = (path) =>
  path === route.path
    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
</script>

<template>
  <aside
    class="flex h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-5"
  >
    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div class="flex items-center gap-3">
        <Avatar class="h-10 w-10">
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDrYivPm-jDhormbZBCzy2zsqQJyY_tJUVLF4cuC6TiA&s"
            alt="User Avatar"
          />
          <AvatarFallback>ADM</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-semibold text-slate-900">HMS Admin</p>
          <p class="text-xs text-slate-500">Operations Center</p>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-xs text-slate-600">
        <ShieldPlus class="h-4 w-4 text-emerald-600" />
        Active page: <span class="font-semibold text-slate-800">{{ activeItem }}</span>
      </div>
    </div>

    <div class="mt-5 flex flex-1 flex-col justify-between">
      <nav class="flex-1 space-y-1.5">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition"
          :class="getLinkClass(item.to)"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="mt-4 border-t border-slate-200 pt-4">
        <router-link
          to="/login"
          class="flex w-full items-center gap-2 rounded-lg border border-rose-100 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut class="h-4 w-4" />
          Back to login
        </router-link>
      </div>
    </div>
  </aside>
</template>
