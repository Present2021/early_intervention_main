<template>
  <div class="q-pa-md">
    <QCard bordered class="bg-grey-3 my-card application-detail">
      <!-- <pre>slot props來的：{{ props.data }}</pre> -->
      <!-- <pre>自費：{{ selfPayWithMemo }}</pre> -->
      <QCardSection>
        <div class="text-h6">交通費補助</div>
        <div class="row">
          <div class="col">單次補助</div>
          <div class="col">次數</div>
          <div class="col">小計</div>
          <div class="col">紀錄卡照片</div>
          <div class="col">確認</div>
        </div>
        <QSeparator inset />
        <div class="row">
          <div class="col">{{ transportationFee }}</div>
          <div class="col">
            <span v-if="props.data.modified_transportation_count" class="q-ml-md">{{
              props.data.modified_transportation_count
            }}</span>
            <span v-else>{{ props.data.transportation_count }}</span>
          </div>
          <div class="col">
            <span v-if="props.data.modified_transportation_count" class="q-ml-md">{{
              transportationFee * props.data.modified_transportation_count
            }}</span>
            <span v-else>{{ transportationFee * props.data.transportation_count }}</span>
          </div>
          <div class="col">
            <QBtn
              flat
              color="primary"
              label="檢視"
              @click="emits('reviewTransportation')"
              class="popup_link"
            />
          </div>
          <div class="col">
            <QIcon v-if="props.data.transportation_checked" name="done" color="red"></QIcon>
          </div>
        </div>
      </QCardSection>

      <QCardSection>
        <div class="text-h6">療育費補助</div>
        <div class="row">
          <div class="col">No.</div>
          <div class="col">療育日期</div>
          <div class="col">補助金額</div>
          <div class="col">收據照片</div>
          <div class="col">確認</div>
        </div>
        <QSeparator inset />

        <div
          class="row"
          v-for="(selfPayProgram, index) in selfPayWithMemo"
          :key="selfPayProgram.program_index"
        >
          <div class="col">{{ index + 1 }}</div>
          <div class="col">{{ selfPayProgram.date }}</div>
          <div class="col">
            <span v-if="selfPayProgram.modified_amount">
              {{ selfPayProgram.modified_amount }}
            </span>
            <span v-else>
              {{ selfPayProgram.amount }}
            </span>
          </div>
          <div class="col">
            <QBtn
              flat
              color="primary"
              label="檢視"
              @click="emits('reviewSelfPay', selfPayProgram.program_index)"
              class="popup_link"
            />
          </div>
          <div class="col">
            <QIcon v-if="selfPayProgram.self_pay_program_checked" name="done" color="red"></QIcon>
          </div>
        </div>
      </QCardSection>
    </QCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const transportationFee = 200

const props = defineProps({
  // isEdited: {
  //   type: Boolean,
  //   default: false,
  // },
  data: {
    type: Object,
    default: () => ({}),
  },
  memos: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['reviewTransportation', 'reviewSelfPay'])

const selfPayWithMemo = computed(() => {
  const { self_pay_programs, modified_self_pay_programs } = props.data
  if (!self_pay_programs || self_pay_programs.length === 0) return []
  if (Object.hasOwn(props.data, 'modified_self_pay_programs')) {
    console.log('抓application')

    return self_pay_programs.map((program, index) => {
      return {
        ...program,
        ...modified_self_pay_programs[index],
      }
    })
  }
  return self_pay_programs.map((program, index) => {
    console.log('抓memo')
    return {
      ...program,
      ...props.memos.modified_self_pay_programs[index],
    }
  })
})
</script>

<style lang="scss" scoped>
a {
  font-size: 14px;
  text-decoration: underline;
  color: $primary;
}
.application-detail {
  position: relative;
}
.action {
  position: absolute;
  top: 10px;
  right: 10px;
}
.transportation_detail,
.self_pay_detail {
  .row {
    margin-top: 0.5rem;
  }
}
.document_copy {
  margin-top: 2rem;
}
.popup_link {
  text-decoration: underline;
}
.text_delete {
  text-decoration: line-through;
}
</style>
