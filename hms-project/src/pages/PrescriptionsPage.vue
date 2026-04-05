<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'PrescriptionID', label: 'PrescriptionID', type: 'number' },
  { key: 'RecordID', label: 'RecordID', type: 'number', required: true },
  { key: 'PrescriptionDate', label: 'PrescriptionDate', type: 'date', required: true },
]

const initialRows = [
  {
    PrescriptionID: 1,
    RecordID: 1,
    PrescriptionDate: '2025-12-16',
  },
]
</script>

<template>
  <EntityPage
    title="Prescription"
    description="Prescription summary records."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="PrescriptionID"
  />
</template>
