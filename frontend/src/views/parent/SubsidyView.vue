<template>
  <!-- <pre>submit: {{ submittedApplicationStore.submittedApplications }}</pre> -->
  <div class="q-pa-md">
    <QTabs
      v-model="tab"
      dense
      class="text-white tabs"
      active-bg-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <QTab name="draft" label="未送出" class="tab" />
      <QTab name="pending" label="審核中" class="tab" />
      <QTab name="closed" label="已結案" class="tab" />
    </QTabs>
    <QSeparator class="q-my-md" />
    <QTabPanels v-model="tab" animated class="">
      <QTabPanel name="draft" class="application_tab">
        <!-- <div class="text-h6">尚未送出的申請</div> -->
        <div class="subsidy_adding">
          <QBtn flat icon="add" label="新增月份" @click="initMonth" />
          <QDialog v-model="isSelectingMonth" persistent>
            <QCard style="min-width: 350px">
              <QCardSection>
                <div class="text-h6">請選擇要新增的月份</div>
              </QCardSection>

              <QCardSection class="q-pt-none">
                <QSelect
                  outlined
                  dense
                  :model-value="application.month"
                  @update:model-value="
                    draftApplicationsStore.setDraftApplication({
                      ...draftApplicationsStore.draftApplication,
                      month: $event,
                    })
                  "
                  :options="subsidyPeriod"
                  label="申請月份"
                />
              </QCardSection>

              <QCardActions align="right" class="text-primary">
                <QBtn flat label="取消" @click="onCancelAddMonth" />
                <QBtn flat label="新增月份" @click="onAddMonth" />
              </QCardActions>
            </QCard>
          </QDialog>
        </div>
        <!-- new -->
        <QCard
          flat
          bordered
          v-if="draftApplicationsStore.draftApplication && monthIsNew"
          class="my-card subsidy q-mt-sm new"
        >
          <QCardSection class="application_box">
            <div class="subsidy_item">
              <div class="text-h6">{{ application.month }}</div>
              <div class="row title">
                <div class="col">交通補助</div>
                <div class="col">自費補助</div>
                <div class="col">小計</div>
                <div class="col">預計補助</div>
              </div>
              <QSeparator />
              <div class="row">
                <div class="col">{{ application.transportationTotal }}</div>
                <div class="col">{{ application.selfPayTotal }}</div>
                <div class="col">{{ application.sum }}</div>
                <div class="col">{{ application.estimatedSubsidy }}</div>
              </div>
            </div>
            <div class="detail_toggle">
              <QBtn
                flat
                color="black"
                :icon="currentMonth === application.month ? 'arrow_drop_up' : 'arrow_drop_down'"
                size="xl"
                @click="toggleDetail(application.month)"
              />
            </div>
          </QCardSection>

          <QCardSection v-if="currentMonth === application.month">
            <ApplicationForm
              v-if="editedMonth === application.month"
              :data="draftApplicationsStore.draftApplication"
              :is-edited="isEdited"
              @update-detail="onUpdateDetail"
              @submit-detail="showSubmitDetailDialog"
              @cancel="cancelSubmitDetail"
            />
            <ApplicationDetailParent
              v-else
              :data="application"
              :is-edited="isEdited"
              @edit-detail="onEditDetail"
            />
          </QCardSection>
        </QCard>

        <!-- draft application list -->
        <QCard
          v-for="application in applications"
          :key="application.month"
          flat
          bordered
          class="my-card subsidy q-mt-sm"
        >
          <div class="delete_icon">
            <QIcon
              name="cancel"
              @click.stop.prevent="showDeleteApplicationDialog(application.month)"
              size="26px"
              color="secondary"
              class="cursor-pointer"
            />
          </div>
          <QCardSection class="application_box">
            <div class="subsidy_item">
              <div class="text-h6">{{ application.month }}</div>
              <div class="row title">
                <div class="col">交通補助</div>
                <div class="col">自費補助</div>
                <div class="col">小計</div>
                <div class="col">預計補助</div>
              </div>
              <QSeparator />
              <div class="row">
                <div class="col">{{ application.transportation_total }}</div>
                <div class="col">{{ application.self_pay_programs_total }}</div>
                <div class="col">{{ application.sum }}</div>
                <div class="col">{{ application.estimatedSubsidy }}</div>
              </div>
            </div>
            <div class="detail_toggle">
              <QBtn
                flat
                color="black"
                :icon="currentMonth === application.month ? 'arrow_drop_up' : 'arrow_drop_down'"
                size="xl"
                @click="toggleDetail(application.month)"
              />
            </div>
          </QCardSection>
          <QCardSection v-if="currentMonth === application.month">
            <ApplicationForm
              v-if="editedMonth === application.month"
              :data="draftApplicationsStore.draftApplication"
              :is-edited="isEdited"
              @update-detail="onUpdateDetail"
              @submit-detail="showSubmitDetailDialog"
              @cancel="cancelSubmitDetail"
            />
            <ApplicationDetailParent
              v-else
              :data="application"
              :is-edited="isEdited"
              @edit-detail="onEditDetail"
            />
          </QCardSection>
        </QCard>
        <div class="q-mt-md application_action">
          <div v-if="draftApplicationsStore.coverUrl">
            <QBtn
              color="primary"
              label="送出申請"
              @click="confirmDialogConfig.submitAppIsShown = true"
            />
          </div>
          <div class="document_copy_upload">
            <QFile
              outlined
              dense
              :model-value="draftApplicationsStore.coverFile"
              @update:model-value="onUploadCover"
              :label="draftApplicationsStore.coverUrl ? '重新上傳申請書封面' : '上傳申請書封面'"
            >
              <template v-if="draftApplicationsStore.coverFile" v-slot:append>
                <QIcon
                  name="cancel"
                  @click.stop.prevent="draftApplicationsStore.setCoverFile(null)"
                  class="cursor-pointer"
                />
              </template>
            </QFile>
          </div>
          <div v-if="draftApplicationsStore.coverUrl">
            <div class="document_copy_link">
              <span>申請單封面:</span>
              <a
                v-if="draftApplicationsStore.coverUrl"
                :href="draftApplicationsStore.coverUrl"
                class="q-ml-md"
                target="_blank"
              >
                預覽封面
              </a>
              <span v-else class="q-ml-md">尚無檔案</span>
            </div>
          </div>
        </div>
      </QTabPanel>

      <QTabPanel name="pending" class="application_tab">
        <!-- 審核中 -->
        <ApplicationCardParent
          v-for="pending in applicationsPending"
          :key="pending.id"
          :data="pending"
          @toggle-submitted-detail="onToggleSubmittedDetail"
          v-slot="slotProps"
        >
          <ApplicationDetailParent
            v-if="currentSubmittedMonth === slotProps.detail.month"
            :data="slotProps.detail"
            :isSubmitted="!!pending.status"
          />
        </ApplicationCardParent>
      </QTabPanel>

      <QTabPanel name="closed" class="application_tab">
        <ApplicationCardParent
          v-for="pending in applicationsClosed"
          :key="pending.id"
          :data="pending"
          @toggle-submitted-detail="onToggleSubmittedDetail"
          v-slot="slotProps"
        >
          <ApplicationDetailParent
            v-if="currentSubmittedMonth === slotProps.detail.month"
            :data="slotProps.detail"
            :isSubmitted="!!pending.status"
          />
        </ApplicationCardParent>
      </QTabPanel>
    </QTabPanels>
  </div>
  <QDialog v-model="alert.isShown">
    <AlertDialog :alert-msg="alert.msg" :user="alert.user" @clear-alert="onClearAlert" />
  </QDialog>
  <QDialog v-model="confirmDialogConfig.submitDetailIsShown">
    <ConfirmDialog msg="確定變更？" @confirm="handleSubmitDetail" @cancel="cancelSubmitDetail" />
  </QDialog>
  <QDialog v-model="confirmDialogConfig.submitAppIsShown">
    <ConfirmDialog msg="確定送出？" @confirm="handleSubmitApp" @cancel="cancelSubmitApp" />
  </QDialog>
  <QDialog v-model="confirmDialogConfig.deleteAppIsShown">
    <ConfirmDialog
      msg="確定刪除？"
      @confirm="handleDeleteApplication"
      @cancel="cancelDeleteApplication"
    />
  </QDialog>
  <QDialog v-model="isLoading">
    <QSpinner color="primary" size="2em" />
  </QDialog>
