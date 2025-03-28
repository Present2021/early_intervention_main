import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'parent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parent/ParentLayout.vue'),
      redirect: '/subsidy',
      children: [
        {
          path: 'personalData',
          name: 'personalData',
          component: () => import('../views/parent/PersonalDataView.vue'),
        },
        {
          path: '/transportation',
          name: 'transportation',
          component: () => import('../views/parent/TransportationSubsidyView.vue'),
        },
        {
          path: 'selfPay',
          name: 'selfPay',
          component: () => import('../views/parent/SelfPaySubsidyView.vue'),
        },
        {
          path: 'subsidy',
          name: 'subsidy',
          component: () => import('../views/parent/SubsidyView.vue'),
        },
        {
          path: 'pdf',
          name: 'pdf',
          component: () => import('../views/parent/pdfView.vue'),
        },
      ],
    },
    {
      path: '/clinic',
      name: 'clinic',
      component: () => import('../views/clinic/ClinicLayout.vue'),
      redirect: '/clinic/clinicTransportation',
      children: [
        {
          path: 'clinicTransportation',
          name: 'clinicTransportation',
          component: () => import('../views/clinic/ClinicTransportationView.vue'),
        },
        {
          path: 'clinicSelfPay',
          name: 'clinicSelfPay',
          component: () => import('../views/clinic/ClinicSelfPayView.vue'),
        },
      ],
    },
    {
      path: '/socialAffairs',
      name: 'socialAffairs',
      component: () => import('../views/socialAffairs/SocialAffairsLayout.vue'),
      redirect: '/socialAffairs/currentMonthApplication',
      children: [
        {
          path: 'totalApplication',
          name: 'totalApplication',
          component: () => import('../views/socialAffairs/TotalApplicationView.vue'),
        },
        {
          path: 'currentMonthApplication',
          name: 'currentMonthApplication',
          component: () => import('../views/socialAffairs/CurrentMonthApplicationView.vue'),
        },
      ],
    },
  ],
})

export default router
