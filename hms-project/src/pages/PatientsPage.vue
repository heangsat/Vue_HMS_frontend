<script setup>
import EntityPage from '@/component/EntityPage.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const columns = [
  { key: 'patientId', label: 'PatientID', type: 'number' },
  { key: 'firstName', label: 'FirstName', required: true },
  { key: 'lastName', label: 'LastName', required: true },
  { key: 'gender', label: 'Gender', options: ['Male', 'Female', 'male', 'famale'], required: true },
  { key: 'dateOfBirth', label: 'DateOfBirth', type: 'date', required: true },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'address', label: 'Address', required: true },
  { key: 'bloodGroup', label: 'BloodGroup', required: true },
  { key: 'registrationDate', label: 'RegistrationDate', type: 'date', required: true },
]

const items = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPatients = async () => {
  try {
    const respone = await axios.get('http://localhost:3000/pateints')
    items.value = respone.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching patients:', error)
    error.value = 'Failed to load patients. Please try again later.'
  }
}

onMounted(() => {
  fetchPatients()
})
</script>
<template>
  <div v-if="loading">Loading patients...</div>
  <div v-else-if="error">{{ error }}</div>
  <EntityPage
    v-else
    title="Patient"
    description="Patient profile and contact information."
    :columns="columns"
    :initial-rows="items"
    primary-key="patientId"
    :on-update="updatePatient"
  />
</template>
