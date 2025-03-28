import { defineStore } from 'pinia'
import api from '@/api/axios'
import { computed, ref } from 'vue'

export const useInformationStore = defineStore('informationsStore', () => {
  const one = ref(null)
  // const list = ref([])

  const information = computed(() => {
    if (!one.value) {
      return {
        child: {
          identities: [],
        },
      }
    }
    return one.value
  })
  // const informations = computed(() => {
  //   if (!list.value)
  //     return [
  //       {
  //         applicant: {},
  //         child: {},
  //         postal_bank_account: {},
  //       },
  //     ]
  //   return list.value
  // })

  // async function fetchInformations() {
  //   const data = await api.GET('information')
  //   list.value = data
  // }
  async function fetchInformation() {
    const data = await api.GET('information')
    one.value = data
  }
  const requestInformation = computed(() => {
    // const {
    //   household_certificate_copies_urls = [],
    //   joint_evaluation_report_copies_urls = [],
    //   diagnosis_certificate_copies_urls = [],
    //   postal_passbook_cover_copy_url = [],
    //   low_income_certificate_copies_url = [],
    //   delayed_school_entry_copies_url = [],
    //   disability_identification_copies_url = [],
    //   ...ohters
    // } = one.value

    // return { ...ohters }
    const {
      applicant,
      child,
      postal_bank_account,
      household_certificate_copies = [],
      joint_evaluation_report_copies = [],
      diagnosis_certificate_copies = [],
      postal_passbook_cover_copies = [],
      low_income_certificate_copies = [],
      delayed_school_entry_copies = [],
      disability_identification_copies = [],
    } = one.value
    return {
      applicant,
      child,
      postal_bank_account,
      household_certificate_copies,
      joint_evaluation_report_copies,
      diagnosis_certificate_copies,
      postal_passbook_cover_copies,
      low_income_certificate_copies,
      delayed_school_entry_copies,
      disability_identification_copies,
    }
  })
  function setInformation(data) {
    one.value = data
  }
  async function updateInformation() {
    // console.log('one:', one.value)
    console.log('computed:', requestInformation.value)
    await api.PUT('information', requestInformation.value)

    // return res
  }
  return {
    //list
    // informations,
    // fetchInformations,
    //one
    information,
    fetchInformation,
    setInformation,
    updateInformation,
  }
})
