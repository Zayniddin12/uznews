<template>
  <label
    class="flex items-center gap-1 text-blue-700 dark:text-blue-100 text-sm leading-130 font-medium"
    :class="labelClass"
    :for="forText"
  >
    <input :id="forText" type="checkbox" :name="forText" />
    {{ $t(label) }}
  </label>
</template>
<script setup lang="ts">
interface Props {
  label: string
  labelClass?: string
  forText?: string
}
defineProps<Props>()
</script>

<style scoped>
input[type='checkbox'] {
  position: relative;
  border: 2px solid #d1d2d5;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  line-height: 0;
  margin: 0 0.6em 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;
  height: 24px;
  width: 24px;
  -webkit-appearance: none;
  opacity: 0.5;
}

input[type='checkbox']:hover {
  opacity: 1;
}

input[type='checkbox']:checked {
  border-color: #52618f;
  background-color: #52618f;
  opacity: 1;
}

input[type='checkbox']:before {
  content: '';
  position: absolute;
  right: 50%;
  top: 50%;
  width: 6px;
  height: 14px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  margin: -1px -1px 0 -1px;
  transform: rotate(45deg) translate(-50%, -50%);
  z-index: 2;
}
</style>
