<template>
  <div v-if="breakingNews?.expired_at">
    <div
      class="bg-white overflow-x-hidden flex-y-center transition-200 dark:bg-blue-700"
    >
      <div
        class="relative z-20 flex-shrink-0 transition-200 bg-red-light dark:bg-red-700 p-3 md:py-[14px] md:pr-[11px] md:pl-5 inline-flex items-center space-x-2"
      >
        <span
          class="icon-bolt text-red text-2xl transition-200 dark:text-red-100"
        />
        <span
          class="text-red transition-200 dark:text-red-100 text-base font-medium leading-20 hidden md:block"
        >
          {{ $t('beaking_news') }}
        </span>
      </div>
      <div class="w-full h-full relative">
        <div
          class="absolute -left-2 top-0 h-full w-[115px] custom-gradient transition-200 opacity-100 dark:!opacity-0 pointer-events-none z-10"
        />
        <div
          class="absolute -left-2 top-0 h-full w-[115px] custom-gradient-dark transition-200 opacity-0 dark:opacity-100 pointer-events-none z-10"
        />
        <div class="marquee">
          <div aria-hidden="true" class="marquee__group_left space-x-3">
            <div
              v-for="el of generateItem([1, 2, 3, 4, 5, 6])"
              :key="el"
              class="flex-y-center space-x-3 cursor-pointer"
            >
              <div
                class="relative flex-shrink-0 w-[6px] h-[6px] rounded-full bg-red"
              />
              <p
                class="text-base text-blue-600 font-normal leading-136 transition-200 hover:text-red-100 dark:text-blue-100 dark:hover:text-white"
              >
                {{ breakingNews?.news?.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHomeStore } from '~/store'

const homeStore = useHomeStore()
homeStore.fetchBreakingNews()
const breakingNews = computed(() => homeStore.breakingNews)
useAsyncData('breaking-news', async () => await homeStore.fetchBreakingNews())
function generateItem(arr: any[]) {
  if (arr) {
    let index = 0 // 1 / 2
    const generatedArray = [] // [{id: 1},{id: 2}, {id: 3}, {id: 1}]
    const checkResponseLength = arr?.length // 3
    const checkAdditionalItems = 100 - checkResponseLength // 97
    for (let i = 0; i <= checkAdditionalItems; i++) {
      generatedArray.push(arr[index])
      if (index + 1 === checkResponseLength) {
        index = 0
      } else {
        index++
      }
    }
    return generatedArray
  }
}
</script>

<style scoped>
.custom-gradient {
  background: linear-gradient(
    90deg,
    #ffffff 2.58%,
    rgba(255, 255, 255, 0) 100%
  );
}
.custom-gradient-dark {
  background: linear-gradient(90deg, #191f2e 2.58%, rgba(25, 31, 46, 0) 100%);
}
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 3rem;
}

.marquee__group_left {
  flex-shrink: 0;
  margin-left: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 28px;
  min-width: 100%;
  animation: scroll-left 2000s linear infinite;
}

.marquee__group_left:hover {
  animation-play-state: paused;
}
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 3rem));
  }
}
</style>
