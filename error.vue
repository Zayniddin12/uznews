<template>
  <div class="dark:bg-dark-200">
    <LayoutHeader />
    <div class="flex items-center justify-center h-screen container">
      <div class="flex items-center justify-center flex-col">
        <img
          v-if="isDark == 'dark'"
          src="/images/404dark.png"
          alt="404"
          class="pointer-events-none max-w-[644px] w-full"
        />
        <img
          v-else
          src="/images/404light.png"
          alt="404"
          class="pointer-events-none max-w-[644px] w-full"
        />
        <h2
          class="font-bold text-28 text-center text-blue-700 dark:text-white mt-8"
        >
          {{ $t('not_found') }}
        </h2>
        <p
          class="leading-130 text-base text-gray-200 dark:text-white-100 sm:text-lg text-center"
        >
          {{ $t('not_found_detail') }}
        </p>
        <nuxt-link to="/">
          <CommonButton
            :text="$t('back_to_main')"
            class="!bg-blue-150 !text-white !gap-0 dark:!text-white py-1.5 px-8 md:py-3 md:px-12 !font-medium mt-6"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NuxtError } from '#app'
import { useHomeStore } from '~/store'

const homeStore = useHomeStore()

const isDark = ref('')

homeStore.nuxtServerInit()

interface Props {
  error: NuxtError
}
defineProps<Props>()
</script>
