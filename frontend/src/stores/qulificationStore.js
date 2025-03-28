import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref, computed } from 'vue'

export const useQualificationStore = defineStore('qualificationStore', () => {
  const one = ref({})
  const qualificationInfo = computed(() => {
    return one.value
  })
  const qualificationAppId = computed(() => {
    return one.value?.id
  })
  function setQualificationInfo(info) {
    one.value = info
  }
  async function qualify(id) {
    console.log(id)

    await api.POST(`/sab/applications/${id}/verify-allowance-qualification`)
  }

  return {
    qualificationInfo,
    qualificationAppId,
    setQualificationInfo,
    qualify,
  }
})
