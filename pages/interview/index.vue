<template>
  <div class="pb-[70px]">
    <CommonBreadcrumb :menu="breadcrumb" />
    <div class="container">
      <CommonPageWrapper
        :title="$t('interview')"
        :text="$t('interview_sub')"
        class="mt-8"
      >
        <div v-if="loading">
          <BlockInterviewShimmer />
          <div class="grid gap-6 mt-8">
            <BlockInterviewCard v-for="item in 4" :key="item" />
          </div>
        </div>
        <SectionsInterviewMainCard
          v-if="interviews.length"
          :cover-data="interviews[0]"
          class="mb-8"
        />
        <div class="grid grid-cols-1 gap-y-4 md:gap-6 mb-8">
          <CardsInterview
            v-for="(item, index) in interviews"
            :key="index"
            :data="item"
            row-format
            class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
          />
        </div>
        <CommonButton
          v-if="
            !interviewsStore.loading &&
            interviews?.length < interviewsStore.count
          "
          :loading="isLoading"
          class="w-full text-blue-600 dark:text-blue-100 hover:!text-white !bg-[#52618f1a] font-medium leading-125 mt-8"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >
        <template #aside>
          <img src="https://picsum.photos/274/584" class="w-full" alt="" />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useInterviewStore } from '~/store/interview'

const isLoading = ref(false)

const interviewsStore = useInterviewStore()
const interviews = computed(() => interviewsStore.interviews)

const { t } = useI18n()

const breadcrumb = computed(() => [
  {
    title: t('interview'),
    link: '/interview',
  },
])
const loading = computed(() => interviewsStore.loading)
const loadMore = () => {
  isLoading.value = true
  interviewsStore.params.offset += 4
  interviewsStore.fetchInterviews(interviewsStore.params, true)
}
interviewsStore.fetchInterviews(interviewsStore.params, false)

useSeoMeta({
  title: t('interview'),
  ogTitle: t('interview'),
  description: t('interview_sub'),
  ogDescription: t('interview_sub'),
})
</script>
