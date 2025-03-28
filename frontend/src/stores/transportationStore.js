import { defineStore } from 'pinia'
import api from '@/api/transportationApi.js'
import { computed, ref } from 'vue'
import { startOfMonth, endOfMonth, format, addMonths, subMonths } from 'date-fns'

export const useTransportationRecordStore = defineStore('transportationRecords', () => {
  const list = ref({
    records: [],
  })

  const listByParams = ref({
    records: [],
  })

  const getTransportationRecords = computed(() => {
    // console.log(list.value.records)

    return list.value.records.map(
      // (record) => record
      ({ id, createdTime, fields }) => ({
        id,
        createdTime,
        ...fields,
      })
    )
  })

  const transportationRecordsByParams = computed(() => {
    // console.log(list.value.records)
    if (listByParams.value.length === 0) return []
    return listByParams.value.records.map(
      // (record) => record
      ({ id, createdTime, fields }) => ({
        id,
        createdTime,
        ...fields,
      })
    )
  })
  function setTransportationRecordsByParams(data) {
    listByParams.value = data
  }
  const currentApplicationsChildId = computed(() => {
    if (transportationRecordsByParams.value.length === 0 || !transportationRecordsByParams.value)
      return ''

    return transportationRecordsByParams.value[0].childId[0]
  })
  const currentApplicationsMonth = computed(() => {
    if (transportationRecordsByParams.value.length === 0 || !transportationRecordsByParams.value)
      return ''
    return transportationRecordsByParams.value[0].month
  })
  async function fetchTransportationRecords() {
    const data = await api.GET('/transportation', {
      sort: [{ field: 'recordId', direction: 'desc' }],
    })
    // console.log(data)

    list.value = data
    // console.log('pinia', list.value)
  }
  async function fetchTransportationRecordsByChildIdMonth(childId, month) {
    const data = await api.GET(
      `/transportation?filterByFormula=AND(childId="${childId}", month="${month}")`
    )
    console.log(listByParams.value)
    // console.log('id', currentApplicationsChildId)

    listByParams.value = data
  }

  const one = ref({
    id: '',
    createdTime: '',
    fields: {},
  })
  const getTransportationRecord = computed(() => {
    const { id, createdTime, fields } = one.value
    return {
      id,
      createdTime,
      ...fields,
    }
  })

  function setTransportationRecord(newData) {
    const { id, createdTime, ...fields } = newData
    one.value = {
      id,
      createdTime,
      fields,
    }
  }

  function initRecord() {
    const now = new Date().toISOString()
    one.value.fields = {
      therapyType: '',
      status: 'created',
      therapyDate: now,
      rehabCenter: '',
      therapist: '',
      recordId: list.value.records.length + 1,
      childData: ['recRQLavLIZifgcb6'],
    }
  }
  async function fetchTransportationRecord(id) {
    const data = await api.GET(`/transportation/${id}`)
    one.value = data
    // console.log('record', one.value)
  }
  async function createTransportationRecord() {
    const { fields } = one.value
    await api.POST('/transportation', { fields })
  }

  async function updateTransportationRecord() {
    const { id, fields } = one.value
    console.log('id', id)

    await api.PUT(`/transportation/${id}`, { fields })
  }
  // 分月份用
  const currentMonth = ref(new Date())

  const formattedCurrentMonth = computed(() => format(currentMonth.value, 'yyyy年MM月'))

  const filteredRecords = computed(() => {
    const start = startOfMonth(currentMonth.value)
    const end = endOfMonth(currentMonth.value)
    return getTransportationRecords.value.filter((record) => {
      const recordDate = new Date(record.therapyDate)
      return recordDate >= start && recordDate <= end
    })
  })

  function nextMonth() {
    currentMonth.value = addMonths(currentMonth.value, 1)
  }

  function previousMonth() {
    currentMonth.value = subMonths(currentMonth.value, 1)
  }

  return {
    //list
    fetchTransportationRecords,
    fetchTransportationRecordsByChildIdMonth,
    getTransportationRecords,
    //list by params
    currentApplicationsChildId,
    currentApplicationsMonth,
    transportationRecordsByParams,
    setTransportationRecordsByParams,

    //one
    initRecord,
    createTransportationRecord,
    fetchTransportationRecord,
    updateTransportationRecord,
    setTransportationRecord,
    getTransportationRecord,

    //分月份
    formattedCurrentMonth,
    filteredRecords,
    nextMonth,
    previousMonth,
  }
})
