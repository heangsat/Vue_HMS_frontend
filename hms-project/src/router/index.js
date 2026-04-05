import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import DoctorsPage from '@/pages/DoctorsPage.vue'
import PatientsPage from '@/pages/PatientsPage.vue'
import DepartmentsPage from '@/pages/DepartmentsPage.vue'
import MedicinesPage from '@/pages/MedicinesPage.vue'
import MedicalRecordsPage from '@/pages/MedicalRecordsPage.vue'
import PrescriptionsPage from '@/pages/PrescriptionsPage.vue'
import PrescriptionDetailsPage from '@/pages/PrescriptionDetailsPage.vue'
import StaffPage from '@/pages/StaffPage.vue'
import WardsPage from '@/pages/WardsPage.vue'
import InpatientsPage from '@/pages/InpatientsPage.vue'
import BillsPage from '@/pages/BillsPage.vue'
import AppointmentsPage from '@/pages/AppointmentsPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: DoctorsPage,
    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientsPage,
    },
    {
      path: '/departments',
      name: 'departments',
      component: DepartmentsPage,
    },
    {
      path: '/medicines',
      name: 'medicines',
      component: MedicinesPage,
    },
    {
      path: '/medical-records',
      name: 'medical-records',
      component: MedicalRecordsPage,
    },
    {
      path: '/prescriptions',
      name: 'prescriptions',
      component: PrescriptionsPage,
    },
    {
      path: '/prescription-details',
      name: 'prescription-details',
      component: PrescriptionDetailsPage,
    },
    {
      path: '/staff',
      name: 'staff',
      component: StaffPage,
    },
    {
      path: '/wards',
      name: 'wards',
      component: WardsPage,
    },
    {
      path: '/inpatients',
      name: 'inpatients',
      component: InpatientsPage,
    },
    {
      path: '/bills',
      name: 'bills',
      component: BillsPage,
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { authPage: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { authPage: true },
    },
  ],
})

export default router
