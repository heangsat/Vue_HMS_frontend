<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'BillID', label: 'BillID', type: 'number' },
  { key: 'PatientID', label: 'PatientID', type: 'number', required: true },
  { key: 'AppointmentID', label: 'AppointmentID', type: 'number' },
  { key: 'AdmissionID', label: 'AdmissionID', type: 'number' },
  { key: 'BillDate', label: 'BillDate', type: 'date', required: true },
  { key: 'TotalAmount', label: 'TotalAmount', type: 'number', required: true },
  { key: 'Status', label: 'Status', options: ['Paid', 'Unpaid'], required: true },
]

const initialRows = [
  {
    BillID: 1,
    PatientID: 3,
    AppointmentID: 3,
    AdmissionID: null,
    BillDate: '2025-12-16',
    TotalAmount: 45,
    Status: 'Paid',
  },
  {
    BillID: 2,
    PatientID: 1,
    AppointmentID: null,
    AdmissionID: 1,
    BillDate: '2025-12-05',
    TotalAmount: 650,
    Status: 'Unpaid',
  },
]
</script>

<template>
  <EntityPage
    title="Bill"
    description="Billing records for appointments and admissions."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="BillID"
  />
</template>
