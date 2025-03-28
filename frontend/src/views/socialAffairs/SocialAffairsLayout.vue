<script setup>
import { ref } from 'vue'
const menuList = [
  {
    icon: 'calendar_month',
    label: '當月申請',
    name: 'currentMonthApplication',
  },
  {
    icon: 'description',
    label: '申請個案總覽',
    name: 'totalApplication',
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
      <QTabs v-model="tab" inline-label class="bg-white text-primary shadow-2">
        <RouterLink :to="{ name: 'totalApplication' }">
          <QTab name="totalSubsidy" icon="alarm" label="申請總覽" />
        </RouterLink>
        <RouterLink :to="{ name: 'currentMonthApplication' }">
          <QTab name="currentMonthApplication" icon="movie" label="當月申請" />
        </RouterLink>
      </QTabs>
      <RouterView />
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

      <QDrawer v-model="drawer" show-if-above :width="180" bordered class="bg-white">
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
  background-color: $grey-1;
}
.q-router-link--exact-active {
  color: #23aed1;
  border-right: 2px solid #23aed1;
}
</style>
