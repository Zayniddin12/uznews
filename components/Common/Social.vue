<template>
  <a :href="item?.link" target="_blank" class="flex-y-center gap-2.5 group">
    <div
      class="flex-center w-10 md:w-[50px] h-10 md:h-[50px] rounded-full transition-200 bg-[#E7EEF6] dark:bg-[#44526E] group-hover:bg-blue-100/50 dark:group-hover:bg-blue-100"
    >
      <img
        v-if="item?.icon"
        :src="item?.icon"
        :alt="item?.title"
        class="w-6 h-6"
      />
      <i
        v-else
        :class="'icon-' + item?.title"
        class="text-blue-200 transition-200 dark:text-white text-xl"
      />
    </div>

    <div>
      <p
        class="uppercase text-sm md:text-base leading-140 font-bold text-blue-600 transition-200 dark:text-white group-hover:text-blue-200 dark:group-hover:text-blue-100"
      >
        {{ item?.title }}
      </p>
      <p
        v-if="item?.follower_count"
        class="text-blue-200 text-xs md:text-sm leading-140 font-medium transition-200 dark:text-blue-100"
      >
        {{ formatNumberWithSpaces(item?.follower_count) }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { IMediaList } from '~/types'

interface Props {
  item: IMediaList
}

defineProps<Props>()
</script>
