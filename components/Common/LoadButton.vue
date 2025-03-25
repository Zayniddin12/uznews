<template>
  <button
    v-bind="{ disabled, type }"
    class="text-blue-600 dark:text-blue-100 text-base font-medium leading-125 bg-blue-200/10 hover:bg-blue-200/30 flex gap-[10px] w-full inline-block transition-200 rounded px-5 py-3 flex-center cursor-pointer relative group outline-none"
    :style="{ '--spinnerColor': spinnerColor }"
    :class="[{ 'pointer-events-none w-full': loading }]"
    @click="onClick"
  >
    <i
      class="s-transition absolute-center-h absolute-center-v"
      :class="[loading ? 'opacity-100 visible' : 'opacity-0 invisible w-0']"
    >
      <svg
        class="loading-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :opacity="[loading ? 1 : 0.2]"
          d="M11.9999 3.14746C16.8856 3.14746 20.8524 7.11425 20.8524 11.9999C20.8524 16.8856 16.8856 20.8524 11.9999 20.8524C7.11425 20.8524 3.14746 16.8856 3.14746 11.9999C3.14746 7.11425 7.11425 3.14746 11.9999 3.14746Z"
          :stroke="[loading ? '#ffffff' : '#111325']"
          stroke-width="3"
        />
        <path
          d="M11.2458 20.8191C9.38896 20.6622 7.56653 19.9205 6.07624 18.5787C3.60297 16.3517 2.67826 13.0422 3.37337 10.0106"
          stroke="#1A1A1A"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </i>
    <slot v-if="!loading">
      <i
        class="icon-double text-xl rotate-90 text-blue-200 dark:text-blue-100"
      ></i>
      <span class="s-transition">
        {{ text }}
      </span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  spinnerColor?: string
  loading?: boolean
  type?: string
}

// ******* PROPS *******
const props = withDefaults(defineProps<Props>(), {
  text: 'Button',
  type: 'button',
  spinnerColor: 'white',
  loading: false,
})

// ******* EMITS *******
interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

const onClick = () => {
  emit('click')
}
</script>

<style>
.s-button:active:not(:disabled) {
  transform: scale(0.9);
}

.s-button .circular-loader {
  width: 24px;
  height: 24px;
  stroke: var(--spinnerColor);
}

/* .s-button .circular-loader__path */
.loading-icon {
  /* fill: none;
  stroke-width: 5px;
  stroke-linecap: round; */
  animation: animate-stroke 1s linear infinite;
}

@keyframes animate-stroke {
  0% {
    /* stroke-dasharray: 1, 200;
     stroke-dashoffset: 0; */
    transform: rotate(0deg);
  }
  /*50% {
  stroke-dasharray: 89, 200;
  stroke-dashoffset: -35;
}*/
  100% {
    /* stroke-dasharray: 89, 200;
    stroke-dashoffset: -124; */
    transform: rotate(360deg);
  }
}

/*Primary*/
.s-button-primary {
  @apply text-blue-600 bg-blue-200/10 hover:bg-blue-200/30 flex gap-[10px];
}
</style>
