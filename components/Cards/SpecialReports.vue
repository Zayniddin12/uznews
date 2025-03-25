<template>
  <NuxtLink
    :to="'/reports/special/' + `${data?.slug}`"
    class="group inline-block pr-5 md:pr-0 w-full h-full"
  >
    <div
      class="p-3 bg-[#a2bcde29] sm:p-5 w-full h-[146px] sm:!min-h-[180px] rounded-lg text-white relative transition-200 group-hover:-translate-y-1"
      :class="specialReport ? 'dark:bg-dark-200' : 'md:w-[521px]'"
    >
      <p
        class="text-xs leading-20 mb-2 sm:mb-4"
        :class="
          specialReport
            ? 'text-blue-600 dark:text-blue-100 text-[10px] sm:mb-3'
            : ''
        "
      >
        {{
          dayjs(data?.published_at).locale(locale).format('DD MMM YYYY, HH:mm')
        }}
      </p>
      <p
        class="font-medium sm:font-bold leading-136 line-clamp-2"
        :class="
          specialReport
            ? 'text-blue-700 dark:text-white text-sm mb-0 max-w-[183px] sm:max-w-[140px] md:max-w-[189px]'
            : 'text-sm sm:text-base mb-1 sm:mb-[6px] max-w-[183px] sm:max-w-[267px] md:max-w-[303px]'
        "
      >
        {{ data?.title }}
      </p>
      <p
        class="mb-3 sm:mb-5 sm:font-medium leading-20"
        :class="
          specialReport
            ? 'text-blue-200 dark:text-gray-100 text-[10px]'
            : 'text-blue-100 text-xs'
        "
      >
        {{ data?.author?.full_name }}
      </p>
      <div
        v-if="data?.views_count"
        class="font-medium leading-14 flex items-center gap-x-1 absolute bottom-3 sm:bottom-5 left-3 sm:left-5"
        :class="
          specialReport
            ? 'text-[10px] text-blue-200 dark:text-white'
            : 'text-blue-100 text-xs'
        "
      >
        <i class="icon-eye"></i>
        <span>{{ formatNumberWithSpaces(data?.views_count) }}</span>
      </div>
      <div
        class="absolute-y-center rounded-lg overflow-hidden bg-blue-200 blur-[0] group-hover:blur-[14.5px] transition-200"
        :class="
          specialReport
            ? '-right-5 md:-right-11 w-[114px] h-[70px] sm:w-[156px] sm:h-[96px]'
            : '-right-5 w-[138px] h-[96px] sm:w-[202px] sm:h-[140px]'
        "
      ></div>
      <img
        class="absolute-y-center rounded-lg object-cover"
        :class="
          specialReport
            ? '-right-5 md:-right-11 w-[114px] h-[70px] sm:w-[156px] sm:h-[96px]'
            : '-right-5 w-[138px] h-[96px] sm:w-[202px] sm:h-[140px]'
        "
        :src="data?.cover_image"
        alt="card-img"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { ISpecialReports } from '~/types/special-reports'

const { locale } = useI18n()

interface Props {
  data: ISpecialReports
  specialReport?: boolean
}
defineProps<Props>()
</script>
