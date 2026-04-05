<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'RecordID', label: 'RecordID', type: 'number' },
  { key: 'PatientID', label: 'PatientID', type: 'number', required: true },
  { key: 'DoctorID', label: 'DoctorID', type: 'number', required: true },
  { key: 'VisitDate', label: 'VisitDate', type: 'date', required: true },
  { key: 'Diagnosis', label: 'Diagnosis', required: true },
  { key: 'Treatment', label: 'Treatment', required: true },
  { key: 'Allergies', label: 'Allergies', required: true },
  { key: 'Notes', label: 'Notes', required: true },
]

const initialRows = [
  {
    RecordID: 1,
    PatientID: 3,
    DoctorID: 3,
    VisitDate: '2025-12-16',
    Diagnosis: 'Stable recovery from appendectomy',
    Treatment: 'Wound cleaning and dressing',
    Allergies: 'None',
    Notes: 'Patient can return to normal diet.',
  },
]
</script>

<template>
  <EntityPage
    title="MedicalRecord"
    description="Clinical visit records for patients."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="RecordID"
  />
</template>
