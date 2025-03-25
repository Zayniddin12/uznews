<template>
  <div>
    <CommonBreadcrumb :menu="[{ title: t('authors'), link: '/authors' }]" />
    <div class="container pb-16">
      <CommonPageWrapper
        :title="$t('authors')"
        :text="$t('authors_text')"
        class="mt-8"
      >
        <div class="grid gap-5">
          <div v-if="preloader" class="grid gap-5">
            <BlockAuthorsCardShimmer v-for="item in 6" :key="item" />
          </div>
          <div v-else class="grid gap-5">
            <CardsAuthorsCard
              v-for="(item, index) in authorsList"
              :key="index"
              :author="item"
            />
          </div>
        </div>
        <div v-if="isLoading" class="grid gap-5">
          <BlockAuthorsCardShimmer v-for="i in 4" :key="i" />
        </div>
        <CommonButton
          v-if="
            authorsStore.articlesLoading &&
            authorsList?.length < authorsStore.authorsCount
          "
          :loading="isLoading"
          class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mt-8"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('all_authors') }}</CommonButton
        >
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthorsStore } from '~/store/authors'

const authorsStore = useAuthorsStore()

const authorsList = computed(() => authorsStore.authorsSecondList)

const { t } = useI18n()

const isLoading = ref(true)
const preloader = ref(true)
// const copyOfAuthorsData = ref([...authorsData])

setTimeout(() => {
  preloader.value = false
})

const loadMore = () => {
  isLoading.value = true
  authorsStore.params.offset += 4
  authorsStore.fetchAuthorsLists(authorsStore.params, true)

  setTimeout(() => {
    isLoading.value = false
    authorsStore.articlesLoading = false
  }, 300)
}

authorsStore.fetchAuthorsLists(authorsStore.params).finally(() => {
  isLoading.value = false
})

useSeoMeta({
  title: t('authors'),
  ogTitle: t('authors'),
  description: t('authors_text'),
  ogDescription: t('authors_text'),
})
</script>
