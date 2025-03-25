<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" class="mb-8" />
    <div class="container mb-12 md:mb-16">
      <CommonPageWrapper
        :title="$t('special_reports')"
        :text="$t('column_text')"
      >
        <div
          v-if="reportsStore.loading"
          class="grid grid-cols-1 gap-5 md:gap-8"
        >
          <BlockLoaderSpecialReports v-for="el in 5" :key="el" />
        </div>
        <template v-else>
          <div :key="specialReports?.length">
            <div
              v-if="specialReports?.length"
              class="grid grid-cols-1 gap-5 md:gap-8"
            >
              <CardsSpecialReportsSingle
                v-for="(item, index) in specialReports"
                :key="index"
                :data="item"
              />
              <BlockLoaderSpecialReports v-if="isLoading" />
              <BlockLoaderSpecialReports v-if="isLoading" />
              <CommonButton
                v-if="specialReports.length < totalCount"
                :loading="isLoading"
                class="w-full text-blue-600 dark:hover:text-white !bg-[#52618f1a] font-medium leading-125 mb-16"
                @click="loadMore"
              >
                <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
                {{ $t('load_more') }}</CommonButton
              >
            </div>
            <div v-else>
              <CommonNoData />
            </div>
          </div>
        </template>
        <template #aside>
          <TempAdvetisimentBanner class="mt-10" />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSpecialReportsStore } from '~/store/specialReports'

const { t } = useI18n()

const reportsStore = useSpecialReportsStore()
reportsStore.fetchSpecialReports(reportsStore.params)
const isLoading = ref(false)

const specialReports = computed(() => reportsStore.specialReports)
const totalCount = computed(() => reportsStore.count)

const loadMore = () => {
  isLoading.value = true
  setTimeout(() => {
    reportsStore.params.offset += 5
    reportsStore.fetchSpecialReports(reportsStore.params, true)
    isLoading.value = false
  }, 1000)
}

const breadcrumbRoutes = computed(() => [
  { title: t('special_reports'), link: '/reports/special' },
])

useSeoMeta({
  title: t('special_reports'),
  ogTitle: t('special_reports'),
  description: t('column_text'),
  ogDescription: t('column_text'),
})
</script>
