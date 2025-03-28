<template>
  <QDialog :modelValue="props.SelfPayDialogIsShown" persistent>
    <QCard style="min-width: 500px">
      <QCardSection>
        <div class="document_copy">
          <img src="https://picsum.photos/250/350" alt="交通補助卡" />
        </div>
      </QCardSection>
      <QCardSection class="q-pt-none">
        <div class="text-h6">交通費補助</div>
      </QCardSection>
      <QFrom>
        <QCardSection class="q-pt-none">
          <div class="row">
            <div class="col">
              <p class="dialog_subtitle">民眾自填</p>
              <p>200元 x 次數＝小計 元</p>
            </div>
            <div class="col">
              <p class="dialog_subtitle">核定金額</p>
              <p>
                <span> 200元 x </span>
                <input type="text" style="max-width: 50px" />
                <span> ＝小計 元</span>
              </p>
            </div>
          </div>
          <p class="dialog_subtitle">核定備註欄</p>
          <QInput outlined dense v-model="phone" bottom-slots type="textarea">
            <template v-slot:hint>
              記入本次核定金額的理由事項，審核完成後會顯示給民眾看。
            </template>
          </QInput>
        </QCardSection>

        <QCardActions align="right" class="text-primary">
          <QBtn flat color="primary" label="核定完成" />
          <QBtn flat color="red" label="改補件" />
          <QBtn flat color="black" label="關閉此視窗" />
        </QCardActions>
      </QFrom>
    </QCard>
  </QDialog>
</template>

<script setup>
// import { ref } from 'vue'
const props = defineProps({
  SelfPayDialogIsShown: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.document_copy {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
.dialog_subtitle {
  // font-size: 16px;
  font-weight: 600;
}
</style>
