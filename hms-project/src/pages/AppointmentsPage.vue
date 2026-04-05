<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'AppointmentID', label: 'AppointmentID', type: 'number' },
  { key: 'PatientID', label: 'PatientID', type: 'number', required: true },
  { key: 'DoctorID', label: 'DoctorID', type: 'number', required: true },
  { key: 'AppointmentDate', label: 'AppointmentDate', type: 'date', required: true },
  { key: 'AppointmentTime', label: 'AppointmentTime', type: 'time', required: true },
  { key: 'Status', label: 'Status', options: ['Scheduled', 'Confirmed', 'Completed'], required: true },
  { key: 'Remarks', label: 'Remarks', required: true },
]

const initialRows = [
  {
    AppointmentID: 1,
    PatientID: 1,
    DoctorID: 1,
    AppointmentDate: '2025-12-15',
    AppointmentTime: '09:00:00',
    Status: 'Confirmed',
    Remarks: 'Heart rhythm checkup',
  },
  {
    AppointmentID: 2,
    PatientID: 2,
    DoctorID: 2,
    AppointmentDate: '2025-12-15',
    AppointmentTime: '10:30:00',
    Status: 'Scheduled',
    Remarks: 'Infant vaccination',
  },
  {
    AppointmentID: 3,
    PatientID: 3,
    DoctorID: 3,
    AppointmentDate: '2025-12-16',
    AppointmentTime: '14:00:00',
    Status: 'Completed',
    Remarks: 'Post-surgery follow-up',
  },
]
</script>

<template>
  <EntityPage
    title="Appointment"
    description="Appointment scheduling and visit status."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="AppointmentID"
  />
</template>
