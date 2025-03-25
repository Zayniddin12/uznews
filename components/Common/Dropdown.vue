<template>
  <div class="relative min-w-fit inline-block" @focusout="onClickAway">
    <button
      class="custom-hover text-sm flex-y-center group rounded-lg transition-all duration-150 hover:text-gray-200 !text-dark w-full"
      :class="buttonClass"
      @click="onClick"
    >
      <slot name="head" />
    </button>
    <transition name="dropdown">
      <ul
        v-if="dropDownActive"
        class="rounded-md mt-2 shadow-[0_4px_36px_rgba(56,56,56,0.16)] border dark:border-0 dark:bg-blue-800 border-[#E0DCDE] right-0 w-full h-auto absolute !z-[10] flex flex-col cursor-pointer bg-dark-500"
        :class="[listStyle, above ? 'bottom-[60px]' : 'top-7']"
        @click="onClickAway"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  title?: string
  listStyle?: string
  buttonClass?: string | [string]
  above?: boolean
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  listStyle: 'bg-white rounded-lg top-[100%]',
  buttonClass: '',
})

const emit = defineEmits(['change', 'clickAway'])
const dropDownActive = ref(false)

const onClick = () => {
  dropDownActive.value = !dropDownActive.value
  emit('change', dropDownActive.value)
}

function onClickAway() {
  dropDownActive.value = false
  emit('clickAway', dropDownActive.value)
}

watch(
  () => props.active,
  () => {
    if (!props.active) {
      dropDownActive.value = false
    }
  }
)
</script>

<style>
.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
