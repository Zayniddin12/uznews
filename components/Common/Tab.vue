<template>
  <div
    class="main-tab relative bg-white/12 flex w-max transition-200 border-b border-solid border-gray-300 dark:border-gray-300/10"
  >
    <div
      :class="activeClass"
      class="absolute h-px bg-blue-200 w-full -bottom-px transition-200 dark:bg-white"
      :style="{ width: `${active.width}`, left: `${active.left}px` }"
    ></div>
    <button
      v-for="(tab, idx) in list"
      :id="`item_${tab.value}`"
      :key="idx"
      :class="[
        itemClass,
        modelValue === tab.value
          ? 'text-blue-200 dark:text-white'
          : 'text-gray dark:text-blue-100',
      ]"
      class="tabs pt-4 pb-[18px] transition-200 w-full text-lg font-medium z-10 hover:text-blue-200 dark:hover:text-white tabs"
      @click="pick(tab.value, $event)"
    >
      {{ $t(tab.label) }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ITabItem } from '~/types'

interface Props {
  modelValue?: string | number
  list: ITabItem[]
  itemClass?: string
  activeClass?: string
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}
const $emit = defineEmits<Emits>()

const active = ref({ left: 0, width: '0px' })
const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e.target as HTMLButtonElement
  active.value = {
    left: target?.offsetLeft,
    width: target?.offsetWidth + 'px',
  }
  $emit('update:modelValue', tab)
}

watch(
  () => props.modelValue,
  () => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    active.value.width = 100 + '%'
    active.value.left = 0

    setTimeout(() => {
      pick(props.modelValue, { target: item })
    }, 300)
  }
)

onMounted(() => {
  const item = document.getElementById(
    `item_${props.modelValue}`
  ) as HTMLButtonElement
  setTimeout(() => {
    pick(props.modelValue, { target: item })
  }, 10)
})
</script>
