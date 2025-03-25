<template>
  <div
    v-if="salary"
    class="mt-[-1px] flex items-center justify-end text-xs text-blue-200 dark:text-blue-100 font-medium leading-130 py-[6px] px-2 space-x-2"
  >
    <span>{{ type }}: {{ formatNumberWithSpaces(salary) }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: string
  salary?: number
  currency?: string
}
withDefaults(defineProps<Props>(), {
  type: 'МPОТ',
  salary: 970000,
  currency: 'UZS',
})
</script>
