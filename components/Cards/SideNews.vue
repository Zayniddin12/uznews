<template>
  <NuxtLink
    :to="link ? `/${link}/${card?.slug}` : `/news/${card?.slug}`"
    class="pl-3 lg:pl-5 hover:bg-[#EDEFF4] dark:hover:bg-white/[4%] transition-200"
  >
    <div
      class="py-3 pr-3 border-b border-solid border-gray-300 dark:border-gray-300/10"
    >
      <p
        class="text-blue-200 text-xs leading-140 font-medium text-xs mb-1 transition-200 dark:text-white"
      >
        {{
          dayjs(card?.published_at).locale(locale).format('DD MMM YYYY, HH:mm')
        }}
      </p>
      <p
        class="text-sm leading-140 font-medium text-blue-600 transition-200 dark:text-white"
      >
        <span class="inline !line-clamp-3 mr-1">
          {{ card?.title }}
        </span>
        <CommonNewsTooltip
          :is-video="card?.isVideo"
          :is-verified="card?.isVerified"
          @click.prevent.stop
        />
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { IPopularList } from '~/types/news'

const { locale } = useI18n()

interface Props {
  card?: IPopularList
  link?: string
}

defineProps<Props>()
</script>
