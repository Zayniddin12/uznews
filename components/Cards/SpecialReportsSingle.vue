<template>
  <NuxtLink
    :to="`/reports/special/${data?.slug}`"
    class="py-5 rounded-lg bg-white-100 dark:bg-dark-200 group dark:hover:bg-blue-600 transition-200"
    :class="data?.cover_image ? 'pr-5' : 'px-5'"
  >
    <div class="flex gap-0.5">
      <img
        v-if="data?.cover_image"
        class="w-[140px] md:w-[202px] -translate-x-2 md:-translate-x-4 rounded-lg object-cover transition-300 group-hover:-translate-y-1"
        :src="data?.cover_image"
        alt=""
      />
      <div class="flex flex-col gap-[6px] md:gap-4">
        <div class="flex items-center gap-4">
          <p class="text-dark text-xs leading-20 dark:text-blue-100">
            {{
              dayjs(data?.published_at)
                .locale(locale)
                .format('DD MMM YYYY, HH:MM')
            }}
          </p>
        </div>
        <div>
          <h1
            class="text-sm md:text-base font-semibold text-blue-600 leading-140 dark:text-white dark:group-hover:text-blue-100 transition-200"
          >
            {{ data?.title }}
          </h1>
          <p class="text-xs leading-138 dark:text-white-100 text-blue-700">
            {{ data?.author?.full_name }}
          </p>
        </div>
        <span
          v-if="data?.views_count"
          class="mt-2 text-blue-200 text-xs font-medium flex items-center gap-1 dark:text-white"
        >
          <i class="icon-eye text-sm"></i>
          {{ formatNumberWithSpaces(data?.views_count) }}</span
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { ISpecialReports } from '~/types/special-reports'
import { formatNumber } from '~/utils'

const { locale } = useI18n()

interface Props {
  data: ISpecialReports
  badgeText: string
}
defineProps<Props>()
</script>
