import { defineStore } from 'pinia'
import api from '@/api/transportationApi.js'
import { ref, computed } from 'vue'
export const useApplicationsStore = defineStore('applicationsStore', () => {
  const list = ref({
    records: [],
  })
  const applications = computed(() => {
    return list.value.records.map((application) => {
      const { id, createdTime, fields } = application
      return {
        id,
        createdTime,
        ...fields,
      }
    })
  })
  async function fetchApplications() {
    const data = await api.GET('/applicationRecords')
    list.value = data
  }
  return {
    list,
    fetchApplications,
    applications,
  }
})
