<template>
  <button
    class="text-sm active:scale-95 transition-200 hover:bg-blue-200 dark:text-blue-100 dark:hover:text-blue-600 dark:hover:bg-white hover:text-white font-medium leading-126 p-2 rounded-[30px] bg-[#a2bcde29] text-blue-200"
  >
    <slot />
    {{ $t(text) }}
  </button>
</template>

<script lang="ts" setup>
interface Props {
  text: string
}

defineProps<Props>()
</script>
