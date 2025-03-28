import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref, computed } from 'vue'

export const useDraftApplicationStore = defineStore('draftApplicationsStore', () => {
  const list = ref({
    data: [],
  })

  async function fetchDraftApplications() {
    const data = await api.GET('/applications/draft')

    list.value = data
  }

  const draftApplications = computed(() => {
    return list.value.data
  })
  const currentMonthList = computed(() => {
    return list.value.data.map((obj) => obj.month)
  })
  const one = ref(null)
  function initApplication() {
    one.value = {
      month: '', // key
      transportation_count: 0,
      self_pay_programs: [],
      transportation_document_copy: '',
      program_document_copy: '',
      program_receipts: [],
    }
  }
  const draftApplication = computed(() => {
    return one.value
  })
  const currentMonth = computed(() => {
    if (!one.value) return ''
    return one.value.month
  })
  const submittedDraft = computed(() => {
    const excludedKeys = [
      'transportation_document_copy_url',
      'program_document_copy_url',
      'program_receipts_urls',
      'self_pay_programs_total',
    ]
    const data = {
      ...one.value,
    }

    excludedKeys.forEach((key) => {
      if (key in data) {
        delete data[key]
      }
    })
    return data
  })
  function setDraftApplication(data) {
    one.value = data
  }

  async function updateDraftApplication(data) {
    console.log('store進PUT的data', data)

    await api.PUT('/applications/draft', data)
  }

  async function deleteDraftApplication(month) {
    console.log(month)
    await api.DELETE(`/applications/draft/${month}`)
  }

  const cover = ref({
    cover_document_copy: null,
    cover_document_copy_url: '',
  })
  const coverFile = computed(() => {
    return cover.value.cover_document_copy
  })
  const coverUrl = computed(() => {
    return cover.value.cover_document_copy_url
  })
  function setCoverFile(data) {
    cover.value.cover_document_copy = data
  }
  function setCoverUrl(url) {
    cover.value.cover_document_copy_url = url
  }
  function resetCover() {
    cover.value = {
      cover_document_copy: null,
      cover_document_copy_url: '',
    }
  }
  async function submitCover(data) {
    console.log(data)

    await api.POST('/applications/submit', data)
  }

  return {
    //list
    fetchDraftApplications,
    currentMonthList,
    draftApplications,
    //one
    initApplication,
    setDraftApplication,
    updateDraftApplication,
    deleteDraftApplication,
    draftApplication,
    currentMonth,
    submittedDraft,

    //submit

    coverFile,
    coverUrl,
    setCoverFile,
    setCoverUrl,
    resetCover,
    submitCover,
  }
})
