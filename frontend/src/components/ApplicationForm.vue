<template>
  <div class="q-pa-md">
    <!-- <pre>{{ props.data }}</pre> -->
    <!-- <pre>{{ newSelfPayRecord }}</pre> -->
    <!-- <pre>{{ props.month }}</pre> -->
    <QCard bordered class="bg-grey-3 my-card application_detail">
      <QCardSection class="transportation_detail">
        <div class="text-h6">交通費補助</div>
        <div class="row">
          <div class="col">月份</div>
          <div class="col">單次補助</div>
          <div class="col">次數</div>
          <div class="col">小計</div>
        </div>
        <QSeparator inset />
        <div class="row items-center">
          <div class="col">
            {{ props.data.month }}
          </div>
          <div class="col">{{ transportation_fee }}</div>
          <div class="col">
            <QInput
              dense
              outlined
              style="max-width: 50px; background-color: white"
              :model-value="props.data.transportation_count"
              @update:model-value="
                emits('updateDetail', {
                  ...props.data,
                  transportation_count: $event,
                })
              "
            />
          </div>
          <div class="col">
            {{ transportation_fee * props.data.transportation_count }}
          </div>
        </div>

        <div class="document_copy">
          <QFile
            outlined
            dense
            :model-value="props.data.transportation_document_copy"
            @update:model-value="
              emits('updateDetail', {
                transportation_document_copy: $event,
              })
            "
            :label="
              props.data.transportation_document_copy_url ? '重新上傳交通紀錄卡' : '上傳交通紀錄卡'
            "
          >
            <template v-if="props.data.transportation_document_copy" v-slot:append>
              <QIcon
                name="cancel"
                @click.stop.prevent="
                  emits('updateDetail', {
                    transportation_document_copy: null,
                  })
                "
                class="cursor-pointer"
              />
            </template>
          </QFile>
          <div class="document_copy_link">
            <span>自費交通紀錄卡:</span>
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
        </div>
      </QCardSection>

      <QCardSection class="self_pay_detail">
        <div class="text-h6">療育費補助</div>
        <div class="row">
          <div class="col">療育日期</div>
          <div class="col">自費金額</div>
          <div class="col">收據</div>
          <div class="col">刪除</div>
        </div>
        <QSeparator inset />

        <div
          class="row"
          v-for="selfPayProgram in props.data.self_pay_programs"
          :key="selfPayProgram.date"
        >
          <div class="col">{{ selfPayProgram.date }}</div>
          <div class="col">{{ selfPayProgram.amount }}</div>
          <div class="col">
            <a :href="selfPayProgram.file_url" target="_blank">檢視收據</a>
          </div>
          <div class="col">
            <QBtn
              round
              color="grey-6"
              icon="close"
              size="xs"
              @click="deleteSelfPayRecord(selfPayProgram.date)"
            />
          </div>
        </div>
        <div class="self_pay_adding">
          <!-- <pre>{{ newSelfPayRecord }}</pre> -->
          <div v-if="isAdding" class="row items-center">
            <div class="col">
              <QInput
                outlined
                dense
                :model-value="newSelfPayRecord.date"
                @update:model-value="newSelfPayRecord.date = $event"
                mask="date"
                label="請選擇日期"
              >
                <template v-slot:append>
                  <QIcon name="event" class="cursor-pointer">
                    <QPopupProxy cover transition-show="scale" transition-hide="scale">
                      <QDate
                        :model-value="newSelfPayRecord.date"
                        @update:model-value="newSelfPayRecord.date = $event"
                      >
                        <div class="row items-center justify-end">
                          <QBtn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </QDate>
                    </QPopupProxy>
                  </QIcon>
                </template>
              </QInput>
            </div>
            <div class="col">
              <QInput
                class="col"
                outlined
                dense
                v-model="newSelfPayRecord.amount"
                :model-value="newSelfPayRecord.amount"
                @update:model-value="newSelfPayRecord.amount = $event"
                placeholder="請輸入金額"
              />
            </div>
            <div class="col">
              <QFile outlined dense v-model="newSelfPayRecord.file" label="上傳收據" class="col" />
            </div>

            <div class="col"></div>
          </div>
          <QBtn
            unelevated
            color="grey-6"
            :icon="isAdding ? 'save' : 'add'"
            :label="isAdding ? '確定' : '新增自費紀錄'"
            @click="addSelfPayRecord"
          />
        </div>
        <div class="document_copy">
          <QFile
            outlined
            dense
            :model-value="props.data.program_document_copy"
            @update:model-value="
              emits('updateDetail', {
                program_document_copy: $event,
              })
            "
            :label="props.data.program_document_copy_url ? '重新上傳療育紀錄卡' : '上傳療育紀錄卡'"
          >
            <template v-if="props.data.program_document_copy" v-slot:append>
              <QIcon
                name="cancel"
                @click.stop.prevent="
                  emits('updateDetail', {
                    program_document_copy: null,
                  })
                "
                class="cursor-pointer"
              />
            </template>
          </QFile>
          <div class="document_copy_link">
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
        </div>
      </QCardSection>
      <div class="action">
        <QBtn color="primary" icon="save" size="md" @click="onSubmitDetail" label="存檔" />
        <QBtn color="grey" icon="cancel" size="md" @click="emits('cancel')" label="取消" />
      </div>
    </QCard>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { ref } from 'vue'

const emits = defineEmits(['updateDetail', 'submitDetail', 'cancel'])

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
const transportation_fee = 200
// const selfPayPrograms = ref([
//   ...props.data.self_pay_programs.map((program, index) => {
//     return {
//       ...program,
//       id: index + 1,
//     }
//   }),
// ])
// const files = props.data.program_receipts_urls

const isAdding = ref(false)
const newSelfPayRecord = ref(null)

function deleteSelfPayRecord(recordDate) {
  const update = props.data.self_pay_programs.filter((record) => record.date !== recordDate)
  console.log(update)

  emits('updateDetail', {
    self_pay_programs: update,
  })
}

function addSelfPayRecord() {
  if (isAdding.value) {
    newSelfPayRecord.value.file_url = URL.createObjectURL(newSelfPayRecord.value.file)

    const update = props.data.self_pay_programs.concat({
      ...newSelfPayRecord.value,
      date: format(newSelfPayRecord.value.date, 'yyyy-MM-dd'),
    })

    emits('updateDetail', {
      self_pay_programs: update,
    })
    // console.log(selfPayPrograms.value)
    isAdding.value = false
    newSelfPayRecord.value = null
  } else {
    //init newSelfPayRecord
    newSelfPayRecord.value = {
      date: '',
      amount: null,
      file: null,
      file_url: '',
    }
    isAdding.value = true
  }
}
function onSubmitDetail() {
  emits('submitDetail')
}
// const isShown = computed(() => {
//   if (!props.data) return false
//   return props.month === props.currentMonth
// })
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
  // position: absolute;
  // top: 10px;
  // right: 10px;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  > * {
    flex: 1 1 auto;
  }
}
.transportation_detail,
.self_pay_detail {
  .row {
    margin-top: 0.5rem;
  }
}
.self_pay_adding {
  margin-top: 0.5rem;
  button {
    border: 1px solid $grey-4;
    align-items: start;
  }
  :deep(.q-field--with-bottom) {
    padding-bottom: 0;
  }
}
.document_copy {
  margin-top: 2rem;
}
</style>
