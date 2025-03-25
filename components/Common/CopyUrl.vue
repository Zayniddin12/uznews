<template>
  <div
    class="cursor-pointer relative bg-transparent flex items-center justify-between rounded group transition-200 relative"
    @click="copyUrl"
  >
    <span
      class="border border-gray-100 dark:border-blue-600 rounded-full w-[36px] md:w-[50px] h-[34px] md:h-[48px] flex-center bg-white dark:bg-blue-700 transition-200 hover:bg-blue-600 hover:border-blue-600 group cursor-pointer relative"
    >
      <i
        class="icon-link text-dark dark:text-blue-100 md:text-2xl opacity-50 group-hover:text-white group-hover:opacity-100 transition-200"
      ></i>
      <CommonTooltip with-trigger :show="copied">{{
        $t('copied')
      }}</CommonTooltip>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const url = computed(() => {
  return process.client ? window.location.href.replace(/^https?:\/\//, '') : ''
})
const copied = ref(false)
async function copyUrl() {
  copied.value = true
  await navigator.clipboard.writeText(window.location.href)
  setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<style scoped>
.text-wrapper {
  border-radius: 8px 0 0 8px;
}

.icon-wrapper {
  border-radius: 0 8px 8px 0;
}
.tooltip-custom {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
