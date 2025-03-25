<template>
  <NuxtLink
    :to="`/news/${card?.slug}`"
    class="border-b last:border-b-[0px] sm:last:border-b sm:border border-solid border-blue-200/20 sm:rounded-lg relative overflow-visible transition-200 hover:bg-white-100 dark:hover:bg-blue-200/20 hover:border-transparent group flex items-center sm:items-start sm:flex-col flex-row-reverse gap-2 sm:gap-0 justify-between"
  >
    <div class="shrink-0 sm:w-full">
      <div
        class="w-full h-full max-w-[127px] max-h-[72px] sm:max-w-[unset] sm:max-h-[unset] sm:w-[unset] sm:h-[unset] relative overflow-hidden sm:aspect-video rounded sm:rounded-none"
      >
        <img
          :src="card?.cover_image"
          alt="card-news-image"
          class="w-full h-full object-cover sm:rounded-t-lg"
        />
      </div>
    </div>
    <div
      class="py-3 pl-3 sm:p-4 h-full flex flex-col justify-between gap-3 sm:gap-0"
    >
      <div>
        <div class="flex-y-center gap-4">
          <p
            class="border border-solid border-blue-100 rounded-md px-2 py-0.5 text-[10px] sm:text-xs leading-5 font-medium text-blue-200 dark:text-blue-100 transition-200"
          >
            {{ card?.category?.title }}
          </p>

          <p
            class="text-[10px] sm:text-xs leading-5 text-blue-600 dark:text-blue-100 transition-200 font-medium"
          >
            {{ dayjs(card?.published_at).format('DD.MM.YYYY') }}
          </p>
        </div>

        <div
          class="text-sm !line-clamp-3 sm:text-base leading-136 font-bold text-blue-700 mt-3 dark:text-white transition-200 group-hover:text-blue-200 dark:group-hover:text-white overflow-visible"
        >
          <span class="mr-1">
            {{ card?.title }}
          </span>
          <!--          <CommonNewsTooltip-->
          <!--            :is-video="card?.isVideo"-->
          <!--            :is-verified="card?.isVerified"-->
          <!--          />-->
        </div>
      </div>

      <div class="sm:mt-4 flex-y-center gap-3 sm:gap-5">
        <p
          v-if="card?.views_count"
          class="transition-200 line-clamp-2 flex-y-center gap-1 text-xs sm:text-sm leading-14 font-medium text-blue-200 dark:text-white"
        >
          <i class="icon-eye font-normal" />
          {{ formatNumberWithSpaces(card?.views_count) }}
        </p>

        <p
          v-if="card?.comment_count"
          class="transition-200 line-clamp-2 flex-y-center gap-1 text-xs sm:text-sm leading-14 font-medium text-green"
        >
          <i class="icon-chat font-normal" />
          {{ formatNumberWithSpaces(card?.comment_count) }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { INewsList } from '~/types'

interface Props {
  card: INewsList
}

defineProps<Props>()
</script>
