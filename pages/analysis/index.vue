<template>
  <div class="pb-16">
    <CommonBreadcrumb :menu="[{ title: t('parsing'), link: '/' }]" />
    <div class="container">
      <CommonPageWrapper
        :title="$t('analyzes')"
        :text="$t('analyzes_text')"
        class="mt-8"
      >
        <div v-if="loading" class="grid grid-cols-3 gap-8">
          <BlockAnalysisShimmer v-for="item in 6" :key="item" />
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 sm:gap-x-8 gap-y-6 gap-8 mt-6"
        >
          <nuxt-link
            v-for="(item, index) in discussions"
            :key="index"
            :to="`/analysis/${item?.slug}`"
            class="lg:col-span-4"
          >
            <CardsAnalise v-bind="{ item }" />
          </nuxt-link>
        </div>
        <CommonButton
          v-if="
            !discussionsStore.loading &&
            discussions?.length < discussionsStore.count
          "
          :loading="isLoading"
          class="w-full text-blue-600 dark:text-blue-100 hover:!text-white !bg-[#52618f1a] font-medium leading-125 mt-8"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >
        <template #aside>
          <TempAdvetisimentBanner class="mt-11" />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CardsAnalise from '~/components/Cards/Аnalise.vue'
import { useDiscussionsStore } from '~/store/discussions'

const { t } = useI18n()
const discussionsStore = useDiscussionsStore()

const discussions = computed(() => discussionsStore.discussions)

const loading = computed(() => discussionsStore.loading)

const isLoading = ref(false)
const loadMore = () => {
  isLoading.value = true
  discussionsStore.params.offset += 5
  discussionsStore.fetchDiscussions(discussionsStore.params, true)
}

discussionsStore.fetchDiscussions(discussionsStore.params)

useSeoMeta({
  title: t('analyzes'),
  ogTitle: t('analyzes'),
  description: t('analyzes_text'),
  ogDescription: t('analyzes_text'),
})
</script>
