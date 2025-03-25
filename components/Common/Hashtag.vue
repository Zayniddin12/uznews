<template>
  <div class="flex-y-center gap-3">
    <!-- Hashtag: do not touch this url, fed up with already fixing this thousands of times   -->
    <NuxtLink
      v-for="(item, idx) in hashtag"
      :key="idx"
      :to="`/hashtag?hash=${item?.slug}`"
      class="text-sm active:scale-95 transition-200 hover:bg-blue-200/20 dark:text-blue-100 dark:hover:text-blue-600 dark:hover:bg-white font-medium leading-126 p-2 rounded-[30px] bg-[#a2bcde29] text-blue-200"
      >{{ item?.title }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { IHashtag } from '~/types'

interface Props {
  hashtag: IHashtag
}

defineProps<Props>()
</script>
