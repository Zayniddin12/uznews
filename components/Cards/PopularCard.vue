<template>
  <NuxtLink
    :to="`/${link}/${news?.slug}`"
    class="py-3 sm:py-5 pl-2 rounded-lg bg-white-100 dark:bg-dark-200 group dark:hover:bg-blue-600 transition-200"
    :class="news?.cover_image ? 'pr-2 sm:pr-5' : 'px-3 sm:px-5'"
  >
    <div class="flex sm:flex-row flex-col gap-2">
      <img
        v-if="news?.cover_image"
        class="min-w-[150px] sm:min-w-[202px] sm:max-w-[202px] max-h-[160px] sm:max-h-[140px] sm:-translate-x-4 rounded-lg object-cover transition-300 group-hover:-translate-y-1"
        :src="news?.cover_image"
        alt=""
      />
      <div class="flex flex-col gap-2 md:gap-4">
        <div class="flex items-center gap-2 md:gap-4">
          <span
            v-if="news?.category?.title"
            class="border border-[#A2BCDE] dark:text-blue-100 rounded-lg leading-20 py-1 px-2.5 font-medium text-xs text-[#52618F]"
            >{{ news?.category?.title }}</span
          >
          <p class="text-dark text-xs leading-20 dark:text-blue-100">
            {{ dayjs(news?.published_at).format('DD.MM.YYYY') }}
          </p>
        </div>
        <div>
          <p
            class="text-sm font-semibold text-blue-600 leading-140 dark:text-white dark:group-hover:text-blue-100 transition-200 line-clamp-2 pr-2 sm:pr-0 mb-2"
          >
            {{ news?.title }}
          </p>
          <p
            class="text-xs leading-138 dark:text-white-100 text-blue-700 line-clamp-2"
          >
            {{ news?.subtitle }}
          </p>
        </div>
        <span
          v-if="news?.views_count"
          class="mt-2 text-blue-200 text-xs font-medium flex items-center gap-1 dark:text-white"
        >
          <i class="icon-eye text-sm"></i>
          {{ formatNumber(news?.views_count) }}</span
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { INewsSearch } from '~/types/news'
import { formatNumber } from '~/utils'

interface Props {
  news: INewsSearch
  link?: string
}

defineProps<Props>()
</script>

<style scoped>
.hover-effect:hover {
  background: white;
  box-shadow: 0px 12px 24px 0px rgba(82, 97, 143, 0.12);
}
</style>
