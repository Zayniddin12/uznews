<template>
  <div class="pb-8">
    <CommonBreadcrumb :menu="breadcrumbRoutes" class="mb-8" />
    <CommonSinglePageWrapper
      :single="reportsDetail"
      :content="data.results"
      v-bind="{ loading }"
    >
      <CommentsCommentMain
        :single-id="reportsDetail?.id"
        single-type="special_reports"
        v-bind="{ comments }"
      />
    </CommonSinglePageWrapper>

    <div
      v-if="recommendedSpecialReports.length"
      class="container pt-8 md:pt-16"
    >
      <CommonSectionWrapper
        :title="$t('read_more')"
        all-link="/reports/special"
      />
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 md:gap-[75px] gap-y-5 sm:gap-6 mt-4 md:mt-6"
      >
        <CardsSpecialReports
          v-for="(item, idx) in recommendedSpecialReports"
          :key="idx"
          :data="item"
          special-report
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'
import { useSpecialReportsStore } from '~/store/specialReports'

const reportsStore = useSpecialReportsStore()
const newsStore = useNewsStore()
const { t } = useI18n()
const {
  params: { slug },
} = useRoute()
const loading = ref(false)

async function fetchContent() {
  try {
    return await reportsStore.fetchSReportsSingleContent('' + slug)
  } catch (err) {}
}
async function fetchDetail() {
  return await reportsStore.fetchSReportsSingleDetail(String(slug))
}

const comments = computed(() => newsStore.newsCommentList)
const recommendedSpecialReports = computed(
  () => reportsStore.recommendedSpecialReports
)
const { data } = await useAsyncData('reports', fetchContent)

const { data: reportsDetail } = await useAsyncData('details', fetchDetail)

const breadcrumbRoutes = computed(() => [
  { title: t('special_reports'), link: '/reports/special' },
  {
    title: reportsDetail.value?.title,
    link: '/reports/special',
  },
])

useAsyncData(async () => {
  await reportsStore.fetchRecommendedSpecialReports(
    { offset: 0, limit: 3 },
    String(slug)
  )
})
</script>
