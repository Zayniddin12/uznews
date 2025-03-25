<template>
  <div class="pb-5 lg:pb-16">
    <CommonBreadcrumb v-if="!isLoading" :menu="breadcrumbLinks" />
    <BlockPreloader :loading="isLoading" width="100%" height="298px" />
    <ClientOnly>
      <SectionsAudioPlayer
        v-if="!isLoading"
        class=""
        :audio-title="details?.title"
      />
    </ClientOnly>

    <CommonSinglePageWrapper :single="details" :content="data.results">
      <CommentsCommentMain
        :single-id="details?.id"
        single-type="podcast"
        v-bind="{ comments }"
      />
    </CommonSinglePageWrapper>
    <div class="container">
      <CommonSectionWrapper
        class="mt-5 lg:mt-20"
        :title="$t('also_listen')"
        :all-link="'/podcasts'"
      />
      <div class="grid sm:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-8 mt-6">
        <CardsPodcast
          v-for="(item, index) in podcastsList"
          :key="index"
          :data="item"
          :is-single-banner="index == 0"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAudioStore } from '~/store/audio'
import { useNewsStore } from '~/store/news'
import { usePodcastDetails } from '~/store/podcastDetail'
import { usePodcastsStore } from '~/store/podcasts'
import { IResponse } from '~/types/common'
import { IPodcast } from '~/types/podcast'

interface IPodcastContent {
  id: number
  content_item_type: string
  text: string
}

const newsStore = useNewsStore()
const audioStore = useAudioStore()
const route = useRoute()
const podcastDetails = usePodcastDetails()
const { t } = useI18n()
const isLoading = ref(true)
const podcastsList = ref<IPodcast[]>([])
const store = usePodcastsStore()

const comments = computed(() => newsStore.newsCommentList)
const breadcrumbLinks = computed(() => [
  { title: t('podcasts'), link: '/podcasts' },
  { title: details.value?.title, link: '/podcasts' },
])

store.resetState()
store.fetchPodcasts(4)?.then((res) => {
  podcastsList.value = res.results
})

podcastDetails
  .fetchPodcastDetails(route.params.slug as string)
  .then((res) => {
    // hashtags.value = res?.hashtags
    // author.value = res?.author
    // podcastDetailsData.value = res
    audioStore.normalSpeed = true
    audioStore.initiateAudio(res?.file)
    audioStore.setPodcastImg(res?.cover_image)
  })
  .finally(() => {
    setTimeout(() => (isLoading.value = false), 300)
  })

const { data: details } = useAsyncData('podcastDetails', async () => {
  return podcastDetails.fetchPodcastDetails(route.params.slug as string)
})

const { data, error } = await useAsyncData(
  'podcastContentItem',
  async () =>
    await useApi().$get<IResponse<IPodcastContent>>(
      `/news/PodcastContentItem/${route.params.slug as string}/`
    )
)

useSeoMeta({
  // title: () => details.value!?.title,
  description: () => details.value?.subtitle,
  ogImage: () => details.value?.cover_image,
})
</script>
