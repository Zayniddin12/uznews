<template>
  <div
    class="pb-4 sm:pb-8 border-b border-solid border-white-300 dark:border-blue-200/20 flex items-start gap-3"
  >
    <div class="!hidden md:!flex items-center">
      <div
        class="flex-center bg-blue-100 w-3 h-3 rounded-full bullet-shadow dark:bg-blue-100 transition-200"
      >
        <div
          class="w-1.5 h-1.5 rounded-full bg-white transition-200 dark:bg-blue-900"
        />
      </div>
      <div class="w-5 h-px bg-white-300 ml-1 transition-200 dark:bg-blue-600" />
      <div
        class="py-[7px] rounded-full border border-solid border-white-300 px-4 dark:border-blue-600 transition-200"
      >
        <p
          class="text-sm leading-130 font-semibold text-blue-200 dark:text-white transition-200"
        >
          {{ dayjs(card?.published_at).format('HH:MM') }}
        </p>
      </div>
    </div>

    <div>
      <div class="flex-y-center gap-3">
        <div class="!flex-y-center md:!hidden">
          <div
            class="flex-center bg-blue-100 w-3 h-3 rounded-full bullet-shadow dark:bg-blue-100 transition-200 !hidden"
          >
            <div
              class="w-1.5 h-1.5 rounded-full bg-white transition-200 dark:bg-blue-900"
            />
          </div>
          <div
            class="w-5 h-px bg-white-300 ml-1 transition-200 dark:bg-blue-600 hidden"
          />
          <div
            class="py-[7px] rounded-full border border-solid border-white-300 px-4 dark:border-blue-600 transition-200"
          >
            <p
              class="text-sm leading-130 font-semibold dark:text-white transition-200"
            >
              {{ dayjs(card?.published_at).format('HH:MM') }}
            </p>
          </div>
        </div>
        <div
          class="p-2 bg-blue-100/[16%] rounded-full inline-flex items-center"
        >
          <i
            class="icon-bolt text-xs text-blue-200 transition-200 dark:text-blue-100"
          />
          <p
            class="text-blue-200 dark:text-blue-100 text-sm leading-126 font-semibold"
          >
            Новости
            <!-- {{ card?.category?.title }} -->
          </p>
        </div>
      </div>

      <nuxt-link
        :to="`news/${card?.slug}`"
        class="block mt-3 text-lg leading-130 font-normal text-blue-600 hover:text-blue-200 transition-200 dark:text-white dark:hover:opacity-70"
      >
        {{ card?.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { INewsList } from '~/types'

interface Props {
  card: INewsList
}

const props = defineProps<Props>()
</script>

<style scoped>
.bullet-shadow {
  box-shadow: 0 0 10px rgba(162, 188, 222, 0.6);
}
</style>
