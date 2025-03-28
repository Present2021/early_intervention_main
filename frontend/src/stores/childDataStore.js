import { defineStore } from 'pinia'
import api from '@/api/transportationApi.js'
import { ref, computed } from 'vue'

export const useChildrenDataStore = defineStore('childrenDataStore', () => {
  const list = ref([])

  const childrenData = computed(() => {
    if (list.value.length === 0) return {}
    return list.value.map((child) => {
      const { id, createdTIme, fields } = child
      return {
        id,
        createdTIme,
        ...fields,
      }
    })
  })

  async function fetchChildrenData() {
    const data = await api.GET('/childData')
    list.value = data.records
  }

  //只有一個element(物件)的array
  const one = ref([])

  // getter, 抓出該物件
  const childData = computed(() => {
    console.log(one.value)

    if (!one.value.length === 0) return {}
    const [data] = one.value.map((record) => {
      const { id, createdTime, fields } = record
      return {
        id,
        createdTime,
        ...fields,
      }
    })
    return data
  })

  //setter, 把物件塞回array
  function setChildData(data) {
    // console.log(data)
    if (!data.id) {
      one.value = []
    }
    const { id, createdTime, ...fields } = data

    one.value = [
      {
        id,
        createdTime,
        fields,
      },
    ]
  }

  //getter, 拿物件中的childId
  const currentChildId = computed(() => {
    if (one.value.length === 0) return ''
    const [data] = one.value.map((record) => {
      const { id, createdTIme, fields } = record
      return {
        id,
        createdTIme,
        ...fields,
      }
    })
    return data.childId
  })
  // fetch data存入容器one, 存array
  async function fetchChildData(id) {
    const data = await api.GET(`/childData?filterByFormula=childId="${id}"`)
    one.value = data['records']
    console.log(one.value)
  }
  //從容器one拿資料傳到後端
  async function updateChildData() {
    console.log(one.value)

    const { id, fields } = one.value[0]
    console.log(id)

    await api.PUT(`/childData/${id}`, { fields })
  }
  return {
    //list
    fetchChildrenData,
    childrenData,
    //one
    one,
    fetchChildData,
    setChildData,
    updateChildData,
    childData,
    currentChildId,
  }
})
