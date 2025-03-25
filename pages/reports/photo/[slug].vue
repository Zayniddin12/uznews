<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <div class="container py-4 sm:py-8">
      <PhotoReportsSingleWrapper
        v-bind="{
          content: contentReports,
          detail: detailReports,
          image: imageReports,
          loading,
        }"
      >
        <div class="max-w-[682px] mx-auto mt-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex-y-center gap-3">
              <CommonHashtag v-bind="{ hashtag: detailReports.hashtags }" />
            </div>
            <CommonLikeDislike
              :id="detailReports?.id"
              v-bind="{
                data: {
                  likesCount: detailReports?.likes_count,
                  dislikesCount: detailReports?.dislikes_count,
                },
                isLiked: detailReports?.is_liked,
                isDisliked: detailReports?.is_disliked,
              }"
            />
          </div>
          <hr
            class="mb-6 border-gray-300 dark:border-blue-100/20 inline-block w-full"
          />
          <CommonShareLink class="mb-6" @click="contactModal = true" />
          <CommentsCommentMain
            :single-id="detailReports?.id"
            single-type="photo_reports"
          />
        </div>
        <template #aside>
          <TempAdvetisimentBanner />
        </template>
      </PhotoReportsSingleWrapper>
      <client-only>
        <ModalContactModal :show="contactModal" @close="contactModal = false" />
      </client-only>
      <div class="md:pt-16">
        <CommonSectionWrapper
          :title="$t('see_more')"
          all-link="/reports/photo"
        />
        <div
          class="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-[75px] gap-y-5 sm:gap-6 mt-4 md:mt-6"
        >
          <template
            v-for="(item, index) in recommendedPhotoReports"
            :key="index"
          >
            <CardsPhotoReports
              v-if="item?.images?.length"
              class="h-fit"
              v-bind="{
                card: item,
                auto: {
                  delay: 3000 + getRandomNumber() * 1000,
                  disableOnInteraction: true,
                  reverseDirection: true,
                },
              }"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'
import { usePhotoReportsStore } from '~/store/photoReports'

const reportsStore = usePhotoReportsStore()
const newsStore = useNewsStore()
const { t } = useI18n()
const route = useRoute()
const {
  params: { slug },
} = useRoute()

const contactModal = ref(false)
const loading = ref(true)

const contentReports = computed(() => reportsStore.photoReportsContent)
const detailReports = computed(() => reportsStore.photoReportsDetail)
const imageReports = computed(() => reportsStore.photoReportsImage)
const recommendedPhotoReports = computed(
  () => reportsStore.recommendedPhotoReports
)

useAsyncData(async () => {
  return await Promise.allSettled([
    reportsStore.fetchPhotoReportsSingleContent('' + slug),
    reportsStore.fetchPhotoReportsSingleDetail('' + slug),
    reportsStore.fetchPhotoReportsSingleImage('' + slug),
    reportsStore.fetchRecommendedPhotoReports(
      { offset: 0, limit: 3 },
      String(slug)
    ),
  ]).finally(() => {
    loading.value = false
  })
})

const breadcrumbRoutes = computed(() => [
  { title: t('photo_reports'), link: '/reports/photo' },
  { title: detailReports?.value?.title, link: '/reports/photo' },
])

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1
}
</script>
