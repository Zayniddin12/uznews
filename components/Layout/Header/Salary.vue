<template>
  <div
    class="flex-center mt-[3px] text-blue-200 dark:text-blue-100 text-xs font-medium transition-200"
  >
    <span class="flex-shrink-0 text-[12px]">{{ symbol }} &nbsp</span>
    <span v-if="rate"
      >{{ formatNumberWithSpaces(rate) }} {{ $t('currency') }}</span
    >
    <span
      class="ml-2 flex-y-center space-x-1"
      :class="rateDiffer > 0 ? 'text-green' : 'text-red-500'"
    >
      <span>{{ rateDiffer }}</span>
      <span v-if="rateDiffer > 0" class="icon-top text-[6px]" />
      <span v-else class="icon-top text-red-500 rotate-[180deg] text-[6px]" />
    </span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  symbol: string
  rate: number
  rateDiffer: number
}
defineProps<Props>()
</script>
