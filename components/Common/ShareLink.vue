<template>
  <div
    class="flex items-start sm:items-center flex-col sm:flex-row flex-wrap gap-3 mb-4 md:mb-6"
  >
    <p class="text-sm leading-140 font-medium text-blue-600 dark:text-gray">
      {{ $t('share') }}:
    </p>
    <div class="flex-y-center gap-2 md:gap-4">
      <div
        v-tooltip="'Telegram'"
        class="border border-gray-100 dark:border-blue-600 rounded-full w-[36px] h-[34px] md:w-[50px] md:h-[48px] flex-center bg-white dark:bg-blue-700 transition-200 hover:bg-blue-600 hover:border-blue-600 group cursor-pointer"
        @click="share('telegram', title, short_description)"
      >
        <i
          class="icon-telegram md:text-2xl text-dark dark:text-blue-100 opacity-50 group-hover:text-white group-hover:opacity-100 transition-200"
        ></i>
      </div>
      <div
        v-tooltip="'Twitter'"
        class="border border-gray-100 dark:border-blue-600 rounded-full w-[36px] h-[34px] md:w-[50px] md:h-[48px] flex-center bg-white dark:bg-blue-700 transition-200 hover:bg-blue-600 hover:border-blue-600 group cursor-pointer"
        @click="share('twitter', title)"
      >
        <i
          class="icon-twitter md:text-2xl text-dark dark:text-blue-100 opacity-50 group-hover:text-white group-hover:opacity-100 transition-200"
        ></i>
      </div>
      <div
        v-tooltip="'Facebook'"
        class="border border-gray-100 dark:border-blue-600 rounded-full w-[36px] h-[34px] md:w-[50px] md:h-[48px] flex-center bg-white dark:bg-blue-700 transition-200 hover:bg-blue-600 hover:border-blue-600 group cursor-pointer"
        @click="share('facebook', title)"
      >
        <i
          class="icon-facebook md:text-2xl text-dark dark:text-blue-100 opacity-50 group-hover:text-white group-hover:opacity-100 transition-200"
        ></i>
      </div>
      <CopyUrl />
    </div>
    <button
      class="text-sm md:text-base sm:ml-auto py-2 px-4 border border-gray-300 dark:border-blue-600 rounded-[2px] text-gray-200 dark:text-white font-medium leading-140 hover:bg-blue-600 hover:border-blue-600 transition-200 hover:text-white"
      @click="onClick"
    >
      {{ $t('write_to_us') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import CopyUrl from '~/components/Common/CopyUrl.vue'
import { share } from '~/utils'

interface Props {
  title?: string
  short_description?: string
}
defineProps<Props>()

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

const onClick = () => {
  emit('click')
}
</script>