</template>

<script setup>
import ApplicationDetailParent from '@/components/ApplicationDetailParent.vue'
import ApplicationForm from '@/components/ApplicationForm.vue'
import { useDraftApplicationStore } from '@/stores/draftApplicationStore'
import { useSubmittedApplicationStore } from '@/stores/submittedApplicationStore'
import { useInformationStore } from '@/stores/informationStore'
import { computed, ref, onBeforeMount } from 'vue'
import { isAfter, parse } from 'date-fns'
import { useQuasar } from 'quasar'
import ApplicationCardParent from '@/components/ApplicationCardParent.vue'
import AlertDialog from '@/components/dialog/AlertDialog.vue'
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue'

const draftApplicationsStore = useDraftApplicationStore()
const submittedApplicationStore = useSubmittedApplicationStore()
const informationStore = useInformationStore()
const $q = useQuasar()

const tab = ref('draft')
const isSelectingMonth = ref(false)
const isEdited = ref(false)
const currentMonth = ref('')
const editedMonth = ref('')
const currentSubmittedMonth = ref('')

// const submitContainer = ref(null)
const isLoading = ref(true)

const subsidyPeriod = produceSubsidyPeriod()
const subsidyRule = ref({
  transportationFee: 200,
  monthlyLimit: 4000,
})
const alert = ref({
  msg: '',
  isShown: false,
  user: 'parent',
})
const confirmDialogConfig = ref({
  deleteAppIsShown: false,
  submitDetailIsShown: false,
  submitAppIsShown: false,
})
function produceSubsidyPeriod() {
  //之後改依目前日期產出包含當月的前三個月的補助期限
  return new Array(12)
    .fill('2024')
    .map((option, index) => option + `-${String(index + 1).padStart(2, '0')}`)
}

