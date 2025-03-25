<template>
  <div class="pb-16">
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <div class="container">
      <CommonPageWrapper
        :title="$t('photo_reports')"
        :text="$t('photo_reports_text')"
        class="mt-8"
      >
        <div v-if="loading"><BlockPhotoReportBig class="mb-7" /></div>
        <div v-else>
          <CardsPhotoReportSliderCard
            v-bind="{
              card: photoReports[0],
              auto: {
                delay: 5000,
                disableOnInteraction: true,
                reverseDirection: true,
              },
            }"
            main
            class="mb-11"
          />
        </div>
        <div>
          <div v-if="loading" class="grid grid-cols-2 gap-5 mb-14">
            <BlockPhotoReportMiddle v-for="item in 8" :key="item" />
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 md:mb-14"
          >
            <client-only>
              <CardsPhotoReportSliderCard
                v-for="(item, index) in photoReports.slice(1)"
                :key="index"
                v-bind="{
                  card: item,
                  auto: {
                    delay: 9000 + getRandomNumber() * 1000,
                    disableOnInteraction: true,
                    reverseDirection: true,
                  },
                }"
                small
                class="mb-3 md:mb-5"
              />
            </client-only>
          </div>
          <CommonButton
            v-if="
              !photoReportsStore.loading &&
              photoReports?.length < photoReportsStore.count
            "
            :loading="isLoading"
            class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mt-6 md:mt-8 dark:text-white"
            @click="loadMore"
          >
            <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
            {{ $t('load_more') }}</CommonButton
          >
        </div>
        <!--        this is skeleton-->
        <div v-if="false" class="flex gap-5 mb-20">
          <BlockLoaderPhotoReports />
          <BlockLoaderPhotoReports />
        </div>
        <!--        this is skeleton-->
        <template #aside>
          <TempAdvetisimentBanner />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { usePhotoReportsStore } from '~/store/photoReports'

const photoReportsStore = usePhotoReportsStore()

const photoReports = computed(() => photoReportsStore.reports)
const loading = computed(() => photoReportsStore.loading)

const { t } = useI18n()

const isLoading = ref(false)

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1
}

const breadcrumbRoutes = computed(() => [
  { title: t('photo_reports'), link: '/reports/photo' },
])
const loadMore = async () => {
  try {
    isLoading.value = true
    photoReportsStore.params.offset += 5
    await photoReportsStore.fetchPhotoReports(photoReportsStore.params, true)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
photoReportsStore.fetchPhotoReports(photoReportsStore.params, false)

useSeoMeta(
  computed(() => {
    return {
      title: t('photo_reports'),
      ogTitle: t('photo_reports'),
      description: t('photo_reports_text'),
      ogDescription: t('photo_reports_text'),
    }
  })
)
</script>
