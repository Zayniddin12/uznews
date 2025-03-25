<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex items-end justify-between w-full" :class="labelWrapper">
      <FormLabel v-bind="{ forText, label }" />
      <p
        v-if="isRightLabel"
        class="text-green duration-300 hover:text-green-200 text-[15px] leading-[17px] font-normal cursor-pointer"
        @click="emit('rightLabelEvent')"
      >
        {{ rightLabel }}
      </p>
      <slot name="labelOpposite" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'rightLabelEvent'): void
}>()

interface Props {
  label: string
  isRightLabel?: boolean
  rightLabel?: boolean
  tooltip?: boolean
  tooltipText?: string
  forText?: string
  labelWrapper?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  rightLabel: false,
})
</script>
