<script setup>
const modules = [
  { name: 'Doctor', route: '/doctors', note: 'Manage doctors and specialization.' },
  { name: 'Patient', route: '/patients', note: 'Patient demographics and registration.' },
  { name: 'Department', route: '/departments', note: 'Hospital departments.' },
  { name: 'Medicine', route: '/medicines', note: 'Medicine stock and pricing.' },
  { name: 'MedicalRecord', route: '/medical-records', note: 'Clinical visits and diagnosis.' },
  { name: 'Prescription', route: '/prescriptions', note: 'Prescription headers.' },
  { name: 'PrescriptionDetail', route: '/prescription-details', note: 'Prescription line items.' },
  { name: 'Staff', route: '/staff', note: 'Hospital staff records.' },
  { name: 'Ward', route: '/wards', note: 'Room and ward availability.' },
  { name: 'Inpatient', route: '/inpatients', note: 'Admissions and discharge.' },
  { name: 'Bill', route: '/bills', note: 'Billing and payment status.' },
  { name: 'Appointment', route: '/appointments', note: 'Doctor appointments.' },
]
</script>

<template>
  <section class="space-y-5">
    <header>
      <h2 class="text-2xl font-bold text-slate-800">Hospital Modules</h2>
      <p class="text-sm text-slate-500">Each card opens the table page mapped to your database schema.</p>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <router-link
        v-for="module in modules"
        :key="module.name"
        :to="module.route"
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      >
        <h3 class="text-lg font-semibold text-slate-800">{{ module.name }}</h3>
        <p class="mt-1 text-sm text-slate-500">{{ module.note }}</p>
      </router-link>
    </div>
  </section>
</template>
