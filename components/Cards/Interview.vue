<template>
  <NuxtLink
    :to="`/interview/${data?.slug}`"
    class="transition-200 group flex flex-col items-start"
    :class="rowFormat ? 'sm:!flex-row gap-3 md:gap-5 sm:items-center' : ''"
  >
    <div
      class="rounded relative"
      :class="
        rowFormat
          ? 'sm:w-full sm:h-[160px] shrink-0 sm:max-w-[274px] !w-full'
          : 'w-full sm:w-full sm:h-[160px]'
      "
    >
      <img
        v-if="data.cover_image_optional"
        :src="data.cover_image_optional"
        alt="image"
        class="aspect-video w-full h-full object-cover rounded"
      />
      <img
        v-else
        src="/images/report-1.jpg"
        class="aspect-video w-full h-full md:w-[274px] sm:h-[160px] object-cover rounded"
        alt=""
      />
      <div
        class="absolute w-full h-full top-0 pt-4 pb-3 bg-transparent group-hover:bg-blue-200/[36%] rounded transition-200 flex flex-col justify-between"
      >
        <div
          class="px-2 py-1 inline-flex items-center rounded-e bg-blue-700/40 backdrop-blur-sm w-fit overflow-hidden transition-200 max-w-[36px] group-hover:max-w-full"
        >
          <i class="icon-play text-white text-lg"></i>
          <p class="text-white text-sm font-medium ml-3">
            {{ convertToTime(data.video_duration) }}
          </p>
        </div>
        <div class="interview-card-bg px-5 py-3 text-white font-bold">
          <h3 class="text-lg uppercase">{{ $t('interview') }}</h3>
          <p class="text-sm uppercase">{{ data.with_whom }}</p>
        </div>
      </div>
    </div>
    <div class="pb-4 sm:pb-0">
      <p
        class="text-blue-700 leading-5 transition-200 dark:text-white mb-1"
        :class="rowFormat ? 'text-sm' : 'mt-4 text-xs'"
      >
        {{ dayjs(data?.published_at).format('DD.MM.YYYY') }}
      </p>
      <p
        class="font-bold text-blue-700 line-clamp-2 transition-200 dark:text-white leading-136 group-hover:text-blue-200 dark:group-hover:text-blue-100"
        :class="rowFormat ? 'text-base md:text-xl' : 'text-base'"
      >
        {{ data.title }}
      </p>
      <p
        v-if="data.views_count"
        class="mt-2 sm:mt-4 text-blue-200 transition-200 dark:text-blue-100 font-medium flex-y-center"
        :class="rowFormat ? 'text-xs md:text-sm' : 'text-xs'"
      >
        <i
          class="icon-eye text-blue-200 transition-200 dark:text-blue-100"
          :class="rowFormat ? 'mr-2' : 'mr-1'"
        ></i>
        {{ formatNumberWithSpaces(data.views_count) }}
      </p>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import { IInterview } from '~/types'

interface Props {
  data: IInterview
  rowFormat?: boolean
  singleInterview?: boolean
}
defineProps<Props>()

function convertToTime(number: number): string {
  const hours = Math.floor(number / 60)
  const minutes = number % 60

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}
</script>
<style>
.interview-card-bg {
  background: linear-gradient(
    89.54deg,
    #7ca7de 0.39%,
    rgba(82, 97, 143, 0) 97.44%
  );
}
</style>
