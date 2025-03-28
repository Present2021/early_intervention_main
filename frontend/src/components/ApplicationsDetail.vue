<template>
  <div v-if="isShown">
    <!-- <pre>active id: {{ props.currentChildId }}</pre>
    <pre>active month: {{ props.currentMonth }}</pre>
    <pre>id: {{ props.applicationChildId }}</pre>
    <pre>month: {{ props.applicationMonth }}</pre>
    <pre>{{ props.transportationData }}</pre> -->
    <QCard bordered class="bg-grey-3 my-card transportation-detail">
      <QCardSection>
        <div class="text-h6">交通費補助</div>
        <div class="row">
          <div class="col">月份</div>
          <div class="col">單次補助</div>
          <div class="col">次數</div>
          <div class="col">小計</div>
          <div class="col">審視細節</div>
        </div>
        <QSeparator inset />
        <div class="row">
          <div class="col">
            <QBtn @click="transportationDetailIsShown = !transportationDetailIsShown" flat>{{
              props.transportationData.month
            }}</QBtn>
          </div>
          <div class="col">{{ transportationFee }}</div>
          <div class="col">{{ props.transportationData.counts }}</div>
          <div class="col">{{ props.transportationData.sum }}</div>
          <div class="col">{{ props.transportationData.checked }}</div>
        </div>
      </QCardSection>
    </QCard>
    <QCard bordered class="bg-grey-3 my-card self-pay-detail q-mt-md">
      <QCardSection>
        <div class="text-h6">療育費補助</div>
        <div class="row">
          <div class="col">No.</div>
          <div class="col">療育日期</div>
          <div class="col">自費金額</div>
          <div class="col">收據</div>
          <div class="col">審視細節</div>
        </div>
        <QSeparator inset />
        <div class="row">
          <div class="col">1</div>
          <div class="col">2024/09/02</div>
          <div class="col">1000</div>
          <div class="col">
            <span>fake link</span>
          </div>
          <div class="col">已確認</div>
        </div>
        <div class="row">
          <div class="col">2</div>
          <div class="col">2024/09/09</div>
          <div class="col">1000</div>
          <div class="col">
            <span>fake link</span>
          </div>
          <div class="col">已確認</div>
        </div>
      </QCardSection>
    </QCard>

    <!-- transportation detail -->
    <QDialog v-model="transportationDetailIsShown" persistent>
      <QCard style="min-width: 500px">
        <QCardSection>
          <div class="text-h6">交通補助附件</div>
        </QCardSection>
        <QCardSection>
          <div><img src="https://picsum.photos/250/350" alt="交通補助卡" /></div>
        </QCardSection>
        <QFrom>
          <QCardSection class="q-pt-none">
            <span>本月申請次數：</span
            ><QInput
              outlined
              dense
              autofocus
              :modelValue="transportationData.counts"
              @update:modelValue="
                $emit('updateTransportation', {
                  ...props.transportationData,
                  counts: +$event,
                })
              "
            />
            <span>修改原因：</span><QInput outlined dense v-model="phone" type="textarea" />
          </QCardSection>

          <QCardActions align="right" class="text-primary">
            <QBtn flat label="取消" @click="transportationDetailIsShown = false" />
            <QBtn flat label="已確認內容" @click="confirmTransportation" />
          </QCardActions>
        </QFrom>
      </QCard>
    </QDialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
// import { useTransportationRecordStore } from '@/stores/transportationStore'

// const transportationStore = useTransportationRecordStore()
// const transportationFee = ref(200)

const props = defineProps({
  currentChildId: {
    type: String,
    default: '',
  },
  currentMonth: {
    type: String,
    default: '',
  },
  applicationChildId: {
    type: String,
    default: '',
  },
  applicationMonth: {
    type: String,
    default: '',
  },
  transportationData: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['updateTransportation'])
// const transportationData = ref(props.transportationData)
const isShown = computed(() => {
  if (!props.transportationData) return false
  return (
    props.currentChildId === props.applicationChildId &&
    props.currentMonth === props.applicationMonth
  )
})
const transportationDetailIsShown = ref(false)
function confirmTransportation() {
  emits('updateTransportation', {
    ...props.transportationData,
    checked: false,
  })
  transportationDetailIsShown.value = false
}
</script>

<style></style>
