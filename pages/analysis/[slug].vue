<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <CommonSinglePageWrapper
      class="mb-16"
      :single="discussionSingle"
      :content="discussionSingleContent"
    >
      <CommentsCommentMain
        :single-id="discussionSingle?.id"
        single-type="discussion"
        v-bind="{ comments }"
      />
    </CommonSinglePageWrapper>
    <SectionsAnalysis
      class="pb-14 md:pb-20"
      v-bind="{ discussionData: discussionList }"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import { useDiscussionsStore } from '~/store/discussions'
import { useNewsStore } from '~/store/news'

const { t } = useI18n()
const loading = ref(true)

const route = useRoute()
const discussionsStore = useDiscussionsStore()
const homeStore = useHomeStore()
const newsStore = useNewsStore()

useAsyncData(async () => {
  return await Promise.allSettled([
    homeStore.fetchDiscussionList(),
    discussionsStore.fetchDiscussionSingle('' + route?.params?.slug),
    discussionsStore.fetchDiscussionSingleDetail('' + route?.params?.slug),
  ]).finally(() => (loading.value = false))
})

const comments = computed(() => newsStore.newsCommentList)
const discussionSingle = computed(() => discussionsStore.discussionSingle)
const discussionSingleContent = computed(
  () => discussionsStore.discussionSingleContent
)
const discussionList = computed(() => homeStore.discussionList)

const breadcrumbRoutes = computed(() => [
  { title: t('parsing'), link: '/analysis' },
  {
    title: discussionsStore?.discussionSingle?.title,
    link: '/analysis',
  },
])
</script>
