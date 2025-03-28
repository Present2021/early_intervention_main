import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref, computed } from 'vue'

export const useAcceptedApplicationStore = defineStore('acceptedApplicationsStore', () => {
  const list = ref([])
  const applications = computed(() => {
    return list.value
  })

  async function fetchAcceptedApplications() {
    const data = await api.GET('/sab/applications')
    //幫self_pay_program加index
    list.value = data.map((app) => {
      return {
        ...app,
        application_months: app.application_months.map((monthlyData) => {
          return {
            ...monthlyData,
            self_pay_programs: monthlyData.self_pay_programs.map((program, index) => {
              return {
                ...program,
                program_index: index,
              }
            }),
          }
        }),
      }
    })
    //重裝memoList
    allMemoList.value = applications.value.map((app) => {
      return {
        id: app.id,
        sab_memo: app.sab_memo,
      }
    })
  }
  // function setApplications(data) {
  //   //幫self_pay_program加index
  //   list.value = data.map((app) => {
  //     return {
  //       ...app,
  //       application_months: app.application_months.map((monthlyData) => {
  //         return {
  //           ...monthlyData,
  //           self_pay_programs: monthlyData.self_pay_programs.map((program, index) => {
  //             return {
  //               ...program,
  //               program_index: index,
  //             }
  //           }),
  //         }
  //       }),
  //     }
  //   })
  // }

  const one = ref(null)
  const application = computed(() => {
    if (!one.value) return null
    // return one.value
    return {
      ...one.value,
      application_months: one.value.application_months.map((monthlyData) => {
        return {
          ...monthlyData,
          self_pay_programs: monthlyData.self_pay_programs.map((program, index) => {
            return {
              ...program,
              program_index: index,
            }
          }),
        }
      }),
    }
  })
  const currentApplicationId = computed(() => {
    if (!one.value) return ''
    return one.value.id
  })
  const currentDetail = computed(() => {
    if (!one.value) return []
    return one.value.application_months
  })
  function setApplication(data) {
    one.value = data
  }

  const memoOne = ref(null)
  const memo = computed(() => {
    if (!memoOne.value) return {}
    return {
      ...memoOne.value,
      memo_index: +memoOne.value.memo_index,
      modified_transportation_count: +memoOne.value.modified_transportation_count,
      modified_self_pay_programs: memoOne.value.modified_self_pay_programs.map((program) => {
        return {
          ...program,
          program_index: +program.program_index,
          modified_amount: +program.modified_amount,
        }
      }),
    }
  })
  function setMemo(data) {
    memoOne.value = data
  }
  const memoList = ref([])
  const memos = computed(() => {
    return memoList.value.map((memo) => {
      return {
        ...memo,
        memo_index: +memo.memo_index,
        modified_transportation_count: +memo.modified_transportation_count,
        modified_self_pay_programs:
          memo.modified_self_pay_programs?.map((program) => {
            return {
              ...program,
              program_index: +program.program_index,
              modified_amount: +program.modified_amount,
            }
          }) ?? [],
      }
    })
  })
  function initMemos(monthList) {
    return monthList.map((month, index) => {
      return {
        memo_index: index,
        month: month,
        modified_transportation_count: +one.value.application_months.find(
          (monthlyData) => monthlyData.month === month
        ).transportation_count,
        transportation_memo: '',
        transportation_checked: '',
        modified_self_pay_programs: application.value.application_months
          .find((monthlyData) => monthlyData.month === month)
          .self_pay_programs.map((program, index) => {
            return {
              program_index: index,
              date: program.date,
              self_pay_program_memo: '',
              // default同申請金額
              modified_amount: application.value.application_months
                .find((monthlyData) => monthlyData.month === month)
                .self_pay_programs.find((prog) => prog.program_index === index).amount,
              self_pay_program_checked: '',
            }
          }),
      }
    })
  }
  function setMemos(data) {
    memoList.value = data
  }
  async function updateMemos(id, data) {
    console.log('store id', id)
    console.log('store  updated memos', data)

    await api.PUT(`/sab/applications/${id}/memo`, { sab_memo: data })
  }

  const allMemoList = ref([])
  const allMemo = computed(() => {
    return allMemoList.value
  })
  function setAllMemo(data) {
    allMemoList.value = data
  }

  async function approve(data) {
    console.log(data)

    // await api.POST('/sab/applications/approve', data)
    await api.POST(`/sab/applications/${data.id}/approve`, { sab_memo: data.sab_memo })
  }
  async function reject(data) {
    await api.POST(`/sab/applications/${data.id}/reject`, { sab_memo: data.sab_memo })
  }

  return {
    //list (本頁拿到的全部)
    applications,
    fetchAcceptedApplications,
    // setApplications,

    //one
    setApplication,
    application,
    currentDetail,
    currentApplicationId,

    //memo
    memo,
    setMemo,
    memos,
    initMemos,
    setMemos,
    updateMemos,
    allMemo,
    setAllMemo,
    //submit
    approve,
    reject,
  }
})
