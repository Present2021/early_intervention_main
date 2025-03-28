<template>
  <div class="q-pa-md">
    <!-- <pre>{{ acceptedApplicationsStore.currentDetail }}</pre> -->

    <QTabs
      v-model="tab"
      dense
      class="text-white tabs"
      active-bg-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <QTab name="all" label="全部收件" class="tab" />
      <QTab name="pending" label="待審中" class="tab" />
      <QTab name="closed" label="已審完" class="tab" />
      <QTab name="paused" label="待補件" class="tab" />
    </QTabs>
  </div>
  <QTabPanels v-model="tab" animated>
    <QTabPanel class="container" name="all">
      <ApplicationCard
        v-for="application in acceptedApplicationsStore.applications"
        :key="application.id"
        :data="application"
        @toggleDetail="onToggleDetail"
        @reviewInformation="onReviewInformation"
        @approveApplication="onApproveApplication"
        @rejectApplication="onRejectApplication"
        v-slot="slotProps"
      >
        <ApplicationDetailSocailAffair
          v-if="
            acceptedApplicationsStore.currentApplicationId === application.id &&
            currentMonth === slotProps.data.month
          "
          :data="slotProps.data"
          :memos="acceptedApplicationsStore.memos.find((memo) => memo.month === currentMonth)"
          @reviewTransportation="onReviewTransportation"
          @reviewSelfPay="onReviewSelfPay"
        />
      </ApplicationCard>
    </QTabPanel>
    <QTabPanel name="pending">
      <div v-if="pendingApplications.length === 0" class="text-h6">未有審核中的案件</div>
      <ApplicationCard
        v-for="application in pendingApplications"
        :key="application.id"
        :data="application"
        @toggleDetail="onToggleDetail"
        @reviewInformation="onReviewInformation"
        @approveApplication="onApproveApplication"
        @rejectApplication="onRejectApplication"
        v-slot="slotProps"
      >
        <ApplicationDetailSocailAffair
          v-if="
            acceptedApplicationsStore.currentApplicationId === application.id &&
            currentMonth === slotProps.data.month
          "
          :data="slotProps.data"
          :memos="acceptedApplicationsStore.memos.find((memo) => memo.month === currentMonth)"
          @reviewTransportation="onReviewTransportation"
          @reviewSelfPay="onReviewSelfPay"
        />
      </ApplicationCard>
    </QTabPanel>
    <QTabPanel name="closed">
      <div v-if="closedApplications.length === 0" class="text-h6">未有已審完的案件</div>

      <ApplicationCard
        v-for="application in closedApplications"
        :key="application.id"
        :data="application"
        @toggleDetail="onToggleDetail"
        @reviewInformation="onReviewInformation"
        v-slot="slotProps"
      >
        <ApplicationDetailSocailAffair
          v-if="
            acceptedApplicationsStore.currentApplicationId === application.id &&
            currentMonth === slotProps.data.month
          "
          :data="slotProps.data"
          :memos="acceptedApplicationsStore.memos.find((memo) => memo.month === currentMonth)"
          @reviewTransportation="onReviewTransportation"
          @reviewSelfPay="onReviewSelfPay"
        />
      </ApplicationCard>
    </QTabPanel>
    <QTabPanel name="paused">
      <div class="text-h6">待補件</div>
      待補件
    </QTabPanel>
  </QTabPanels>

  <QDialog v-model="transportationDialogIsShown" persistent>
    <QCard style="min-width: 500px">
      <!-- <pre>{{ acceptedApplicationsStore.memo }}</pre> -->
      <QCardSection>
        <div class="document_copy">
          <!-- v-if="transportationDialogData.file_url" -->
          <img
            :src="
              acceptedApplicationsStore.currentDetail.find(
                (detail) => detail.month === currentMonth
              ).transportation_document_copy_url
            "
            alt="交通補助卡"
          />
          <!-- <span v-else class="q-ml-md">尚無檔案</span> -->
        </div>
      </QCardSection>
      <QCardSection class="q-pt-none">
        <div class="text-h6">交通費補助</div>
      </QCardSection>
      <QForm>
        <QCardSection class="q-pt-none">
          <div class="row">
            <div class="col">
              <p class="dialog_subtitle">民眾自填</p>
              <p>
                200元 x
                {{
                  acceptedApplicationsStore.currentDetail.find(
                    (detail) => detail.month === currentMonth
                  ).transportation_count
                }}＝
                {{
                  acceptedApplicationsStore.currentDetail.find(
                    (detail) => detail.month === currentMonth
                  ).transportation_count * transportationFee
                }}元
              </p>
            </div>
            <div class="col">
              <p class="dialog_subtitle">核定金額</p>
              <p>
                <span> 200元 x </span>
                <input
                  type="text"
                  :value="acceptedApplicationsStore.memo.modified_transportation_count"
                  @change="
                    acceptedApplicationsStore.setMemo({
                      ...acceptedApplicationsStore.memo,
                      modified_transportation_count: +$event.target.value,
                    })
                  "
                  style="max-width: 50px"
                />
                <span>
                  ＝
                  {{
                    acceptedApplicationsStore.memo.modified_transportation_count *
                    transportationFee
                  }}元</span
                >
              </p>
            </div>
          </div>
          <p class="dialog_subtitle">核定備註欄</p>
          <QInput
            outlined
            dense
            :model-value="acceptedApplicationsStore.memo.transportation_memo"
            @update:model-value="
              acceptedApplicationsStore.setMemo({
                ...acceptedApplicationsStore.memo,
                transportation_memo: $event,
              })
            "
            bottom-slots
            type="textarea"
          >
            <template v-slot:hint>
              記入本次核定金額的理由事項，審核完成後會顯示給民眾看。
            </template>
          </QInput>
        </QCardSection>

        <QCardActions align="right" class="text-primary">
          <QBtn
            v-if="acceptedApplicationsStore.application.status === 'pending'"
            flat
            color="primary"
            label="核定完成"
            @click="onCheckTransportation"
          />

          <QBtn
            v-if="acceptedApplicationsStore.application.status === 'pending'"
            flat
            color="red"
            label="改補件"
          />
          <QBtn
            flat
            color="black"
            label="關閉此視窗"
            @click="transportationDialogIsShown = false"
          />
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>

  <QDialog v-model="selfPayDialogIsShown" persistent>
    <QCard style="min-width: 500px">
      <!-- <pre>{{ acceptedApplicationsStore.memo.modified_self_pay_programs }}</pre> -->
      <QCardSection>
        <div class="document_copy">
          <img v-if="currentSelfPay.file_url" :src="currentSelfPay.file_url" alt="收據" />
          <span v-else class="q-ml-md">尚無檔案</span>
        </div>
      </QCardSection>
      <QCardSection class="q-pt-none">
        <div class="text-h6">療育費補助</div>
      </QCardSection>
      <QForm>
        <QCardSection class="q-pt-none">
          <div class="row">
            <div class="col">
              <p class="dialog_subtitle">療育日期</p>
              <p>
                {{ currentSelfPay.date }}
              </p>
            </div>
            <div class="col">
              <p class="dialog_subtitle">申請金額</p>
              <p>
                {{ currentSelfPay.amount }}
              </p>
            </div>
            <div class="col">
              <p class="dialog_subtitle">補助金額</p>
              <p>
                <input
                  style="max-width: 80px"
                  :value="
                    acceptedApplicationsStore.memo.modified_self_pay_programs.find(
                      (program) => program.program_index === selfPayReviewIndex
                    ).modified_amount
                  "
                  @change="onChangeSelfPayAmount"
                />
              </p>
            </div>
          </div>
          <p class="dialog_subtitle">核定備註欄</p>
          <QInput
            outlined
            dense
            :model-value="
              acceptedApplicationsStore.memo.modified_self_pay_programs.find(
                (program) => program.program_index === selfPayReviewIndex
              ).self_pay_program_memo
            "
            @update:model-value="onChangeSelfPayMemo"
            bottom-slots
            type="textarea"
          >
            <template v-slot:hint>
              記入本次核定金額的理由事項，審核完成後會顯示給民眾看。
            </template>
          </QInput>
        </QCardSection>

        <QCardActions align="right" class="text-primary">
          <QBtn
            v-if="acceptedApplicationsStore.application.status === 'pending'"
            flat
            color="primary"
            @click="onCheckSelfPay"
            label="核定完成"
          />
          <QBtn
            v-if="acceptedApplicationsStore.application.status === 'pending'"
            flat
            color="red"
            label="改補件"
          />
          <QBtn flat color="black" label="關閉此視窗" v-close-popup />
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>

  <QDialog v-model="informationDialogIsShown">
    <QCard style="min-width: 500px">
      <PersonalDataReview :data="qualificationStore.qualificationInfo">
        <QBtn
          v-if="!qualificationStore.qualificationInfo.identity_verified"
          flat
          color="primary"
          label="資格審核完成"
          @click="onQualify(qualificationStore.qualificationAppId)"
        ></QBtn>
        <QBtn flat color="black" label="關閉此視窗" @click="onCloseInformationDialog"></QBtn>
      </PersonalDataReview>
    </QCard>
  </QDialog>
  <QDialog v-model="alert.isShown">
    <AlertDialog :alertMsg="alert.msg" :user="alert.user" @clear-alert="onClearAlert" />
  </QDialog>
  <QDialog v-model="isLoading">
    <QSpinner color="primary" size="2em" />
  </QDialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useAcceptedApplicationStore } from '@/stores/acceptedApplicationStore'
