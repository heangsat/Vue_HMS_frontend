<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'MedicineID', label: 'MedicineID', type: 'number' },
  { key: 'MedicineName', label: 'MedicineName', required: true },
  { key: 'GenericName', label: 'GenericName', required: true },
  { key: 'StockQuantity', label: 'StockQuantity', type: 'number', required: true },
  { key: 'UnitPrice', label: 'UnitPrice', type: 'number', required: true },
  { key: 'ExpiryDate', label: 'ExpiryDate', type: 'date', required: true },
]

const initialRows = [
  {
    MedicineID: 1,
    MedicineName: 'Tylenol 500mg',
    GenericName: 'Acetaminophen',
    StockQuantity: 500,
    UnitPrice: 0.25,
    ExpiryDate: '2026-12-31',
  },
  {
    MedicineID: 2,
    MedicineName: 'Amoxil',
    GenericName: 'Amoxicillin',
    StockQuantity: 200,
    UnitPrice: 1.5,
    ExpiryDate: '2025-08-15',
  },
  {
    MedicineID: 3,
    MedicineName: 'Lipitor',
    GenericName: 'Atorvastatin',
    StockQuantity: 100,
    UnitPrice: 2,
    ExpiryDate: '2027-01-20',
  },
  {
    MedicineID: 4,
    MedicineName: 'Ventolin',
    GenericName: 'Albuterol',
    StockQuantity: 50,
    UnitPrice: 12,
    ExpiryDate: '2026-05-10',
  },
]
</script>

<template>
  <EntityPage
    title="Medicine"
    description="Medicine stock, pricing, and expiry tracking."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="MedicineID"
  />
</template>
