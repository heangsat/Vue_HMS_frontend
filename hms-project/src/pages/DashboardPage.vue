<script setup>
import { computed } from 'vue'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BedDouble,
  CalendarClock,
  Clock3,
  DollarSign,
  Stethoscope,
  UserRound,
  Users,
} from 'lucide-vue-next'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const kpis = [
  { label: 'Today Appointments', value: 42, trend: 12, icon: CalendarClock, color: 'text-indigo-600' },
  { label: 'Admitted Patients', value: 18, trend: 4, icon: BedDouble, color: 'text-sky-600' },
  { label: 'Doctors On Duty', value: 23, trend: 2, icon: Stethoscope, color: 'text-emerald-600' },
  { label: 'Today Revenue', value: '$12,480', trend: 8, icon: DollarSign, color: 'text-amber-600' },
]

const appointmentTrend = [
  { day: 'Mon', total: 26 },
  { day: 'Tue', total: 31 },
  { day: 'Wed', total: 29 },
  { day: 'Thu', total: 34 },
  { day: 'Fri', total: 38 },
  { day: 'Sat', total: 24 },
  { day: 'Sun', total: 18 },
]

const maxTrend = computed(() => Math.max(...appointmentTrend.map((item) => item.total)))

const recentAppointments = [
  { id: '#APT-1291', patient: 'Sokha Chea', doctor: 'Dr. Lina', time: '09:30 AM', status: 'Confirmed' },
  { id: '#APT-1292', patient: 'Dara Meas', doctor: 'Dr. Rith', time: '10:15 AM', status: 'Scheduled' },
  { id: '#APT-1293', patient: 'Nary Sok', doctor: 'Dr. Rina', time: '11:00 AM', status: 'Completed' },
  { id: '#APT-1294', patient: 'Piseth Nho', doctor: 'Dr. Bora', time: '01:45 PM', status: 'Scheduled' },
]

const lowStockMedicines = [
  { name: 'Amoxicillin 500mg', left: 14 },
  { name: 'Paracetamol Syrup', left: 9 },
  { name: 'Metformin 850mg', left: 7 },
  { name: 'Omeprazole 20mg', left: 6 },
]

const quickActions = [
  { label: 'New Patient', route: '/patients', icon: UserRound },
  { label: 'Book Appointment', route: '/appointments', icon: CalendarClock },
  { label: 'Create Bill', route: '/bills', icon: DollarSign },
  { label: 'Manage Staff', route: '/staff', icon: Users },
]

const timeline = [
  { time: '08:30', title: 'Cardiology rounds', meta: 'Ward A - Dr. Lina' },
  { time: '10:00', title: 'Orthopedic follow-up', meta: 'Room 3 - Dr. Rith' },
  { time: '13:00', title: 'Surgery prep review', meta: 'Ward C - Team 2' },
  { time: '15:30', title: 'Department briefing', meta: 'Meeting room - All heads' },
]

const statusClass = {
  Confirmed: 'bg-emerald-50 text-emerald-700',
  Scheduled: 'bg-amber-50 text-amber-700',
  Completed: 'bg-sky-50 text-sky-700',
}
</script>

<template>
  <section class="space-y-6">
    <header
      class="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-5 shadow-sm sm:p-6"
    >
      <p class="text-sm text-slate-500">{{ today }}</p>
      <h2 class="mt-1 text-2xl font-bold text-slate-900">Hospital Dashboard</h2>
      <p class="mt-2 text-sm text-slate-600">
        Live operational view with appointments, alerts, and quick actions.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="item in kpis"
        :key="item.label"
        class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <p class="text-sm text-slate-500">{{ item.label }}</p>
          <component :is="item.icon" class="h-5 w-5" :class="item.color" />
        </div>
        <p class="mt-2 text-2xl font-semibold text-slate-900">{{ item.value }}</p>
        <p class="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <Activity class="h-3.5 w-3.5" />
          +{{ item.trend }}% vs last week
        </p>
      </article>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-900">7-Day Appointment Trend</h3>
          <router-link to="/appointments" class="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all
          </router-link>
        </div>
        <div class="grid h-44 grid-cols-7 items-end gap-2">
          <div
            v-for="item in appointmentTrend"
            :key="item.day"
            class="flex flex-col items-center gap-2"
          >
            <div class="w-full rounded-md bg-slate-100 p-1">
              <div
                class="w-full rounded bg-indigo-500 transition-all"
                :style="{ height: `${Math.max((item.total / maxTrend) * 120, 12)}px` }"
              />
            </div>
            <p class="text-xs text-slate-500">{{ item.day }}</p>
          </div>
        </div>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-900">Low-Stock Alerts</h3>
          <AlertTriangle class="h-4 w-4 text-amber-500" />
        </div>
        <div class="space-y-3">
          <div
            v-for="item in lowStockMedicines"
            :key="item.name"
            class="rounded-lg border border-amber-100 bg-amber-50/40 px-3 py-2"
          >
            <p class="text-sm font-medium text-slate-800">{{ item.name }}</p>
            <p class="text-xs text-amber-700">{{ item.left }} units left</p>
          </div>
        </div>
        <router-link
          to="/medicines"
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
        >
          Refill medicine stock
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </article>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-900">Recent Appointments</h3>
          <router-link to="/appointments" class="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Open module
          </router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="text-slate-500">
              <tr>
                <th class="py-2 pr-4 font-medium">ID</th>
                <th class="py-2 pr-4 font-medium">Patient</th>
                <th class="py-2 pr-4 font-medium">Doctor</th>
                <th class="py-2 pr-4 font-medium">Time</th>
                <th class="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in recentAppointments"
                :key="item.id"
                class="border-t border-slate-100"
              >
                <td class="py-2.5 pr-4 font-medium text-slate-800">{{ item.id }}</td>
                <td class="py-2.5 pr-4 text-slate-700">{{ item.patient }}</td>
                <td class="py-2.5 pr-4 text-slate-700">{{ item.doctor }}</td>
                <td class="py-2.5 pr-4 text-slate-700">{{ item.time }}</td>
                <td class="py-2.5">
                  <span
                    class="rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="statusClass[item.status]"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Quick Actions</h3>
        <div class="space-y-2">
          <router-link
            v-for="item in quickActions"
            :key="item.label"
            :to="item.route"
            class="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <span class="flex items-center gap-2">
              <component :is="item.icon" class="h-4 w-4 text-indigo-500" />
              {{ item.label }}
            </span>
            <ArrowRight class="h-4 w-4 text-slate-400" />
          </router-link>
        </div>
      </article>
    </div>

    <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="mb-3 text-base font-semibold text-slate-900">Today Schedule Timeline</h3>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="item in timeline"
          :key="item.time"
          class="rounded-lg border border-slate-200 bg-slate-50 p-3"
        >
          <p class="flex items-center gap-1 text-xs font-semibold text-indigo-600">
            <Clock3 class="h-3.5 w-3.5" />
            {{ item.time }}
          </p>
          <p class="mt-1 text-sm font-medium text-slate-800">{{ item.title }}</p>
          <p class="text-xs text-slate-500">{{ item.meta }}</p>
        </div>
      </div>
    </article>
  </section>
</template>
