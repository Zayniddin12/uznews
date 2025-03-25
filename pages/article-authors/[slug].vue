<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <div class="pb-8 md:pb-16">
      <CommonSinglePageWrapper
        v-bind="{ single: articleDetail, content: articleContent }"
      >
        <CommentsCommentMain
          :single-id="articleDetail?.id"
          single-type="article"
          v-bind="{ comments }"
        />
        <template #aside>
          <img src="https://picsum.photos/200/400" class="w-full" alt="" />
        </template>
      </CommonSinglePageWrapper>
      <div class="container mt-10 md:mt-16">
        <CommonSectionWrapper
          :title="$t('read_more')"
          :all-link="'/article-authors'"
        />
        <div class="flex flex-col md:grid grid-cols-12 gap-6 mt-6">
          <CardsAuthor
            v-for="(card, index) in recommendedArticleList"
            :key="index"
            v-bind="{ card }"
            class="col-span-4"
            recommended
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useArticleAuthorsStore } from '~/store/articleAuthors'
import { useNewsStore } from '~/store/news'

const { t } = useI18n()
const {
  params: { slug },
} = useRoute()

const loading = ref(true)
const contactModal = ref(false)

const articleStore = useArticleAuthorsStore()
const newsStore = useNewsStore()

const comments = computed(() => newsStore.newsCommentList)
const articleContent = computed(() => articleStore.articleAuthorsContent)
const articleDetail = computed(() => articleStore.articleAuthorsDetail)
const recommendedArticleList = computed(
  () => articleStore.recommendedArticleList
)

useAsyncData(async () => {
  return await Promise.allSettled([
    articleStore.fetchArticleAuthorsSingleContent('' + slug),
    articleStore.fetchArticleAuthorsSingleDetail('' + slug),
    articleStore.fetchRecommendedArticleList(
      { offset: 0, limit: 3 },
      String(slug)
    ),
  ]).finally(() => {
    loading.value = false
  })
})

const breadcrumbRoutes = computed(() => [
  { title: t('articles_author'), link: '/article-authors' },
  { title: articleDetail?.value?.title, link: '/article-authors' },
])

useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
})
</script>