import { useQualificationStore } from '@/stores/qulificationStore'
import ApplicationDetailSocailAffair from '@/components/ApplicationDetailSocailAffair.vue'

import PersonalDataReview from '@/components/dialog/PersonalDataReview.vue'
import ApplicationCard from '@/components/ApplicationCard.vue'
import AlertDialog from '@/components/dialog/AlertDialog.vue'
import { useQuasar } from 'quasar'

const acceptedApplicationsStore = useAcceptedApplicationStore()
const qualificationStore = useQualificationStore()
const $q = useQuasar()

const isLoading = ref(true)

const openedDetailInfo = ref({
  id: null,
  childId: '',
  month: '',
})
const currentMonth = ref('')
const tab = ref('all')
const transportationDialogIsShown = ref(false)
const selfPayDialogIsShown = ref(false)
const informationDialogIsShown = ref(false)
const selfPayReviewIndex = ref(null)
const alert = ref({
  msg: '',
  user: 'sab',
  isShown: false,
})
const transportationFee = 200

const currentSelfPay = computed(() => {
  console.log('index', selfPayReviewIndex.value)

  return acceptedApplicationsStore.currentDetail
    .find((detail) => detail.month === currentMonth.value)
    .self_pay_programs.find((program) => program.program_index === +selfPayReviewIndex.value)
})

