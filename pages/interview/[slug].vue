<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <div class="mt-8 pb-16">
      <CommonSinglePageWrapper
        v-bind="{
          content: interviewSingleContent,
          single: interviewSingle,
          loading: false,
        }"
      >
        <CommentsCommentMain
          :single-id="interviewSingle?.id"
          single-type="interview"
          v-bind="{ comments }"
        />
        <template #aside>
          <img src="https://picsum.photos/200/400" class="w-full" alt="" />
        </template>
      </CommonSinglePageWrapper>
      <div class="container mt-8 md:mt-[60px]">
        <CommonSectionWrapper
          :title="$t('read_more')"
          :all-link="'/interview'"
          class="mb-6"
        />
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8"
        >
          <CardsInterview
            v-for="(item, index) in interviewRecommendList"
            :key="index"
            :data="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useInterviewStore } from '~/store/interview'
import { useNewsStore } from '~/store/news'

const { t } = useI18n()
const route = useRoute()

const interviewStore = useInterviewStore()
const newsStore = useNewsStore()

const interviewSingle = computed(() => interviewStore.interviewSingle)
const comments = computed(() => newsStore.newsCommentList)
const interviewSingleContent = computed(
  () => interviewStore.interviewSingleContent
)
const interviewRecommendList = computed(
  () => interviewStore.interviewRecommendList
)

useAsyncData(async () => {
  return await Promise.allSettled([
    interviewStore.fetchInterviewSingle('' + route?.params?.slug),
    interviewStore.fetchInterviewSingleDetail('' + route?.params?.slug),
    interviewStore.fetchInterviewRecommendList(
      interviewStore.params,
      '' + route?.params?.slug
    ),
  ])
})

// Todo: catch 404

const breadcrumbRoutes = computed(() => [
  { title: t('interview'), link: '/interview' },
  {
    title: interviewStore?.interviewSingle?.title,
    link: '/interview',
  },
])

useSeoMeta({
  title: () => interviewStore?.interviewSingle?.title,
  description: interviewStore?.interviewSingle?.subtitle,
  // ogImage: interviewStore?.interviewSingle?.
})

// include all types correclty
</script>
