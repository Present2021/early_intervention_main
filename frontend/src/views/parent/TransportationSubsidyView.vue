<script setup>
import { useTransportationRecordStore } from '@/stores/transportationStore'
import { computed, ref, onMounted } from 'vue'
import { format } from 'date-fns'
import RecordCard from '@/components/RecordCard.vue'
import { QBtn, QSpinner } from 'quasar'

const transportationRecordStore = useTransportationRecordStore()
const randomCodeIsShown = ref(false)
const typingIsShown = ref(false)
const qrCodeIsShown = ref(false)
const qualificationNum = ref(null)
const isLoading = ref(true)

const record = computed(() => transportationRecordStore.getTransportationRecord)
const records = computed(() => transportationRecordStore.filteredRecords)
const currentMonth = computed(() => transportationRecordStore.formattedCurrentMonth)

const therapyDate = computed(() => {
  return record.value?.therapyDate ? format(record.value.therapyDate, 'yyyy/MM/dd') : ''
})

onMounted(async () => {
  try {
    isLoading.value = true
    await transportationRecordStore.fetchTransportationRecords()
  } catch (error) {
    console.error('Failed to fetch transportation records:', error)
  } finally {
    isLoading.value = false
  }
})

function createRecordByTyping() {
  transportationRecordStore.initRecord()
  console.log(record.value)
  typingIsShown.value = true
}

function createRecordByCode() {
  transportationRecordStore.initRecord()
  console.log(record.value)
  randomCodeIsShown.value = true
}

// function createQRCode() {
//   qrCodeIsShown.value = true
// }

async function confirmCreateRecord() {
  await transportationRecordStore.createTransportationRecord()
  await transportationRecordStore.fetchTransportationRecords()
}

// function cancelCreateRecord() {
//   transportationRecordStore.setTransportationRecord({
//     id: '',
//     createdTime: '',
//     fields: {},
//   })
// }

function nextMonth() {
  transportationRecordStore.nextMonth()
}

function previousMonth() {
  transportationRecordStore.previousMonth()
}
</script>

<template>
  <div class="container">
    <div class="month-selector">
      <QBtn flat round color="primary" icon="chevron_left" @click="previousMonth" />
      <span class="current-month">{{ currentMonth }}</span>
      <QBtn flat round color="primary" icon="chevron_right" @click="nextMonth" />
    </div>
    <QBtn
      unelevated
      color="primary"
      label="新增交通補助"
      @click="createRecordByTyping"
      class="add-btn"
    />
    <QBtn
      unelevated
      color="primary"
      label="新增交通補助(隨機碼)"
      @click="createRecordByCode"
      class="add-btn q-ml-sm"
    />

    <!-- <QBtn
      unelevated
      color="primary"
      label="新增交通補助(QR code)"
      @click="createQRCode"
      class="add-btn q-ml-sm"
    /> -->
    <div class="records-container">
      <RecordCard v-for="record in records" :key="record.recordId" :record="record"></RecordCard>
    </div>
    <div class="submit_application">
      <div class="row">
        <div class="col-12">
          <!-- <QBtn
            unelevated
            color="primary"
            label="上傳交通補助申請單"
            @click="createRecordByTyping"
            class="add-btn"
            icon="cloud_upload"
            style="min-width: 400px"
          /> -->
          <QFile outlined dense v-model="model" label="上傳交通補助單據">
            <template v-slot:prepend>
              <QIcon name="attach_file" />
            </template>
          </QFile>
        </div>
        <div class="col-12 q-mt-sm">
          <QBtn
            unelevated
            color="primary"
            label="送出補助申請"
            @click="createRecordByTyping"
            class="add-btn"
            icon="send"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
    <!-- typing dialog -->
    <QDialog v-model="typingIsShown" persistent>
      <QCard>
        <QCardSection class="items-center">
          <QAvatar icon="note_add" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">新增一個交通補助紀錄</span>

          <QForm class="q-mt-md">
            <QInput
              dense
              outlined
              label="上課地點"
              v-model="qualificationNum"
              class="q-pb-md"
            ></QInput>
            <QInput
              dense
              outlined
              label="療育項目"
              v-model="qualificationNum"
              class="q-pb-md"
            ></QInput>
            <QInput outlined dense v-model="date" mask="date" :rules="['date']" label="上課日期">
              <template v-slot:append>
                <QIcon name="event" class="cursor-pointer">
                  <QPopupProxy cover transition-show="scale" transition-hide="scale">
                    <QDate v-model="date">
                      <div class="row items-center justify-end">
                        <QBtn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </QDate>
                  </QPopupProxy>
                </QIcon>
              </template>
            </QInput>
          </QForm>
        </QCardSection>

        <QCardActions align="right">
          <QBtn flat label="取消" color="primary" v-close-popup />
          <QBtn flat label="確認" color="primary" v-close-popup @click="confirmCreateRecord" />
        </QCardActions>
      </QCard>
    </QDialog>
    <!-- random code dialog -->
    <QDialog v-model="randomCodeIsShown" persistent>
      <QCard>
        <QCardSection class="items-center">
          <QAvatar icon="note_add" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">新增一個交通補助紀錄</span>
          <div class="q-mt-md">上課日期：{{ therapyDate }}</div>
          <QForm class="q-mt-sm">
            <QInput dense outlined label="請輸入驗證碼" v-model="qualificationNum"></QInput>
          </QForm>
        </QCardSection>

        <QCardActions align="right">
          <QBtn flat label="取消" color="primary" v-close-popup />
          <QBtn flat label="確認" color="primary" v-close-popup @click="confirmCreateRecord" />
        </QCardActions>
      </QCard>
    </QDialog>
    <!-- QR code dialog -->
    <QDialog v-model="qrCodeIsShown" persistent>
      <QCard>
        <QCardSection class="items-center">
          <QAvatar icon="note_add" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">新增一個交通補助紀錄</span>
          <div class="q-mt-md text-center">請讓院所掃描QR code以新增療育紀錄</div>
          <div class="q-mt-md qr_container">
            <img src="../../assets/fakeQR.png" alt="QR code" />
          </div>
          <div class="text-center">QR code 重刷 5:00</div>
        </QCardSection>

        <QCardActions align="right">
          <QBtn flat label="OK" color="primary" v-close-popup />
        </QCardActions>
      </QCard>
    </QDialog>
    <!-- q-spinner -->
    <QDialog v-model="isLoading" persistent>
      <div class="row justify-center items-center" style="height: 50px">
        <QSpinner color="primary" size="40px" />
      </div>
    </QDialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1.5rem;
  > * + * {
    margin-top: 1rem;
  }
}
.qr_container {
  width: 200px;
  margin: auto;
  img {
    width: 100%;
  }
}
</style>
