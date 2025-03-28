<template>
  <QCard flat bordered class="my-card">
    <!-- <pre>app: {{ qualificationIsOverDue }}</pre> -->
    <QCardSection class="child">
      <div class="row">
        <div class="col-3">
          <span class="text-h6">{{ props.data.child.full_name }}</span>
          <span class="text-h6 q-ml-sm">{{ props.data.child.national_id_number }}</span>
        </div>
        <div class="col-7">
          <QBtn unelevated dense label="申請書" style="background-color: #23aed1; color: white" />
        </div>
        <div class="col-2">
          <span style="color: #23aed1; font-size: 1.25rem; font-weight: bold">{{
            mapApplicationStatus(props.data.status)
          }}</span>
        </div>
      </div>
      <div class="information_link">
        <QBtn
          v-if="!props.data.identity_verified"
          unelevated
          dense
          class="text-red"
          @click="emits('reviewInformation', props.data.id)"
        >
          補助資格尚未確認
        </QBtn>
        <QBtn
          v-else
          unelevated
          dense
          @click="emits('reviewInformation', props.data.id)"
          :class="{ 'text-red': qualificationDue === '已過期' }"
        >
          目前資格效期 {{ qualificationDue }}
        </QBtn>
      </div>
    </QCardSection>

    <QCardSection class="q-pt-none summary">
      <div class="row">
        <div class="contents col-10">
          <div class="row">
            <div class="col">
              <span class="title">申請月份</span>
            </div>
            <div class="col">
              <span class="title">交通費補助</span>
            </div>
            <div class="col">
              <span class="title">療育費補助</span>
            </div>
            <div class="col">
              <span class="title">月計</span>
            </div>
          </div>
          <div
            class="monthly_applications"
            v-for="monthlyDetail in monthlyDetailList"
            :key="monthlyDetail.month"
          >
            <!-- <pre>總計：{{ totalSum }}</pre> -->
            <div class="row items-center">
              <div class="col">
                <QBtn
                  flat
                  class="application_detail_link"
                  @click="
                    emits('toggleDetail', {
                      applicationId: props.data.id,
                      childId: props.data.child.national_id_number,
                      currentMonth: monthlyDetail.month,
                    })
                  "
                >
                  {{ monthlyDetail.month }}
                </QBtn>
              </div>
              <div class="col">
                <span
                  :class="{
                    text_delete: monthlyDetail.transportationIsModified,
                  }"
                >
                  {{ monthlyDetail.transportation_count * transportationFee }}
                </span>
                <span v-if="monthlyDetail.transportationIsModified" class="q-ml-md">{{
                  +monthlyDetail.modified_transportation_count * transportationFee
                }}</span>
              </div>
              <div class="col">
                <span
                  :class="{
                    text_delete: monthlyDetail.selfPayIsModified,
                  }"
                >
                  {{ monthlyDetail.self_pay_programs_total }}
                </span>

                <span v-if="monthlyDetail.selfPayIsModified" class="q-ml-md">
                  {{ monthlyDetail.modified_self_pay_programs_total }}
                </span>
              </div>
              <div class="col">
                <div class="flex justify-between items-center">
                  <span class="">{{
                    (monthlyDetail.modified_transportation_count ||
                      monthlyDetail.transportation_count) *
                      transportationFee +
                    (monthlyDetail.modified_self_pay_programs_total ||
                      monthlyDetail.self_pay_programs_total)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="application-detail">
              <slot :data="monthlyDetail" />
            </div>
          </div>
          <QSeparator inset class="q-my-sm" />
          <div class="row items-center">
            <div class="col-9">總計</div>
            <div class="col-3">
              <div class="flex justify-between items-center">
                <span class="">{{ totalSum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="props.data.status === 'pending'" class="actions col-2 self-end">
          <QBtn
            color="primary"
            label=" 審核通過"
            dense
            @click="emits('approveApplication', props.data.id)"
          />

          <QBtn
            class="q-ml-sm"
            color="negative"
            label=" 申請駁回"
            outline
            dense
            @click="emits('rejectApplication', props.data.id)"
          />
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

<script setup>
import { isAfter, parse } from 'date-fns'
import { computed } from 'vue'
import { mapApplicationStatus } from '@/utilities/mappings.js'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  // memo: {
  //   type: Object,
  //   default: () => ({}),
  // },
})
const emits = defineEmits([
  'reviewInformation',
  'toggleDetail',
  'approveApplication',
  'rejectApplication',
])
//之後應該會是從api來，有後台可以改
const transportationFee = 200
// const limit=4000

const qualificationDue = computed(() => {
  const evaluationDue = parse(
    props.data.child.joint_evaluation_report_expired_on,
    'yyyy-MM-dd',
    new Date()
  )
  const today = new Date()

  return isAfter(today, evaluationDue)
    ? '已過期'
    : props.data.child.joint_evaluation_report_expired_on
})
const monthlyDetailList = computed(() => {
  // console.log(props.data)

  return props.data.application_months.map((app, index) => {
    if (props.data.sab_memo?.length === 0) {
      return {
        ...app,
        transportationIsModified: false,
        selfPayIsModified: false,
        sum: app.transportation_count * transportationFee + app.self_pay_programs_total,
      }
    } else {
      const sabMemo = props.data.sab_memo[index] || []

      const modifiedSelfPayPrograms =
        (sabMemo?.modified_self_pay_programs?.length ?? 0) > 0
          ? sabMemo.modified_self_pay_programs.map((program) => {
              return {
                ...program,
                program_index: +program.program_index,
                modified_amount: +program.modified_amount,
              }
            })
          : []
      const modifiedSelfPayTotal =
        (sabMemo?.modified_self_pay_programs?.length ?? 0) > 0
          ? sabMemo.modified_self_pay_programs.reduce(
              (acc, item) => (acc += +item.modified_amount),
              0
            )
          : app.self_pay_programs_total
      return {
        //先解memo再解application避免month被覆寫(兩者都有month屬性)
        ...sabMemo,
        ...app,
        //把字串轉數字
        memo_index: +sabMemo?.memo_idex,
        modified_transportation_count: +sabMemo?.modified_transportation_count,
        modified_self_pay_programs: modifiedSelfPayPrograms,

        modified_self_pay_programs_total: modifiedSelfPayTotal,
        //為了渲染新加的屬性
        transportationIsModified:
          +sabMemo?.modified_transportation_count !== app.transportation_count,
        selfPayIsModified: modifiedSelfPayTotal !== app.self_pay_programs_total,
        sum:
          (sabMemo.modified_transportation_count || app.transportation_count) * transportationFee +
          (modifiedSelfPayTotal || app.self_pay_programs_total),
      }
    }
  })
})
const totalSum = computed(() => {
  return monthlyDetailList.value.reduce((acc, monthlyData) => {
    return (acc += monthlyData.sum)
  }, 0)
})
</script>

<style lang="scss">
.title {
  font-weight: 900;
}
.summary {
  font-size: 16px;
  > * + * {
    margin-top: 10px;
  }
}
.information_link button,
.application_detail_link {
  color: $primary;
  text-decoration: underline;
  font-size: 16px;
}
.information_link.over_due_link button {
  color: red;
}
.text_delete {
  text-decoration: line-through;
}
</style>
