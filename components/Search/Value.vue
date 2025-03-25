<template>
  <li class="text-white space-y-0.5 pl-2.5 group" @click="handleCloseMobile">
    <NuxtLink
      :to="`/${urlFinder(type)}/${slug}`"
      class="w-full flex-y-center space-x-2 border-b border-solid border-white-500 group-last:border-0 dark:border-blue-200"
    >
      <div class="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
        <img
          :src="image"
          class="w-full h-full aspect-square object-cover"
          :alt="title"
        />
      </div>
      <Highlighter
        class="text-[13px] text-blue-700 dark:text-white font-bold leading-136 line-clamp-2"
        highlight-class-name="bg-[#FFCD55] dark:bg-[#F9DCA3] dark:text-white dark:bg-opacity-[24%] rounded"
        :search-words="[search ?? '']"
        :text-to-highlight="title"
      />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

interface Props {
  title?: string
  search?: string
  slug?: string
  image?: string
  type?: string
}
defineProps<Props>()

const handleCloseMobile = () => {}
function urlFinder(model: string) {
  switch (model) {
    case 'discussion':
      return 'analysis'
    case 'podcast':
      return 'podcasts'
    case 'photo_report':
      return 'reports/photo'
    case 'interview':
      return 'interview'
    case 'special_report':
      return 'reports/special'
    case 'article':
      return 'article-authors'
    default:
      return 'news'
  }
}
</script>