const applications = computed(() => {
  return draftApplicationsStore.draftApplications.map((application) => {
    const transportation_total =
      subsidyRule.value.transportationFee * application.transportation_count
    const sum = transportation_total + application.self_pay_programs_total
    const estimatedSubsidy =
      sum > subsidyRule.value.monthlyLimit ? subsidyRule.value.monthlyLimit : sum

    return {
      ...application,
      transportationFee: subsidyRule.value.transportationFee,
      transportation_total,
      sum,
      estimatedSubsidy,
    }
  })
})

const application = computed(() => {
  if (!draftApplicationsStore.draftApplication) return null
  const transportationTotal =
    subsidyRule.value.transportationFee *
    draftApplicationsStore.draftApplication.transportation_count
  const selfPayTotal =
    draftApplicationsStore.draftApplication.self_pay_programs.length === 0
      ? 0
      : draftApplicationsStore.draftApplication.self_pay_programs
          .map((program) => +program.amount)
          .reduce((total, amount) => total + amount, 0)
  const sum = transportationTotal + selfPayTotal
  const estimatedSubsidy =
    sum > subsidyRule.value.monthlyLimit ? subsidyRule.value.monthlyLimit : sum
  return {
    ...draftApplicationsStore.draftApplication,
    transportationFee: subsidyRule.value.transportationFee,
    transportationTotal,
    selfPayTotal,
    self_pay_programs_total: draftApplicationsStore.draftApplication.self_pay_programs_total,
    sum,
    estimatedSubsidy,
  }
})

const monthIsNew = computed(() => {
  const currentMonth = draftApplicationsStore.currentMonth
  console.log(currentMonth)
  if (!currentMonth) {
    return false
  }
  return !applications.value.some((app) => app.month === currentMonth)
})

