<script setup>
import { ref } from 'vue'
const tab = ref('transportationSubsidy')
</script>

<template>
  <div>
    <div class="q-pa-md items-start q-gutter-md">
      <QTabs v-model="tab" inline-label class="bg-white text-primary shadow-2">
        <RouterLink :to="{ name: 'clinicTransportation' }">
          <QTab name="transportationSubsidy" icon="alarm" label="交通補助" />
        </RouterLink>
        <RouterLink :to="{ name: 'clinicSelfPay' }">
          <QTab name="selfPaySubsidy" icon="movie" label="自費補助" />
        </RouterLink>
      </QTabs>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
