<template>
  <div
    class="w-full md:w-full rounded-lg text-dark relative transition-200 group-hover:-translate-y-1"
  >
    <h3
      class="text-blue-700 dark:text-white text-xl md:text-[24px] font-bold leading-loose"
    >
      {{ data?.title }}
    </h3>
    <p
      class="fon-text text-slate-700 dark:text-gray-100 text-base md:text-[18px] font-normal leading-relaxed"
    >
      {{ data?.description }}
    </p>
    <h4
      class="text-gray-900 dark:text-white text-xl md:text-[24px] font-semibold leading-loose"
    >
      Стоимость: {{ data?.price }}
    </h4>
    <span
      v-if="data?.id !== count"
      class="block w-full h-[1px] my-6 bg-gray-300 dark:bg-blue-100"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { formatMoneyDecimal } from '~/utils'

const { locale } = useI18n()

interface Props {
  data: object
  count: number
}
defineProps<Props>()
</script>
