<template>
  <div class="relative">
    <LayoutHeaderBreakingNews />
    <div class="pt-8">
      <SectionsLatestNews />
      <SectionsMainNews
        v-bind="{ newsData: newsList, discussionList, popularList, loading }"
      />
      <SectionsNews
        class="py-6 lg:py-10"
        v-bind="{ loading, newsData: newsList }"
      />
      <CommonAdBanner
        :image="advertising.ad1?.image"
        :link="advertising.ad1?.link"
        class="container pb-4 md:pb-8"
      />
      <SectionsAuthor
        class="py-6 lg:pt-10 lg:pb-12"
        v-bind="{
          authorsData: authorsArticleList,
          authorsList,
          mediaList,
          loading,
        }"
      />
      <SectionsReports :data="reportsStore" />
      <CommonAdBanner
        :image="advertising.ad2?.image"
        :link="advertising.ad2?.link"
        class="container pt-6 lg:pt-10"
      />
      <SectionsPhotoReports
        class="pt-6 lg:pt-10"
        v-bind="{ photoReports, loading }"
      />
      <SectionsPodcasts :podcasts="podcasts" class="py-6 lg:py-10" />
      <SectionsInterviews
        v-if="mainSettings?.interview"
        class="pb-6 lg:pb-10"
        v-bind="{ interviewData: interviewList, loading }"
      />
      <CommonAdBanner
        :image="advertising.ad3?.image"
        :link="advertising.ad3?.link"
        class="container pb-6 lg:pb-10"
      />
      <SectionsColumns class="pb-6 lg:pb-10" v-bind="{ loading, speakers }" />
      <SectionsSocial v-bind="{ mediaList }" />
      <SectionsAnalysis
        class="pt-10 pb-14 md:pb-10"
        v-bind="{ discussionData: discussionList, loading }"
      />
    </div>
    <div
      class="w-12 h-12 rounded-full hidden md:flex items-center text-center justify-center cursor-pointer right-5 bottom-8 bg-[#F0F4FA] dark:bg-opacity-10 hover:hover:bg-blue-200 transition-200 group absolute active:scale-95"
      @click="toTop"
    >
      <i
        class="icon-arrow-right text-blue-100 -rotate-90 text-2xl transition-200"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '~/store'
import { useAd } from '~/store/ad'
import { useInterviewStore } from '~/store/interview'
import { usePhotoReportsStore } from '~/store/photoReports'
import { usePodcastsStore } from '~/store/podcasts'
import { useSpeakersStore } from '~/store/speakers'
import { useSpecialReportsStore } from '~/store/specialReports'

const {
  fetchMainSettings,
  fetchDiscussionList,
  fetchAuthorsList,
  fetchAuthorsArticlesList,
  fetchSocialMediaList,
  fetchNewsList,
} = useHomeStore()

const homeStore = useHomeStore()
const photoReportsStore = usePhotoReportsStore()
const podcastStore = usePodcastsStore()
const interviewStore = useInterviewStore()
const speakersStore = useSpeakersStore()
const specialReportStore = useSpecialReportsStore()
const adStore = useAd()

const newsList = computed(() => homeStore.newsList)
const popularList = computed(() => homeStore.popularNewsList)
const discussionList = computed(() => homeStore.discussionList)
const interviewList = computed(() => interviewStore.interviews)
const authorsList = computed(() => homeStore.authorsList)
const authorsArticleList = computed(() => homeStore.authorsArticleList)
const mediaList = computed(() => homeStore.mediaList)
const photoReports = computed(() => photoReportsStore.reports)
const podcasts = computed(() => podcastStore.podcasts)
const mainSettings = computed(() => homeStore.mainSettings)
const reportsStore = computed(() => specialReportStore.specialReports)
const speakers = computed(() => speakersStore.speakers)

const advertising = ref({})
const loading = ref(false)

const newsParams = ref({
  ...homeStore.params,
  is_popular: true,
})

podcastStore.resetState()
adStore.fetchAdvertisement('/common/MainAd').then((res) => {
  advertising.value = res
})

useAsyncData(async () => {
  return await Promise.allSettled([
    fetchMainSettings(),
    fetchNewsList(homeStore.params),
    fetchNewsList(newsParams.value),
    fetchDiscussionList(),
    interviewStore.fetchInterviews(interviewStore.params),
    fetchAuthorsList(),
    fetchAuthorsArticlesList(),
    fetchSocialMediaList(),
    speakersStore.fetchSpeakers(speakersStore.params),
    photoReportsStore.fetchPhotoReports(photoReportsStore.params, false),
    specialReportStore.fetchSpecialReports(),
  ]).finally(() => {
    loading.value = false
  })
})

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
podcastStore.fetchPodcasts(8)
</script>
