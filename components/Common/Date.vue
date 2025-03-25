<template>
  <div
    class="px-5 py-3 rounded-full border border-solid border-white-300 inline-block dark:border-blue-600"
  >
    <p
      class="text-xs md:text-2xl leading-[125%] text-blue-900 font-bold transition-200 dark:text-white"
    >
      {{ dayjs(date).locale(locale).format('D MMMM, YYYY') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
interface Props {
  date: string
}

defineProps<Props>()
</script>
