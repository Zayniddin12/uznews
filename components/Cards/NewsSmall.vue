<template>
  <NuxtLink
    :to="`/news/${card?.slug}`"
    class="cursor-pointer flex gap-6 group border-b border-solid border-white-200 dark:border-blue-200/20 lg:!border-transparent pb-3 lg:pb-0"
  >
    <div
      class="w-[80px] lg:w-[100px] h-[80px] lg:h-[100px] rounded relative overflow-hidden shrink-0"
    >
      <img
        :src="card?.cover_image"
        alt="news-list"
        class="w-full h-full object-cover"
      />
    </div>

    <div>
      <div class="flex-y-center gap-2 lg:gap-4">
        <p
          class="border border-blue-100 rounded-md px-2 py-0.5 text-[10px] lg:text-xs leading-5 font-medium text-blue-200 dark:text-blue-100 transition-200"
        >
          {{ card?.category?.title }}
        </p>
        <p
          class="text-[10px] lg:text-xs leading-5 text-blue-600 dark:text-blue-100 transition-200 font-medium"
        >
          {{ dayjs(card?.published_at).format('DD.MM.YYYY') }}
        </p>
      </div>
      <div
        class="text-sm lg:text-base leading-136 font-bold text-blue-700 mt-1 lg:mt-3 dark:text-white transition-200 group-hover:text-blue-200 dark:group-hover:text-blue-100"
      >
        <div class="line-clamp-3">
          <span class="mr-1 !inline">
            {{ card?.title }}
          </span>
          <CommonNewsTooltip
            v-if="countElementsInString(card?.title) < 60"
            :is-video="card?.is_video"
            :is-verified="card?.is_verified"
            class="hidden lg:block"
            @click.prevent.stop
          />
          <CommonNewsTooltip
            :is-video="card?.is_video"
            :is-verified="card?.is_verified"
            class="inline lg:hidden"
            @click.prevent.stop
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { INewsList } from '~/types'
import { countElementsInString } from '~/utils'

interface Props {
  card: INewsList
}

defineProps<Props>()
</script>

<style scoped>
.custom-line-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
