<template>
  <QCard>
    <QCardSection>
      <div v-if="props.user === 'parent'" class="text-h6">無法提交申請</div>
      <div v-if="props.user === 'sab'" class="text-h6">操作無效</div>
    </QCardSection>

    <QCardSection class="q-pt-none" style="white-space: pre">
      {{ props.alertMsg }}
    </QCardSection>

    <QCardActions align="right">
      <QBtn flat label="OK" color="primary" @click="emits('clearAlert')" />
    </QCardActions>
  </QCard>
</template>

<script setup>
const props = defineProps({
  alertMsg: {
    type: String,
    default: '',
  },
  user: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['clearAlert'])
</script>

<style lang="scss"></style>
