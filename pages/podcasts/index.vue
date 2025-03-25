<template>
  <div class="pb-5 lg:pb-16">
    <CommonBreadcrumb :menu="breadcrumbRouterLinks" />
    <CommonPageWrapper
      :title="$t('podcasts')"
      :text="$t('podcast_text')"
      class="mt-8 container flex flex-col"
    >
      <div v-if="loading" class="grid grid-cols-3 gap-8">
        <BlockAnalysisShimmer v-for="item in 6" :key="item" loading />
      </div>
      <div class="grid grid-cols-12 mb-6 md:mb-0 gap-y-4 md:gap-8">
        <CardsPodcast
          v-for="(item, index) in podcastsList"
          :key="index"
          :data="item"
          class="col-span-12 md:col-span-6 lg:col-span-4"
          :class="{ '!col-span-12 !md:max-h-[472px]': index == 0 }"
          :is-single-banner="index == 0"
        />
      </div>

      <CommonLoadButton
        v-if="next"
        class="mt-8"
        :loading="isLoading"
        :text="$t('load_more')"
        @click="loadMore"
      />
    </CommonPageWrapper>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { usePodcastsStore } from '~/store/podcasts'
import { IPodcast } from '~/types/podcast'

const store = usePodcastsStore()
const { getPodcasts, loading, params, next } = storeToRefs(store)
const { fetchPodcasts, resetState } = store
const podcastsList = ref<IPodcast[]>([])
const { t } = useI18n()
const isLoading = ref(false)

resetState()
getPodcasts.value.then((res) => {
  if (res) {
    podcastsList.value = res
  }
})

const loadMore = () => {
  isLoading.value = true
  params.value.offset += 10

  fetchPodcasts(10, true)
  // ?.finally(() => {
  //   setTimeout(() => (isLoading.value = false), 300)
  // })
}

const breadcrumbRouterLinks = computed(() => [
  { title: t('podcasts'), link: '/popular' },
])

const podcastsListTitle = computed(() => {
  if (podcastsList.value.length !== 0) {
    return podcastsList.value[0].title
  }
})

useSeoMeta({
  title: () => `${podcastsListTitle.value}`,
  ogTitle: () => `${podcastsListTitle.value}`,
})
</script>
