<script setup>
import { format } from 'date-fns'
import { computed } from 'vue'
const props = defineProps({
  record: {
    type: Object,
    default: () => {},
  },
})
const therapyDate = computed(() => format(props.record.therapyDate, 'yyyy/MM/dd'))
const therapyWeekDay = computed(() => format(props.record.therapyDate, 'EEE'))
const therapyTime = computed(() => format(props.record.therapyDate, 'HH:mm'))
</script>

<template>
  <!-- <pre>{{ props.record }}</pre> -->
  <div class="container">
    <QBtn round color="primary" icon="close" size="sm" class="delete_icon" />
    <div class="row">
      <div class="col-2">
        <div class="record_date"></div>
        <p>{{ therapyDate }}</p>
        <p>{{ therapyWeekDay }}</p>
        <p>{{ therapyTime }}</p>
      </div>
      <div class="col">
        <div class="therapy_info">
          <p>{{ props.record.rehabCenter || '療育地點' }}</p>
          <p>{{ props.record.therapyType || '療育項目' }}</p>
          <p>{{ props.record.therapist || '治療師' }}</p>
        </div>
      </div>
      <div class="col-2">
        <div class="record_status">
          <!-- <p>{{ props.record.status }}</p> -->
          <QBtn label="修改" color="grey"></QBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin: 0;
}
.container {
  position: relative;
  + .container {
    margin-top: 0.5rem;
  }
  background-color: $grey-3;
  color: $grey-9;
  border-radius: 10px;
  padding: 0.5rem;
}

.therapy_info {
  // font-size: 18px;
  text-align: center;
}
.record_status {
  font-size: 20px;
  font-weight: 900;
  display: flex;
  height: 100%;
  justify-content: end;
  align-items: center;
}
.delete_icon {
  position: absolute;
  right: -10px;
  top: -10px;
}
</style>
