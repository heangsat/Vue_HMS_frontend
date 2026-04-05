<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'RoomID', label: 'RoomID', type: 'number' },
  { key: 'RoomNumber', label: 'RoomNumber', required: true },
  { key: 'RoomType', label: 'RoomType', required: true },
  { key: 'Status', label: 'Status', required: true },
  { key: 'PricePerDay', label: 'PricePerDay', type: 'number', required: true },
]

const initialRows = [
  {
    RoomID: 1,
    RoomNumber: '101',
    RoomType: 'Private',
    Status: 'Available',
    PricePerDay: 50,
  },
  {
    RoomID: 2,
    RoomNumber: '102',
    RoomType: 'Semi-Private',
    Status: 'Available',
    PricePerDay: 30,
  },
  {
    RoomID: 3,
    RoomNumber: '201',
    RoomType: 'ICU',
    Status: 'Available',
    PricePerDay: 150,
  },
  {
    RoomID: 4,
    RoomNumber: '301',
    RoomType: 'General',
    Status: 'Available',
    PricePerDay: 15,
  },
]
</script>

<template>
  <EntityPage
    title="Ward"
    description="Ward room inventory and daily price."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="RoomID"
  />
</template>
