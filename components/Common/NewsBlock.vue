<template>
  <div class="relative">
    <div
      class="md:max-h-[674px] relative pb-[70px] flex flex-col overflow-y-auto transition-200 mini-scroll-sidebar scrollbar !scrollbar-thumb-gray-100 dark:!scrollbar-thumb-gray-600 dark:!scrollbar-track-gray-700 !scrollbar-track-gray-300"
    >
      <CardsSideNews
        v-for="(card, index) in list"
        :key="index"
        v-bind="{ card, link }"
      />
    </div>
    <div
      class="absolute bottom-0 w-full h-[100px] pointer-events-none transition-200 news-side-bg-linear"
    />
    <div class="w-full absolute bottom-0 z-[1] p-3 lg:p-5">
      <NuxtLink :to="'/popular-news'">
        <CommonButton variant="primary-dark" class="w-full group !px-0">
          <div class="flex-center-between w-full pl-4 pr-2.5">
            <p>{{ buttonText }}</p>
            <i
              class="icon-arrow-right text-white group-hover:translate-x-1 transition-200"
            />
          </div>
        </CommonButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPopularList } from '~/types/news'

interface Props {
  list?: IPopularList
  buttonText?: string
  link?: string
}

defineProps<Props>()
</script>

<style scoped>
.mini-scroll-sidebar::-webkit-scrollbar {
  width: 6px;
  border-radius: 99px;
}

.mini-scroll-sidebar::-webkit-scrollbar-track {
  border-radius: 99px;
  background: #e5e7ee;
}

.mini-scroll-sidebar::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background: #d1d2d5;
}
.news-side-bg-linear {
  background: linear-gradient(
    180deg,
    rgba(245, 246, 249, 0) 0%,
    rgba(245, 246, 249, 0.94) 48.66%
  );
}

html.dark .news-side-bg-linear {
  background: linear-gradient(
    180deg,
    rgba(47, 56, 75, 0) 0%,
    rgba(47, 56, 75, 0.94) 48.66%
  );
}
</style>
