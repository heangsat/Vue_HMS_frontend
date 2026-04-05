<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'DoctorID', label: 'DoctorID', type: 'number' },
  { key: 'FirstName', label: 'FirstName', required: true },
  { key: 'LastName', label: 'LastName', required: true },
  { key: 'Gender', label: 'Gender', options: ['Male', 'Female'], required: true },
  { key: 'Phone', label: 'Phone', required: true },
  { key: 'Email', label: 'Email', type: 'email', required: true },
  { key: 'DeptID', label: 'DeptID', type: 'number', required: true },
  { key: 'Specialization', label: 'Specialization', required: true },
]

const initialRows = [
  {
    DoctorID: 1,
    FirstName: 'Sophea',
    LastName: 'Chan',
    Gender: 'Female',
    Phone: '011222333',
    Email: 'sophea.chan@hospital.com',
    DeptID: 1,
    Specialization: 'Consultant Cardiologist',
  },
  {
    DoctorID: 2,
    FirstName: 'Samnang',
    LastName: 'Meas',
    Gender: 'Male',
    Phone: '011444555',
    Email: 'samnang.m@hospital.com',
    DeptID: 2,
    Specialization: 'Senior Pediatrician',
  },
  {
    DoctorID: 3,
    FirstName: 'Vicheka',
    LastName: 'Keo',
    Gender: 'Male',
    Phone: '011666777',
    Email: 'vicheka.k@hospital.com',
    DeptID: 3,
    Specialization: 'Gastrointestinal Surgeon',
  },
]
</script>

<template>
  <EntityPage
    title="Doctor"
    description="Doctor roster and specialization by department."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="DoctorID"
  />
</template>
