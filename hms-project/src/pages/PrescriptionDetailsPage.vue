<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'PrescriptionID', label: 'PrescriptionID', type: 'number', required: true },
  { key: 'MedicineID', label: 'MedicineID', type: 'number', required: true },
  { key: 'Dosage', label: 'Dosage', required: true },
  { key: 'Duration', label: 'Duration', required: true },
]

const initialRows = [
  {
    PrescriptionID: 1,
    MedicineID: 1,
    Dosage: '2 tablets every 8 hours',
    Duration: '3 days',
  },
  {
    PrescriptionID: 1,
    MedicineID: 2,
    Dosage: '1 capsule before meal',
    Duration: '7 days',
  },
]
</script>

<template>
  <EntityPage
    title="PrescriptionDetail"
    description="Medication line items for prescriptions."
    :columns="columns"
    :initial-rows="initialRows"
  />
</template>