function filterByStatus(status) {
  if (!submittedApplicationStore.submittedApplications) return []
  return submittedApplicationStore.submittedApplications.filter(
    (application) => application.status === status
  )
}
const applicationsPending = computed(() => {
  return filterByStatus('pending').map((app) => {
    const monthlyList = app.application_months.map((monthlyData) => {
      const monthlySum =
        monthlyData.transportation_count * subsidyRule.value.transportationFee +
        monthlyData.self_pay_programs_total
      //加了每個月的總計金額＆預計補助金額
      return {
        ...monthlyData,
        transportationFee: subsidyRule.value.transportationFee,
        sum: monthlySum,
        estimated_subsidy:
          monthlySum > subsidyRule.value.monthlyLimit ? subsidyRule.value.monthlyLimit : monthlySum,
      }
    })
    return {
      ...app,
      application_months: monthlyList,
      //每張單的預計補助總額
      totalSum: monthlyList.reduce(
        (totalSum, monthlySubsidy) => (totalSum += monthlySubsidy.estimated_subsidy),
        0
      ),
    }
  })
})

const applicationsClosed = computed(() => {
  const applicationsApproved = filterByStatus('approved')
  const applicationsRejected = filterByStatus('rejected')
  return applicationsApproved.concat(applicationsRejected).map((app) => {
    const monthlyList = app.application_months.map((monthlyData) => {
      const monthlySum =
        monthlyData.transportation_count * subsidyRule.value.transportationFee +
        monthlyData.self_pay_programs_total
      //加了每個月的總計金額＆預計補助金額
      return {
        ...monthlyData,
        transportationFee: subsidyRule.value.transportationFee,
        sum: monthlySum,
        estimated_subsidy:
          monthlySum > subsidyRule.value.monthlyLimit ? subsidyRule.value.monthlyLimit : monthlySum,
      }
    })
    return {
      ...app,
      application_months: monthlyList,
      //每張單的預計補助總額
      totalSum: monthlyList.reduce(
        (totalSum, monthlySubsidy) => (totalSum += monthlySubsidy.estimated_subsidy),
        0
      ),
    }
  })
})
// const applicationRejected = computed(() => {
//   return filterByStatus('rejected')
// })
onBeforeMount(async () => {
  try {
    // submitContainer.value = {
    //   months: null,
    //   cover_document_copy: '',
    //   cover_document_copy_url: '',
    // }
    await Promise.all([
      draftApplicationsStore.fetchDraftApplications(),
      submittedApplicationStore.fetchSubmittedApplications(),
      informationStore.fetchInformation(),
    ])
    //draft

    // submitContainer.value.months = applications.value.map((application) => application.month)
    //submitted
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

function toggleDetail(month) {
  if (currentMonth.value === month) {
    currentMonth.value = ''
    editedMonth.value = ''
  } else {
    currentMonth.value = month
    editedMonth.value = ''
  }
}
function initMonth() {
  console.log('add month')
  isSelectingMonth.value = true
  draftApplicationsStore.initApplication()
}

function onAddMonth() {
  isSelectingMonth.value = false
  currentMonth.value = draftApplicationsStore.currentMonth
  editedMonth.value = draftApplicationsStore.currentMonth
  // submitContainer.value.months.push(draftApplicationsStore.currentMonth)
}

function onCancelAddMonth() {
  isSelectingMonth.value = false
  draftApplicationsStore.setDraftApplication(null)
}

function onToggleSubmittedDetail(month) {
  console.log(month)

  if (currentSubmittedMonth.value === month) {
    currentSubmittedMonth.value = ''
  } else {
    currentSubmittedMonth.value = month
  }
}
function onEditDetail(month) {
  console.log(month)

  if (!draftApplicationsStore.draftApplication) {
    const [editedDetail] = draftApplicationsStore.draftApplications.filter((application) => {
      return application.month === month
    })

    draftApplicationsStore.setDraftApplication(editedDetail)
  }
  editedMonth.value = month

  // console.log('list中的物件裝進one', draftApplicationsStore.draftApplication)
}

function onUpdateDetail(updateData) {
  console.log('父層接到的j物件', updateData)

  draftApplicationsStore.setDraftApplication({
    ...draftApplicationsStore.draftApplication,
    ...updateData,
  })
  console.log('set後', draftApplicationsStore.draftApplication)
}
function showSubmitDetailDialog() {
  confirmDialogConfig.value.submitDetailIsShown = true
}
async function handleSubmitDetail() {
  try {
    isLoading.value = true
    confirmDialogConfig.value.submitDetailIsShown = false
    await draftApplicationsStore.updateDraftApplication(draftApplicationsStore.submittedDraft)
    editedMonth.value = ''
    draftApplicationsStore.setDraftApplication(null)
    $q.notify({
      message: '申請單內容已更新',
      position: 'center',
      actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
    })
    await draftApplicationsStore.fetchDraftApplications()
  } catch (err) {
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

function cancelSubmitDetail() {
  if (confirmDialogConfig.value.submitDetailIsShown === true) {
    confirmDialogConfig.value.submitDetailIsShown = false
  }
  editedMonth.value = ''
  draftApplicationsStore.setDraftApplication(null)
  $q.notify({
    message: '申請單內容未更新',
    position: 'center',
    actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
  })
}
async function handleSubmitApp() {
  //validation
  const errorList = validateSubmission()

  if (errorList.length > 0) {
    alert.value.msg = errorList.map((errorMsg, index) => `${index + 1}. ${errorMsg}`).join('\n')
    console.log(alert.value.msg)

    alert.value.isShown = true
    return
  }

  try {
    confirmDialogConfig.value.submitAppIsShown = false
    isLoading.value = true

    await draftApplicationsStore.submitCover({
      months: draftApplicationsStore.currentMonthList,
      cover_document_copy: draftApplicationsStore.coverFile,
    })
    $q.notify({
      message: '申請單已送出',
      position: 'center',
      actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
    })
    await Promise.all([
      draftApplicationsStore.fetchDraftApplications(),
      submittedApplicationStore.fetchSubmittedApplications(),
    ])
    draftApplicationsStore.resetCover()
  } catch (err) {
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
function cancelSubmitApp() {
  confirmDialogConfig.value.submitAppIsShown = false
}
function showDeleteApplicationDialog(month) {
  const deletedApp = draftApplicationsStore.draftApplications.find(
    (monthlyApp) => monthlyApp.month === month
  )

  draftApplicationsStore.setDraftApplication(deletedApp)
  console.log(draftApplicationsStore.currentMonth)

  confirmDialogConfig.value.deleteAppIsShown = true
}
async function handleDeleteApplication() {
  const currentMonth = draftApplicationsStore.currentMonth
  // const updateMonth = submitContainer.value.months.filter((month) => month !== currentMonth)
  // submitContainer.value.months = updateMonth.length === 0 ? null : updateMonth
  try {
    isLoading.value = true
    await draftApplicationsStore.deleteDraftApplication(currentMonth)
    confirmDialogConfig.value.deleteAppIsShown = false
    draftApplicationsStore.setDraftApplication(null)
    await draftApplicationsStore.fetchDraftApplications()
    $q.notify({
      message: `已刪除${currentMonth}的申請`,
      position: 'center',
      actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
    })
  } catch (err) {
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

function cancelDeleteApplication() {
  confirmDialogConfig.value.deleteAppIsShown = false
  $q.notify({
    message: '申請單未刪除',
    position: 'center',
    actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
  })
}
function onUploadCover(file) {
  const fileUrl = URL.createObjectURL(file)
  draftApplicationsStore.setCoverFile(file)
  draftApplicationsStore.setCoverUrl(fileUrl)
  // draftApplicationsStore.setCover({
  //   cover_document_copy: file,
  //   cover_document_copy_url: fileUrl,
  // })
  // submitContainer.value.cover_document_copy = file
  // submitContainer.value.cover_document_copy_url = fileUrl
}
// async function onSubmitApplication() {
//   //validation
//   const errorList = validateSubmission()

//   if (errorList.length > 0) {
//     alert.value.msg = errorList.map((errorMsg, index) => `${index + 1}. ${errorMsg}`).join('\n')
//     console.log(alert.value.msg)

//     alert.value.isShown = true
//     return
//   }

//   // const { months, cover_document_copy } = submitContainer.value

//   try {
//     isLoading.value = true

//     await draftApplicationsStore.submitCover({
//       months: draftApplicationsStore.currentMonthList,
//       cover_document_copy: draftApplicationsStore.coverFile,
//     })
//     $q.notify({
//       message: '申請單已送出',
//       position: 'center',
//       actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
//     })
//     await Promise.all([
//       draftApplicationsStore.fetchDraftApplications(),
//       submittedApplicationStore.fetchSubmittedApplications(),
//     ])
//     draftApplicationsStore.resetCover()
//     // submitContainer.value = {
//     //   months: null,
//     //   cover_document_copy: '',
//     //   cover_document_copy_url: '',
//     // }
//   } catch (err) {
//     $q.notify({
//       color: 'negative',
//       position: 'bottom',
//       message: err.message,
//       icon: 'report_problem',
//     })
//   } finally {
//     isLoading.value = false
//   }
// }
function onClearAlert() {
  alert.value.msg = ''
  alert.value.isShown = false
}
function validateSubmission() {
  console.log('validate')

  const error = []

  if (draftApplicationsStore.draftApplications.length === 0) {
    error.push('尚未輸入內容，請輸入早療上課紀錄後再送出。')
  }
  if (
    !informationStore.information.joint_evaluation_report_copies_urls ||
    !informationStore.information.diagnosis_certificate_copies_urls
  ) {
    error.push('未附補助資格驗證文件。請於個人資料頁面，上傳聯評報告期限或診斷書。')
  }
  if (!informationStore.information?.child?.joint_evaluation_report_expired_on) {
    error.push('未填補助資格期限。請於個人資料頁面，更新聯評報告期限或診斷書開立日。')
  }
  const qualificationDueSetting = parse(
    informationStore.information?.child?.joint_evaluation_report_expired_on,
    'yyyy-MM-dd',
    new Date()
  )
  const isOverdue = isAfter(new Date(), qualificationDueSetting)
  if (isOverdue) {
    error.push('補助資格期限已過期。請於個人資料頁面，更新聯評報告期限或診斷書開立日。')
  }
  const applicationsMissingTransportationDoc = draftApplicationsStore.draftApplications.filter(
    (monthlyData) => !monthlyData.transportation_document_copy_url
  )
  const missingDocMonth = applicationsMissingTransportationDoc
    .map((obj) => `${obj.month.slice(5)}月`)
    .join('、')
  if (applicationsMissingTransportationDoc.length > 0) {
    error.push(`交通紀錄卡未正確上傳，漏件月份：${missingDocMonth}`)
  }

  const applicationsWithSelfPay = draftApplicationsStore.draftApplications.filter(
    (monthlyData) => monthlyData.self_pay_programs.length > 0
  )
  if (applicationsWithSelfPay.length > 0) {
    const applicationsMissingSelfPayDoc = applicationsWithSelfPay.filter(
      (monthlyData) => !monthlyData.program_document_copy_url
    )
    const missingDocMonth = applicationsMissingSelfPayDoc
      .map((obj) => `${obj.month.slice(5)}月`)
      .join('、')

    if (applicationsMissingSelfPayDoc.length > 0) {
      error.push(`自費紀錄卡未正確上傳，漏件月份：${missingDocMonth}`)
    }
  }

  return error
}
</script>

<style lang="scss" scoped>
a {
  font-size: 14px;
  text-decoration: underline;
  color: $primary;
}
.tabs :deep(.q-tabs__content) {
  gap: 0.5rem;
}
.tab {
  background-color: $secondary;
  border-radius: 5px;
}
.application_tab {
  padding: 0px;
  background-color: $grey-3;
}
.application_action {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: fit-content;
  margin-left: auto;
}
.document_copy_upload {
  background-color: white;
  max-width: 200px;
}
.subsidy_adding {
  button {
    width: 100%;
    background-color: white;
    border: 1px solid $grey-4;
    align-items: start;
  }
}
.subsidy {
  position: relative;
  background-color: white;
  font-size: 1rem;
  .row {
    // align-items: end;
    text-align: center;
  }
  &_item {
    > * + * {
      margin-top: 0.5rem;
    }
  }
  & + .subsidy {
    margin-top: 0.5rem;
  }
}

.application_box {
  display: flex;
  .subsidy_item {
    flex-grow: 1;
  }
  .detail_toggle {
    align-self: center;
  }
}
.title {
  font-weight: 900;
}
.delete_icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
.application_detail_link {
  color: $primary;
  text-decoration: underline;
  font-size: 16px;
}
.file-name-wrapper {
  font-size: 14px;
  max-width: 150px;
  white-space: nowrap;
  // overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
