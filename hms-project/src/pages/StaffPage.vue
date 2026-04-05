<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'StaffID', label: 'StaffID', type: 'number' },
  { key: 'FirstName', label: 'FirstName', required: true },
  { key: 'LastName', label: 'LastName', required: true },
  { key: 'Role', label: 'Role', required: true },
  { key: 'Phone', label: 'Phone', required: true },
  { key: 'Email', label: 'Email', type: 'email', required: true },
  { key: 'HireDate', label: 'HireDate', type: 'date', required: true },
]

const initialRows = [
  {
    StaffID: 1,
    FirstName: 'Dara',
    LastName: 'Sok',
    Role: 'Nurse',
    Phone: '012111222',
    Email: 'dara.sok@hospital.com',
    HireDate: '2023-01-15',
  },
  {
    StaffID: 2,
    FirstName: 'Srey',
    LastName: 'Leak',
    Role: 'Receptionist',
    Phone: '012333444',
    Email: 'srey.leak@hospital.com',
    HireDate: '2023-03-10',
  },
  {
    StaffID: 3,
    FirstName: 'Borith',
    LastName: 'Vann',
    Role: 'Pharmacist',
    Phone: '012555666',
    Email: 'borith.v@hospital.com',
    HireDate: '2022-11-20',
  },
]
</script>

<template>
  <EntityPage
    title="Staff"
    description="Staff directory and role information."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="StaffID"
  />
</template>
