<template>
  <div class="pb-14">
    <CommonBreadcrumb :menu="menu" />
    <div class="grid grid-cols-12 gap-y-5 md:gap-8 mt-8 container">
      <div class="col-span-12 md:col-span-9">
        <!--        <CardsAuthorSideCard :author="authorDetail" />-->
        <CardsAuthorSingleCover
          :author="authorDetail"
          :article-detail="articleDetail.results"
          class="mb-4 sm:mb-8"
        />
        <p
          class="mb-3 sm:mb-6 font-bold leading-130 text-xl sm:text-4xl text-blue-600"
        >
          {{ $t('author_articles') }}
        </p>
        <div
          v-if="articleDetail?.results?.length"
          class="flex flex-col md:grid grid-cols-12 gap-6"
        >
          <CardsDefaultAuthor
            v-for="(card, index) in articleDetail?.results"
            :key="index"
            v-bind="{ card }"
            class="col-span-6 rounded-lg"
            is-default
            is-single
          />
        </div>
        <div v-else class="p-8 md:p-16 flex-center flex-col">
          <img src="/svg/no-data.svg" alt="" />
          <p class="text-blue-700 font-bold leading-136 text-xl text-center">
            {{ $t('no_article') }}
          </p>
        </div>
        <CommonButton
          v-if="articleDetail?.results?.length < articleDetail?.count"
          :loading="isLoading"
          class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mt-8"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >
      </div>
      <aside class="col-span-12 md:col-span-3">
        <div class="w-full h-full">
          <CommonOtherAuthors :others="otherAuthors" class="mb-6" />
          <a :href="advertising.ad2?.link" target="_blank">
            <img :src="advertising.ad2?.image" class="bg-cover" alt="" />
          </a>
          <a :href="advertising.ad1?.link" target="_blank">
            <img :src="advertising.ad1?.image" class="mt-6 bg-cover" alt="" />
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute } from '#app'
import { useAuthorsStore } from '~/store/authors'

const { t } = useI18n()
const authorStore = useAuthorsStore()
const advertising = ref({})
const {
  params: { id },
} = useRoute()
const params = { offset: 0, limit: 5, search: undefined }
const otherAuthors = computed(() => authorStore.recommendedAuthors)
async function fetchSingle() {
  return await authorStore.fetchArticleSingle(+id)
}

async function fetchDetail() {
  return await authorStore.fetchAuthorArticleDetail(+id)
}

const { data: authorDetail } = await useAsyncData('single', fetchSingle)
const { data: articleDetail } = await useAsyncData('detail', fetchDetail)
useAsyncData(async () => {
  await authorStore.fetchRecommendedAuthors(params, +id)
})
useApi()
  .$get('/common/BaseAd')
  .then((res) => {
    advertising.value = res
  })

const isLoading = ref(false)
const loadMore = () => {
  isLoading.value = true
  authorStore.params.offset += 4
  authorStore.fetchAuthorArticleDetail(+id, authorStore.params)
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const menu = computed(() => [
  { title: t('authors'), link: '/authors' },
  { title: authorDetail.value?.full_name, link: '/authors/1' },
])

useSeoMeta({
  title: authorDetail.value?.full_name,
  ogTitle: authorDetail.value?.full_name,
  description: authorDetail.value?.position,
  ogDescription: authorDetail.value?.position,
  ogImage: authorDetail.value?.avatar,
})
</script>
