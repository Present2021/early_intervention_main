<script setup>
import { ref, onBeforeMount } from 'vue'
import { useInformationStore } from '@/stores/informationStore'
import PersonalDataDisplay from '@/components/PersonalDataDisplay.vue'
import PersonalDataForm from '@/components/PersonalDataForm.vue'
import { useQuasar } from 'quasar'

const informationsStore = useInformationStore()
const $q = useQuasar()

const isEdited = ref(false)
const dataContainer = ref({
  applicant: {},
  child: {},
  postal_bank_account: {},
})
const isLoading = ref(false)

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await informationsStore.fetchInformation()
    //未來有多個使用者？
    // const loginInformation = informationsStore.informations.find(
    //   (information) => information.child.national_id_number === 'D123344556'
    // )
    // dataContainer.value = loginInformation
    //   ? loginInformation
    //   : {
    //       applicant: {},
    //       child: {},
    //       postal_bank_account: {},
    //     }
    dataContainer.value = informationsStore.information
    console.log(dataContainer.value)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

function onUpdateApplicant(data) {
  console.log(data)

  dataContainer.value = {
    ...dataContainer.value,
    applicant: {
      // ...dataContainer.value.applicant,
      ...data,
    },
  }
}
function onUpdateChild(data) {
  console.log(data)

  dataContainer.value = {
    ...dataContainer.value,
    child: {
      // ...dataContainer.value.child,
      ...data,
    },
  }
}
function onUpdatePostalBankAccount(data) {
  dataContainer.value = {
    ...dataContainer.value,
    postal_bank_account: {
      // ...dataContainer.value.postal_bank_account,
      ...data,
    },
  }
}
function onupdateFile(data) {
  console.log('updateFile', data)

  dataContainer.value = {
    // applicant: {
    //   ...dataContainer.value.applicant,
    // },
    // child: {
    //   ...dataContainer.value.child,
    // },
    // postal_bank_account: {
    //   ...dataContainer.value.postal_bank_account,
    // },
    ...dataContainer.value,
    ...data,
  }
  console.log('update file後的dataContainer:', dataContainer.value)
}
async function onSubmit() {
  // console.log(dataContainer.value)
  try {
    isLoading.value = true
    informationsStore.setInformation(dataContainer.value)
    await informationsStore.updateInformation()
    await informationsStore.fetchInformation()
    isEdited.value = false
    $q.notify({
      message: '個人資料修改完成',
      position: 'center',
      actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
    })
  } catch (err) {
    console.error(err)
    $q.notify({
      color: 'negative',
      position: 'bottom',
      message: err.message,
      icon: 'report_problem',
    })
  } finally {
    isLoading.value = false
  }
}
function onCancel() {
  isEdited.value = false
}
</script>

<template>
  <PersonalDataForm
    v-if="!dataContainer || !Object.keys(dataContainer.child).length === 0 || isEdited"
    @update-applicant="onUpdateApplicant"
    @update-child="onUpdateChild"
    @update-postal-bank-account="onUpdatePostalBankAccount"
    @update-file="onupdateFile"
    :data="dataContainer"
  >
    <div class="action">
      <QBtn color="primary" @click="onSubmit">送出</QBtn>
      <QBtn color="grey" @click="onCancel">取消</QBtn>
    </div>
  </PersonalDataForm>

  <PersonalDataDisplay v-if="!isEdited && dataContainer" :data="dataContainer">
    <div class="action">
      <QBtn color="primary" style="width: 100%" @click="isEdited = true">修改</QBtn>
    </div>
  </PersonalDataDisplay>

  <QDialog v-model="isLoading">
    <QSpinner color="primary" size="2em" />
  </QDialog>
</template>

<style lang="scss" scoped>
.action {
  display: flex;
  gap: 1rem;
  > * {
    flex: 1 1 auto;
  }

  :deep(.send) {
    width: 100%;
  }
}
</style>
