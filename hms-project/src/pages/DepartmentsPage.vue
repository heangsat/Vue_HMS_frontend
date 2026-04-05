<script setup>
import EntityPage from '@/component/EntityPage.vue'

const columns = [
  { key: 'DeptID', label: 'DeptID', type: 'number' },
  { key: 'DeptName', label: 'DeptName', required: true },
  { key: 'Description', label: 'Description', required: true },
]

const initialRows = [
  {
    DeptID: 1,
    DeptName: 'Cardiology',
    Description: 'Heart and cardiovascular system specialists.',
  },
  {
    DeptID: 2,
    DeptName: 'Pediatrics',
    Description: 'Medical care for infants, children, and adolescents.',
  },
  {
    DeptID: 3,
    DeptName: 'General Surgery',
    Description: 'Focuses on abdominal contents including esophagus, stomach, etc.',
  },
  {
    DeptID: 4,
    DeptName: 'Neurology',
    Description: 'Disorders of the nervous system.',
  },
  {
    DeptID: 5,
    DeptName: 'HeadAch',
    Description: 'HeadMinace',
  },
  {
    DeptID: 6,
    DeptName: 'Fiizard',
    Description: 'Fiizy',
  },
  {
    DeptID: 7,
    DeptName: 'Fiizard',
    Description: 'Fiizy',
  },
]
</script>

<template>
  <EntityPage
    title="Department"
    description="Hospital department definitions."
    :columns="columns"
    :initial-rows="initialRows"
    primary-key="DeptID"
  />
</template>
