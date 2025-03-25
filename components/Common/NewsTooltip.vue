<template>
  <span class="md:absolute">
    <i
      v-if="isVideo"
      v-tooltip="$t('media_tooltip')"
      class="icon-play-circle text-blue-200 dark:text-white transition-200 inline-block -mb-1 translate-y-[1px]"
    />
    <i
      v-if="isVerified"
      v-tooltip="$t('verified_tooltip')"
      class="icon-unread text-green inline-block -mb-1 translate-y-[0.5px]"
    />
  </span>
</template>
<script setup lang="ts">
interface Props {
  isVideo?: boolean
  isVerified?: boolean
}
defineProps<Props>()
</script>
<style>
.tooltip:hover > div {
  opacity: 1 !important;
  top: -8px;
}
</style>
