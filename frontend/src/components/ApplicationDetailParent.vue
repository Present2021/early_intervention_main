<template>
  <div class="q-pa-md">
    <!-- <pre>isSubmitted: {{ props.data }}</pre> -->
    <!-- <pre>{{ props.month }}</pre> -->
    <QCard bordered class="bg-grey-3 my-card application-detail">
      <QCardSection>
        <div class="text-h6">交通費補助</div>
        <div class="row">
          <div class="col">月份</div>
          <div class="col">單次補助</div>
          <div class="col">次數</div>
          <div class="col">小計</div>
        </div>
        <QSeparator inset />
        <div class="row">
          <div class="col">
            {{ props.data.month }}
          </div>
          <div class="col">{{ props.data.transportationFee }}</div>
          <div class="col">{{ props.data.transportation_count }}</div>
          <div class="col">
            {{ props.data.transportationFee * props.data.transportation_count }}
          </div>
        </div>
        <div class="document_copy">
          <span>交通紀錄卡:</span>
          <a
            v-if="props.data.transportation_document_copy_url"
            :href="props.data.transportation_document_copy_url"
            class="q-ml-md"
            target="_blank"
          >
            檢視交通紀錄卡
          </a>
          <span v-else class="q-ml-md">尚無檔案</span>
        </div>
      </QCardSection>

      <QCardSection>
        <div class="text-h6">療育費補助</div>
        <div class="row">
          <div class="col">No.</div>
          <div class="col">療育日期</div>
          <div class="col">自費金額</div>
          <div class="col">收據</div>
        </div>
        <QSeparator inset />

        <div class="row" v-for="selfPayProgram in selfPayProgramsDetail" :key="selfPayProgram.id">
          <div class="col">{{ selfPayProgram.id }}</div>
          <div class="col">{{ selfPayProgram.date }}</div>
          <div class="col">{{ selfPayProgram.amount }}</div>
          <div class="col">
            <a :href="selfPayProgram.file_url" target="_blank">檢視收據</a>
          </div>
        </div>
        <div class="document_copy">
          <span>自費療育紀錄卡:</span>
          <a
            v-if="props.data.program_document_copy_url"
            :href="props.data.program_document_copy_url"
            class="q-ml-md"
            target="_blank"
          >
            檢視療育紀錄卡
          </a>
          <span v-else class="q-ml-md">尚無檔案</span>
        </div>
      </QCardSection>
      <div v-if="!props.isSubmitted" class="action">
        <QBtn
          round
          color="primary"
          icon="edit"
          size="sm"
          @click="emits('editDetail', props.data.month)"
        />
      </div>
    </QCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['editDetail'])

const selfPayProgramsDetail = computed(() => {
  return props.data.self_pay_programs.map((program, index) => {
    return {
      ...program,

      id: index + 1,
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
</style>
