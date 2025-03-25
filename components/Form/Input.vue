<template>
  <div
    class="relative items-center bg-white-100 transition-200 rounded overflow-hidden w-full px-4 py-[11px] group border border-blue-100 lg:border-transparent focus-within:border-blue-100 dark:focus-within:border-blue-200 dark:focus-within:!bg-blue-700 focus-within:hover:bg-white flex dark:bg-blue-800 lg:bg-white lg:!bg-blue-100/10 !dark:bg-blue-100/[16%] lg:hover:!bg-blue-200/20 lg:inline-flex"
    :class="[{ '!border-red': error }]"
  >
    <span :class="[prefixClass]" class="flex-center">
      <slot name="prefix" />
    </span>
    <input
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
        id,
      }"
      ref="Input"
      :value="modelValue"
      :class="[inputClass]"
      class="w-full font-normal leading-16 text-base sm:text-sm placeholder:text-sm placeholder:font-medium bg-transparent flex-grow outline-none text-blue-200 dark:!text-white dark:placeholder:text-blue-100/50 placeholder:text-blue-200/50"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    />

    <span :class="[suffixClass]" class="flex-center">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface Props {
  type?: string
  placeholder?: string
  modelValue?: number | string
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: string
  id?: string
  readonly?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
  placeholder: '',
  prefixClass: '',
  suffixClass: '',
  id: '',
})

const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
