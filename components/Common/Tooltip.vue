<template>
  <div
    class="absolute bottom-full left-1/2 -translate-x-1/2 transition-200 bg-dark rounded-lg"
    :class="[
      show && withTrigger
        ? '!-translate-y-1/3 visible opacity-100'
        : 'translate-y-0 invisible opacity-0',
      {
        ' group-hover:visible group-hover:opacity-100 group-hover:-translate-y-1/3':
          !withTrigger,
      },
    ]"
  >
    <div
      class="tooltip bg-dark rounded h-full p-1 text-xs leading-130 text-white relative after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-[5px] after:border-transparent after:!border-t-dark before:absolute before:top-full before:left-1/2 before:ml-[-5.5px] before:border-[6.5px] before:border-transparent before:!border-t-dark"
      :class="tooltipStyles"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  withTrigger?: boolean
  show?: boolean
  tooltipStyles?: string
}
defineProps<Props>()
</script>