onMounted(async () => {
  try {
    isLoading.value = true
    await acceptedApplicationsStore.fetchAcceptedApplications()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
const pendingApplications = computed(() => {
  return filterByStatus('pending')
})
const closedApplications = computed(() => {
  const approved = filterByStatus('approved')
  const rejected = filterByStatus('rejected')
  return approved.concat(rejected)
})

function filterByStatus(status) {
  if (!acceptedApplicationsStore.applications) return []
  return acceptedApplicationsStore.applications.filter(
    (application) => application.status === status
  )
}

function filterByApplicationId(id) {
  if (!acceptedApplicationsStore.applications) return {}
  const [data] = acceptedApplicationsStore.applications.filter((app) => app.id === id)
  return data
}
async function onToggleDetail(identifier) {
  console.log(identifier)

  // 如果是同一個孩子且同一個月份，則關閉詳細資料
  if (
    acceptedApplicationsStore.currentApplicationId === openedDetailInfo.value.id &&
    openedDetailInfo.value.month === identifier.currentMonth
  ) {
    acceptedApplicationsStore.setApplication(null)
    currentMonth.value = ''
    openedDetailInfo.value = {
      id: null,
      childId: '',
      month: '',
    }
    //並清空store的memo容器
    acceptedApplicationsStore.setMemos([])
    acceptedApplicationsStore.setMemo(null)
    return
  }

  // 其他情況都是要顯示詳細資料
  // const data = filterByChildId(identifier.childId)
  // acceptedApplicationsStore.setApplicationsByChildId(data)
  const data = filterByApplicationId(identifier.applicationId)
  acceptedApplicationsStore.setApplication(data)
  currentMonth.value = identifier.currentMonth
  openedDetailInfo.value = {
    id: identifier.applicationId,
    childId: identifier.childId,
    month: identifier.currentMonth,
  }

  //展開detail時, 檢查目前資料庫是否有memo
  const monthList = acceptedApplicationsStore.application.application_months.map((app) => app.month)

  if (acceptedApplicationsStore.application.sab_memo.length === 0) {
    //as get回來的array長度=0(沒有memo), init memo物件
    console.log('init')
    console.log('init ', acceptedApplicationsStore.initMemos(monthList))
    acceptedApplicationsStore.setMemos(acceptedApplicationsStore.initMemos(monthList))
  } else {
    //有memo直接拿
    console.log('exist')
    const activeSabMemo = acceptedApplicationsStore.allMemo.find(
      (sabMemo) => sabMemo.id === acceptedApplicationsStore.application.id
    )
    console.log('準備set進去的memos', activeSabMemo.sab_memo)

    acceptedApplicationsStore.setMemos(activeSabMemo.sab_memo)
    console.log('exist, memos', acceptedApplicationsStore.memos)
  }
  //   //set進去的可能是數字或字串
  acceptedApplicationsStore.setMemo(
    acceptedApplicationsStore.memos.find((memo) => memo.month === currentMonth.value)
  )
}
function onReviewInformation(applicationId) {
  console.log('information', applicationId)
  const info = acceptedApplicationsStore.applications.find((app) => app.id === applicationId)
  qualificationStore.setQualificationInfo(info)
  console.log('qualify store的one', qualificationStore.qualificationInfo)

  informationDialogIsShown.value = true
}
function onReviewTransportation() {
  console.log('click transportation')
  console.log(acceptedApplicationsStore.memo)

  transportationDialogIsShown.value = true
}
function onReviewSelfPay(index) {
  console.log('click', index)

  selfPayDialogIsShown.value = true
  selfPayReviewIndex.value = +index
}

function onChangeSelfPayAmount(event) {
  const target = acceptedApplicationsStore.memo.modified_self_pay_programs.find(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const targetIndex = acceptedApplicationsStore.memo.modified_self_pay_programs.findIndex(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const updatedTarget = {
    ...target,
    modified_amount: event.target.value,
  }
  console.log(updatedTarget)

  acceptedApplicationsStore.setMemo({
    ...acceptedApplicationsStore.memo,
    modified_self_pay_programs: [
      //頭
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(0, targetIndex),

      updatedTarget,
      //尾
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(
        targetIndex + 1,
        acceptedApplicationsStore.memo.modified_self_pay_programs.length
      ),
    ],
  })
  console.log('改金額後的memo', acceptedApplicationsStore.memo)
}
function onChangeSelfPayMemo(newMemo) {
  //q-input無須解包newValue
  const target = acceptedApplicationsStore.memo.modified_self_pay_programs.find(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const targetIndex = acceptedApplicationsStore.memo.modified_self_pay_programs.findIndex(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const updatedTarget = {
    ...target,
    self_pay_program_memo: newMemo,
  }
  acceptedApplicationsStore.setMemo({
    ...acceptedApplicationsStore.memo,
    modified_self_pay_programs: [
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(0, targetIndex),
      updatedTarget,
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(
        targetIndex + 1,
        acceptedApplicationsStore.memo.modified_self_pay_programs.length
      ),
    ],
  })
  console.log('改備註後的memo', acceptedApplicationsStore.memo)
}

async function onCheckTransportation() {
  acceptedApplicationsStore.setMemo({
    ...acceptedApplicationsStore.memo,
    transportation_checked: true,
  })
  console.log(acceptedApplicationsStore.memo)
  const target = acceptedApplicationsStore.memo
  console.log('target', target)
  console.log(
    'store memos',
    acceptedApplicationsStore.memos.map((memo) => memo.memo_index)
  )

  const targetIndex = acceptedApplicationsStore.memos.findIndex(
    (memo) => memo.memo_index === target.memo_index
  )
  const updatedMemos = [
    ...acceptedApplicationsStore.memos.slice(0, targetIndex),
    target,
    ...acceptedApplicationsStore.memos.slice(
      targetIndex + 1,
      acceptedApplicationsStore.memos.length
    ),
  ]
  console.log(`[
    ...acceptedApplicationsStore.memos.slice(0, ${targetIndex}),
    target,
    ...acceptedApplicationsStore.memos.slice(
      ${targetIndex + 1},
      ${acceptedApplicationsStore.memos.length}
    ),
  ]`)

  console.log(updatedMemos)
  try {
    isLoading.value = true
    await acceptedApplicationsStore.updateMemos(
      acceptedApplicationsStore.currentApplicationId,
      updatedMemos
    )
    //重新fetch & 重裝allMemo
    await acceptedApplicationsStore.fetchAcceptedApplications()

    transportationDialogIsShown.value = false
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
async function onCheckSelfPay() {
  //self_pay_program_checked false->true

  updateSelfPayProgramField({ self_pay_program_checked: true })
  //拿store中的memo組裝成新的memos
  const target = acceptedApplicationsStore.memo
  const targetIndex = acceptedApplicationsStore.memos.findIndex(
    (memo) => memo.memo_index === target.memo_index
  )
  const newMemos = [
    ...acceptedApplicationsStore.memos.slice(0, targetIndex),
    target,
    ...acceptedApplicationsStore.memos.slice(
      targetIndex + 1,
      acceptedApplicationsStore.memos.length
    ),
  ]
  console.log(`[
    ...acceptedApplicationsStore.memos.slice(0, ${targetIndex}),
    acceptedApplicationsStore.memo,
    ...acceptedApplicationsStore.memos.slice(
      ${targetIndex + 1},
      ${acceptedApplicationsStore.memos.length}
    ),
  ]`)

  console.log('new memos:', newMemos)

  // PUT更新資料庫的memos
  try {
    isLoading.value = true
    await acceptedApplicationsStore.updateMemos(
      acceptedApplicationsStore.currentApplicationId,
      newMemos
    )
    await acceptedApplicationsStore.fetchAcceptedApplications()

    selfPayDialogIsShown.value = false
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
function updateSelfPayProgramField(fieldObj) {
  const targetProgram = acceptedApplicationsStore.memo.modified_self_pay_programs.find(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const targetIndex = acceptedApplicationsStore.memo.modified_self_pay_programs.findIndex(
    (program) => program.program_index === selfPayReviewIndex.value
  )
  const updatedTargetProgram = {
    ...targetProgram,
    ...fieldObj,
  }
  acceptedApplicationsStore.setMemo({
    ...acceptedApplicationsStore.memo,
    modified_self_pay_programs: [
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(0, targetIndex),
      updatedTargetProgram,
      ...acceptedApplicationsStore.memo.modified_self_pay_programs.slice(
        targetIndex + 1,
        acceptedApplicationsStore.memo.modified_self_pay_programs.length
      ),
    ],
  })
  console.log('memo已確認', acceptedApplicationsStore.memo)
}

async function onQualify(AppId) {
  try {
    isLoading.value = true
    await qualificationStore.qualify(AppId)
    await acceptedApplicationsStore.fetchAcceptedApplications()

    informationDialogIsShown.value = false
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
function onCloseInformationDialog() {
  informationDialogIsShown.value = false
}

async function onApproveApplication(applicationId) {
  console.log(applicationId)
  const errorList = validateUpdatingStatus(applicationId)

  if (errorList.length === 0) {
    await updateApplicationStatus(applicationId, 'approve')
  } else {
    showAlert(errorList)
  }
}
async function onRejectApplication(applicationId) {
  const errorList = validateUpdatingStatus(applicationId)
  if (errorList.length === 0) {
    await updateApplicationStatus(applicationId, 'reject')
  } else {
    showAlert(errorList)
  }
}
async function updateApplicationStatus(applicationId, action) {
  try {
    isLoading.value = true
    console.log('all', acceptedApplicationsStore.applications)

    const { id, sab_memo } = acceptedApplicationsStore.applications.find(
      (app) => app.id === applicationId
    )
    const apiData = {
      id,
      sab_memo,
    }
    console.log(apiData)
    if (action === 'approve') {
      await acceptedApplicationsStore.approve(apiData)
      $q.notify({
        message: `申請單已核准`,
        position: 'center',
        actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
      })
    } else if (action === 'reject') {
      await acceptedApplicationsStore.reject(apiData)
      $q.notify({
        message: `申請單已駁回`,
        position: 'center',
        actions: [{ icon: 'done', color: 'white', size: '10px', round: true, dense: true }],
      })
    }
    await acceptedApplicationsStore.fetchAcceptedApplications()
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
function showAlert(errorList) {
  alert.value.isShown = true
  alert.value.msg = errorList.map((error, index) => `${index + 1}. ${error}`).join('\n')
}
function validateUpdatingStatus(applicationId) {
  const error = []
  const { sab_memo } = findActiveApplication(applicationId)

  if (sab_memo.length === 0) {
    error.push('請先確認申請內容再作核准')
  }
  const monthsMissingTransportationChecked = sab_memo
    .filter((monthlyMemo) => !monthlyMemo.transportation_checked)
    .map((monthlyMemo) => monthlyMemo.month)

  if (monthsMissingTransportationChecked.length > 0) {
    error.push(`${monthsMissingTransportationChecked.join('、')} 以上月份\n交通費尚未確認內容`)
  }

  const monthMissingSelfPayChecked = sab_memo
    .filter((monthlyMemo) => {
      return !monthlyMemo.modified_self_pay_programs.every((program) => {
        return program.self_pay_program_checked
      })
    })
    .map((monthlyMemo) => monthlyMemo.month)
  if (monthMissingSelfPayChecked.length > 0) {
    error.push(`${monthMissingSelfPayChecked.join('、')} 以上月份\n有自費項目尚未確認內容。`)
  }
  return error
}
function onClearAlert() {
  alert.value = {
    isShown: false,
    msg: '',
    user: 'sab',
  }
}
function findActiveApplication(applicationId) {
  return acceptedApplicationsStore.applications.find((obj) => obj.id === applicationId)
}
</script>

<style lang="scss" scoped>
.tabs :deep(.q-tabs__content) {
  gap: 0.5rem;
}
.tab {
  background-color: $secondary;
  border-radius: 5px;
}
.container {
  background-color: $grey-1;
  > div + div {
    margin-top: 1rem;
  }
}

.document_copy {
  width: 100%;
  height: 300px;
  overflow: scroll;
  border: 1px solid $grey-4;
  border-radius: 3px;
  img {
    width: 100%;

    object-fit: contain;
  }
}
.document_copy::after {
  content: '';
  position: absolute;
  top: 18px;
  right: 18px; /* 靠右放置 */
  width: 8px; /* 寬度像捲軸 */
  height: 60px; /* 提示條高度 */
  background: rgba(0, 0, 0, 0.2); /* 半透明效果 */
  border-radius: 2px; /* 圓角讓它像捲軸 */
  animation: pulse 1.5s infinite; /* 增加提示動畫 */
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
.dialog_subtitle {
  // font-size: 16px;
  font-weight: 600;
}
</style>
