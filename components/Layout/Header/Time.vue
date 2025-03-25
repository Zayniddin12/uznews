<template>
  <div
    class="space-x-[6px] text-xs format-medium leading-140 font-medium transition-200"
  >
    <span class="lowercase text-blue-200 dark:text-blue-100">
      {{ dayjs(date).locale(locale).format('D MMMM, dddd') }}
    </span>
    <span class="text-blue-700 dark:text-white">
      {{ dayjs(date).locale(locale).format('H:m') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

interface Props {
  date?: string
}
defineProps<Props>()
</script>
