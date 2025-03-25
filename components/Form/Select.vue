<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-white-100 dark:bg-blue-800 rounded px-3 py-2.5 cursor-pointer flex items-center justify-between"
      :class="selectedOptionStyles"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <div
          v-if="!value"
          class="text-blue-700 dark:text-white font-medium text-sm leading-130"
        >
          {{ placeholder }}
        </div>
        <div
          v-else
          class="text-dark dark:text-white text-sm font-medium leading-130 capitalize"
        >
          {{ $t(value[labelKey]) || value }}
        </div>
        <slot name="chevron">
          <span
            class="icon-chevron-right rotate-90 transition-all text-sm duration-200 inline-block text-blue-150 dark:text-white"
            :class="{ '!-rotate-[90deg]': showOptions }"
          ></span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-white dark:bg-blue-700 border border-gray-100 dark:border-blue-100/10 rounded z-10 translate-y-3 max-h-[240px] overflow-y-auto"
      >
        <slot name="options">
          <div
            v-if="search"
            class="p-2 sticky w-full bg-white dark:bg-blue-700 top-0"
          >
            <CommonSelectSearch @handle-update-search="handleUpdateSearch" />
          </div>
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in options"
              :key="idx"
              :class="{ 'bg-blue-600/10': isActive(option) }"
              class="transition-all overflow-scroll scrollbar-none duration-200 hover:bg-gray-300/30 dark:hover:bg-white/10 cursor-pointer"
              @click="onSelect(option)"
            >
              <div
                class="border-b border-gray-300 dark:border-blue-100/20 ml-4 w-full h-full py-2.5"
                :class="isDefault ? 'border-b-0' : ''"
              >
                <slot name="option" :option="option" :index="idx">
                  <Highlighter
                    class="dark:text-white text-sm leading-140 capitalize"
                    :class="
                      isDefault
                        ? 'text-blue-700 font-medium'
                        : 'text-blue-600 font-semibold'
                    "
                    highlight-class-name="bg-[#FFCD55] dark:bg-[#DBAD48]  dark:text-white  rounded"
                    :search-words="[searchOption ?? '']"
                    :text-to-highlight="option[labelKey]"
                  />
                </slot>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            <img
              src="/images/select-no-data.svg"
              alt=""
              class="mx-auto mb-2 pointer-events-none"
            />
            <p class="text-[13px] font-bold leading-136">
              {{ $t('result_not_found') }}
            </p>
            <p class="text-xs leading-136">{{ $t('try_again_text') }}</p>
          </div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'
import Highlighter from 'vue-highlight-words'

const searchOption = ref('')

type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue?: TOption
  options: TOption[]
  labelKey: string
  valueKey: string
  selectedOptionStyles?: string
  placeholder?: string
  infiniteScroll?: boolean
  search?: boolean
  isDefault?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select an option',
  search: false,
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
  (e: 'on-select', option: Props['options']): void
  (e: 'handle-search', value: string): void
}>()
const handleUpdateSearch = (value: string) => {
  searchOption.value = value
  emit('handle-search', value)
}

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  return props.options.find(
    (o) =>
      o === option ||
      o[props.valueKey] === option ||
      o[props.labelKey] === option
  )
}

const value = ref(findOption(props.modelValue))
function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey] || option)
  emit('on-select', option)
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))

function isActive(option: TOption) {
  return (
    option === value.value ||
    value.value?.id === option?.id ||
    option?.id === value.value
  )
}
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  }
)

watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (val) => {
    value.value = findOption(props.modelValue)
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
