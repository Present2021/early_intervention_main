<template>
  <div class="q-pa-md">
    <QBtn
      unelevated
      color="primary"
      label="新增上課報到隨機碼"
      @click="createRandom"
      class="add-btn q-mb-sm"
    />
    <QTable
      title="交通補助紀錄"
      :rows="transportationRecords"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <QTd :props="props">
          <QBtn flat round color="primary" icon="edit" @click="editRecord(props.row)" />
          <!-- <QBtn flat round color="negative" icon="delete" @click="deleteRecord(props.row)" /> -->
        </QTd>
      </template>
    </QTable>
  </div>
  <QDialog v-model="recordEditorIsShown" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <QAvatar icon="note_add" color="primary" text-color="white" />
        <span class="q-ml-sm text-h6">請輸入療育紀錄細節</span>
        <QForm class="q-mt-md">
          <QInput
            dense
            autofocus
            outlined
            :model-value="transportationStore.getTransportationRecord.rehabCenter"
            @update:model-value="
              (value) =>
                transportationStore.setTransportationRecord({
                  ...transportationStore.getTransportationRecord,
                  rehabCenter: value,
                })
            "
            label="療育地點"
          />

          <QInput
            dense
            outlined
            :model-value="transportationStore.getTransportationRecord.therapyType"
            @update:modelValue="
              (value) =>
                transportationStore.setTransportationRecord({
                  ...transportationStore.getTransportationRecord,
                  therapyType: value,
                })
            "
            label="療育項目"
            class="q-mt-sm"
          />
          <QInput
            dense
            outlined
            :model-value="transportationStore.getTransportationRecord.therapist"
            @update:modelValue="
              (value) => {
                const { childName, childId, childBirthDate, id, createdTime, ...fields } =
                  transportationStore.getTransportationRecord
                transportationStore.setTransportationRecord({
                  id,
                  createdTime,
                  ...fields,
                  therapist: value,
                })
              }
            "
            label="療育人員"
            class="q-mt-sm"
          />
        </QForm>
      </QCardSection>

      <QCardSection class="q-pt-none"> </QCardSection>

      <QCardActions align="right" class="text-primary">
        <QBtn flat label="取消" v-close-popup />
        <QBtn flat label="確定" v-close-popup @click="updateRecord" />
      </QCardActions>
    </QCard>
  </QDialog>
  <!-- 上課隨機碼 -->
  <QDialog v-model="randomIsShown" persistent>
    <QCard>
      <QCardSection class="items-center">
        <QAvatar icon="note_add" color="primary" text-color="white" />
        <span class="q-ml-sm text-h6">上課報到隨機碼</span>
        <div class="q-mt-md">隨機碼：{{ random }}</div>
      </QCardSection>

      <QCardActions align="right">
        <QBtn flat label="取消" color="primary" v-close-popup />
        <QBtn flat label="確認" color="primary" v-close-popup @click="confirmCreateRecord" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTransportationRecordStore } from '@/stores/transportationStore'
// import { useQuasar } from 'quasar'
import { format } from 'date-fns'
const transportationStore = useTransportationRecordStore()
// const $q = useQuasar()

const loading = ref(true)
const recordEditorIsShown = ref(false)
const randomIsShown = ref(false)
const random = ref(null)

const columns = [
  { name: 'childId', label: '身分證號碼', field: 'childId', sortable: true, align: 'left' },
  { name: 'childName', label: '個案姓名', field: 'childName', sortable: true, align: 'left' },
  { name: 'therapyDate', label: '療育日期', field: 'therapyDate', sortable: true, align: 'left' },
  { name: 'therapyType', label: '療育項目', field: 'therapyType', sortable: true, align: 'left' },
  { name: 'rehabCenter', label: '療育地點', field: 'rehabCenter', sortable: true, align: 'left' },
  { name: 'therapist', label: '治療師', field: 'therapist', sortable: true, align: 'left' },
  // { name: 'status', label: '單況', field: 'status', sortable: true, align: 'left' },
  { name: 'actions', field: 'actions' },
]

const transportationRecords = computed(() => {
  return transportationStore.getTransportationRecords.map((record) => ({
    ...record,
    childName: record.childName[0],
    childId: record.childId[0],
    therapyDate: format(record.therapyDate, 'yyyy/MM/dd'),
  }))
})

onMounted(async () => {
  await transportationStore.fetchTransportationRecords()
  loading.value = false
})

async function editRecord(row) {
  // 实现编辑记录的逻辑
  console.log('编辑紀錄:', row)
  recordEditorIsShown.value = true
  await transportationStore.fetchTransportationRecord(row.id)
  console.log('one before edit', transportationStore.getTransportationRecord)
}
async function updateRecord() {
  console.log('one after edit', transportationStore.getTransportationRecord)
  await transportationStore.updateTransportationRecord()
  await transportationStore.fetchTransportationRecords()
}

function createRandom() {
  randomIsShown.value = true
  random.value = (1000000 * Math.random()).toFixed(0)
}
// function deleteRecord(row) {
//   $q.dialog({
//     title: '確定删除',
//     message: `確定要删除紀錄 ${row.recordId} 嗎？`,
//     cancel: true,
//     persistent: true,
//   }).onOk(() => {
//     // 实现删除记录的逻辑
//     console.log('删除紀錄:', row)
//   })
// }
</script>

<style lang="scss" scoped></style>
