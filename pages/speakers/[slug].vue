<template>
  <div class="pb-16">
    <CommonBreadcrumb :menu="menu" />
    <CommonSinglePageWrapper v-bind="{ single, content, loading }">
      <CommentsCommentMain
        :single-id="single?.id"
        single-type="speakers"
        v-bind="{ comments }"
      />
    </CommonSinglePageWrapper>
    <SectionsColumns
      v-if="speakers?.length"
      class="pt-16 pb-6 lg:pb-10"
      v-bind="{ speakers }"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { singleData } from '~/data/fakeData'
import { useNewsStore } from '~/store/news'
import { usePodcastDetails } from '~/store/podcastDetail'
import { useSpeakersStore } from '~/store/speakers'

const speakersStore = useSpeakersStore()
const { t } = useI18n()
const route = useRoute()
const newsStore = useNewsStore()

const content = computed(() => speakersStore.singleContent)
const speakers = computed(() => speakersStore.recommendedSpeakers)
const comments = computed(() => newsStore.newsCommentList)

const loading = ref(false)

async function fetchSingleSpeaker() {
  return await speakersStore.fetchSingle(route.params.slug.toString())
}
const { data: single } = await useAsyncData('content', fetchSingleSpeaker)

useAsyncData(async () => {
  await speakersStore.fetchSingleContent('' + route.params.slug)
  await speakersStore.fetchRecommendedSpeakers(
    { offset: 0, limit: 4 },
    String(route.params.slug)
  )
})

const menu = computed(() => [
  { title: t('column'), link: '/speakers' },
  { title: single.value?.title, link: '/speakers' },
])

useSeoMeta({
  title: () => single.value?.title,
  ogTitle: () => single.value?.title,
  description: () => single.value?.subtitle,
  ogDescription: () => single.value?.subtitle,
})
</script>
