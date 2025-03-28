import api from '@/api/axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSubmittedApplicationStore = defineStore('submittedApplicationStore', () => {
  const list = ref(null)
  const submittedApplications = computed(() => {
    return list.value
  })

  async function fetchSubmittedApplications() {
    const res = await api.GET('/applications/submitted')
    list.value = res.data
  }

  return {
    //list
    submittedApplications,
    fetchSubmittedApplications,
  }
})
