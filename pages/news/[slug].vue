<template>
  <div class="pb-8 md:pb-16 overflow-x-hidden">
    <CommonBreadcrumb :menu="breadcrumbLinks" />
    <CommonSinglePageWrapper
      v-if="single?.size_type === 'default'"
      v-bind="{ content: singleContent, single }"
    >
      <CommentsCommentMain
        :single-id="single?.id"
        :fetcher="newsStore.fetchNewsComment"
        v-bind="{ comments }"
        single-type="news"
      />
    </CommonSinglePageWrapper>
    <NewsStandardSingleWrapper
      v-if="single?.size_type === 'standart'"
      v-bind="{ content: singleContent, single }"
    >
      <CommentsCommentMain
        :single-id="single?.id"
        :fetcher="newsStore.fetchNewsComment"
        single-type="news"
        v-bind="{ comments }"
      />
      <template #aside>
        <TempAdvetisimentBanner />
      </template>
    </NewsStandardSingleWrapper>
    <NewsFullWidthSingleWrapper
      v-if="single?.size_type === 'full_width'"
      v-bind="{ content: singleContent, single, loading }"
    >
      <CommentsCommentMain
        :single-id="single?.id"
        single-type="news"
        v-bind="{ comments }"
      />
    </NewsFullWidthSingleWrapper>
    <ClientOnly>
      <div class="container pt-8 md:pt-16">
        <CommonSectionWrapper :title="$t('read_more')" all-link="/news" />
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 md:mt-6"
        >
          <CardsNews
            v-for="(card, index) in recommendedNews"
            v-bind="{ card }"
            :key="index"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { definePageMeta } from '#imports'
import { useNewsStore } from '~/store/news'

const {
  params: { slug },
} = useRoute()
// definePageMeta({
//   middleware: ['logged-in'],
// })

const loading = ref(false)

const newsStore = useNewsStore()

const recommendedNews = computed(() => newsStore.recommendedNews)
const singleContent = computed(() => newsStore.singleContent)
const single = computed(() => newsStore.single)
const comments = computed(() => newsStore.newsCommentList)

const { t } = useI18n()
const breadcrumbLinks = computed(() => {
  return [
    { title: t('popular'), link: '/news' },
    {
      title: single.value?.title,
      link: '',
    },
  ]
})

useAsyncData(async () => {
  return await Promise.allSettled([newsStore.fetchNewsSingle(slug)])
})

newsStore.fetchNewsRecommendedList({ offset: 0, limit: 4 }, String(slug))
newsStore.fetchNewsSingleContent('' + slug)

useSeoMeta({
  title: () => single.value?.title,
  description: () => single.value?.subtitle,
  ogDescription: () => single.value?.subtitle,
  ogImage: () => single.value?.cover_image,
})
</script>
