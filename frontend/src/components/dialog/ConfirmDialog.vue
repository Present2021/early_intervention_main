<template>
  <div>
    <QCard>
      <QCardSection class="row items-center">
        <QAvatar icon="question_mark" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ props.msg }}</span>
      </QCardSection>

      <QCardActions align="right">
        <QBtn flat label="確定" color="primary" @click="emits('confirm')" />
        <QBtn flat label="取消" color="primary" @click="emits('cancel')" />
      </QCardActions>
    </QCard>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: '',
  },
  // confirmLabel: {
  //   type: String,
  //   default: '',
  // },
  // cancelLabel: {
  //   type: String,
  //   default: '',
  // },
})
const emits = defineEmits(['confirm', 'cancel'])
</script>

<style lang="scss"></style>
