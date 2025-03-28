<template>
  <!-- <pre>{{ props.data }}</pre> -->
  <QCard flat bordered class="my-card subsidy">
    <QCardSection class="summary">
      <div class="row">
        <div class="col-2">
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
        <div class="col-2">
          <span class="title">預計補助</span>
        </div>
      </div>

      <QSeparator class="q-my-sm" />
      <div
        class="monthly_applications"
        v-for="monthlyDetail in props.data.application_months"
        :key="monthlyDetail.month"
      >
        <!-- summary -->
        <div class="row items-center">
          <div class="col-2">
            <QBtn
              flat
              @click="emits('toggleSubmittedDetail', monthlyDetail.month)"
              class="application_detail_link"
            >
              {{ monthlyDetail.month }}
            </QBtn>
          </div>
          <div class="col">
            {{ monthlyDetail.transportation_count * monthlyDetail.transportationFee }}
          </div>
          <div class="col">{{ monthlyDetail.self_pay_programs_total }}</div>
          <div class="col">
            <span class="">{{
              monthlyDetail.transportation_count * monthlyDetail.transportationFee +
              monthlyDetail.self_pay_programs_total
            }}</span>
          </div>
          <div class="col-2">
            <span class="">{{ monthlyDetail.sum }}</span>
          </div>
        </div>
        <!-- detail -->
        <slot :detail="monthlyDetail" />
      </div>
    </QCardSection>

    <QSeparator inset />

    <QCardSection>
      <div class="row">
        <div class="col-2">
          <span class="title">總計</span>
        </div>
        <QSpace />
        <div class="col-2">
          <div class="text-bold">
            {{ props.data.totalSum }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <span class="title">預計撥款日</span>
        </div>
        <QSpace />
        <div class="col-2">
          <div class="text-bold">2024-xx-xx</div>
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      applicationStatus: '',
      application_months: [
        {
          sum: null,
        },
      ],
      totalSum: null,
    }),
  },
})
const emits = defineEmits(['toggleSubmittedDetail'])
</script>

<style lang="scss" scoped>
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
.title {
  font-weight: 900;
}
.application_detail_link {
  color: $primary;
  text-decoration: underline;
  font-size: 16px;
}
</style>
