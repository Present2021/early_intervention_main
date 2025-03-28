<script setup>
// import { useTransportationRecordStore } from '@/stores/transportationStore'
import { ref } from 'vue'

// const transportationRecordStore = useTransportationRecordStore()
// async function getTransportationRecords() {
//   await transportationRecordStore.fetchTransportationRecords()
// }

// const tab = ref('transportationSubsidy')
const menuList = [
  {
    icon: 'contact_page',
    label: '個人資料',
    name: 'personalData',
  },
  {
    icon: 'send',
    label: '申請補助',
    name: 'subsidy',
  },
  {
    icon: 'print',
    label: 'pdf',
    name: 'pdf',
  },
  {
    icon: 'logout',
    label: '登出',
    name: 'logout',
  },
]
const drawer = ref(false)
</script>

<template>
  <!-- <div>
    <div class="q-pa-md items-start q-gutter-md">
      <QCard>
        <QTabs v-model="tab" inline-label class="bg-white text-primary shadow-2">
          <RouterLink :to="{ name: 'personalData' }">
            <QTab name="personalData" icon="mail" label="基本資料" />
          </RouterLink>

          <RouterLink :to="{ name: 'subsidy' }">
            <QTab name="subsidy" icon="movie" label="申請補助" />
          </RouterLink>
          <RouterLink :to="{ name: 'pdf' }">
            <QTab name="pdf" icon="movie" label="pdf" />
          </RouterLink>
        </QTabs>

        <QSeparator />
        <RouterView></RouterView>
      </QCard>
    </div>
  </div> -->
  <div>
    <QLayout view="hHh Lpr lff" container style="height: 650px" class="shadow-2 rounded-borders">
      <QHeader elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-grey-8'">
        <QToolbar>
          <QBtn flat @click="drawer = !drawer" round dense icon="menu" />
          <QToolbarTitle>臺南市政府早療補助申請系統</QToolbarTitle>
        </QToolbar>
      </QHeader>

      <QDrawer v-model="drawer" show-if-above :width="160" bordered class="bg-white">
        <QScrollArea class="fit">
          <QList>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <QItem clickable v-ripple :to="{ name: `${menuItem.name}` }" exact active-class>
                <QItemSection avatar>
                  <QIcon :name="menuItem.icon" />
                </QItemSection>
                <QItemSection>
                  {{ menuItem.label }}
                </QItemSection>
              </QItem>
              <!-- <QSeparator :key="'sep' + index" v-if="menuItem.separator" /> -->
            </template>
          </QList>
        </QScrollArea>
      </QDrawer>

      <QPageContainer>
        <QPage padding class="content_container">
          <RouterView></RouterView>
        </QPage>
      </QPageContainer>
    </QLayout>
  </div>
</template>

<style lang="scss" scoped>
.content_container {
  background-color: $grey-3;
}
.q-router-link--exact-active {
  color: #23aed1;
  border-right: 2px solid #23aed1;
}
</style>
