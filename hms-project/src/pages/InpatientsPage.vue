<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'AdmissionID', label: 'AdmissionID', type: 'number' },
  { key: 'PatientID', label: 'PatientID', type: 'number', required: true },
  { key: 'RoomID', label: 'RoomID', type: 'number', required: true },
  { key: 'AdmissionDate', label: 'AdmissionDate', type: 'date', required: true },
  { key: 'DischargeDate', label: 'DischargeDate', type: 'date' },
]

const initialRows = [
  {
    AdmissionID: 1,
    PatientID: 1,
    RoomID: 3,
    AdmissionDate: '2025-12-01',
    DischargeDate: '2025-12-05',
  },
]
</script>

<template>
  <EntityPage
    title="Inpatient"
    description="Admission and discharge records for inpatients."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="AdmissionID"
  />
</template>
