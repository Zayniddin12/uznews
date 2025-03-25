<template>
  <div>
    <transition name="fade">
      <div
        v-if="show"
        class="ModalBg fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[1000]"
      />
    </transition>

    <transition name="fade">
      <div
        v-if="show"
        id="ModalBg"
        class="fixed right-0 top-0 w-full h-screen flex items-center justify-center z-[1001] p-[15vh_auto_50px] overflow-auto"
        :class="[bodyClass, animationIn ? 'animated' : '']"
      >
        <div
          id="Modal"
          class="Modal bg-white dark:bg-blue-700 w-full rounded-xl relative"
          :class="[
            maxWidth ? 'max-w-[382px]' : 'max-w-[382px]',
            bodyWrapperClass,
          ]"
        >
          <slot name="header">
            <div
              v-if="title"
              class="flex items-center justify-between py-4 px-5 border-b border-blue-100/20 relative"
              :class="[headerClass, textCenter]"
            >
              <div class="flex-y-center gap-2">
                <slot name="pre-title" />
                <h5
                  class="text-blue-700 dark:text-white text-xl font-bold leading-24"
                  :class="textStyle"
                >
                  {{ title }}
                </h5>
              </div>
              <i
                class="icon-close cursor-pointer text-blue-100 dark:text-white dark:hover:text-white-200 text-2xl hover:text-blue-700 transition-200 ease-in-out"
                @click.stop="close()"
              />
            </div>
          </slot>
          <button
            v-if="!title"
            class="absolute group -top-16 md:top-0 right-0 md:-right-16 cursor-pointer modal-close bg-dark-500 w-10 h-10 rounded-lg flex items-center justify-center"
            @click.stop="close()"
          >
            <i
              class="icon-close text-light text-3xl transition-200 group-hover:text-grey-100"
            />
          </button>
          <div :class="contentClass" class="pt-5 p-6">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  show: boolean
  title?: string
  contentClass?: string
  bodyClass?: string
  maxWidth?: string
  bodyWrapperClass?: string
  closeOnBackdrop?: boolean
  headerClass?: string
  textStyle?: string
  textCenter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  contentClass: '',
  bodyClass: 'px-4',
  closeOnBackdrop: true,
})
watch(
  () => props.show,
  (first) => {
    const body = document.body
    if (first) {
      body.classList.add('!overflow-hidden')
    } else {
      body.classList.remove('!overflow-hidden')
    }
  }
)
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
const animationIn = ref(false)

const onMousedown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  if (target.id !== 'Modal' && target.id === 'ModalBg') {
    animationIn.value = true
    setTimeout(() => {
      animationIn.value = false
    }, 500)
  }
}
const keydown = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    close()
  }
}

onMounted(() => {
  document?.addEventListener('mousedown', onMousedown)
  document?.addEventListener('keydown', keydown)
})
onBeforeUnmount(() => {
  document?.removeEventListener('mousedown', onMousedown)
  document?.removeEventListener('keydown', keydown)
})
</script>
<style>
#Modal {
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 10%);
}
.ModalBg {
  background: rgba(25, 31, 46, 0.8);
}

.modal-close svg circle,
path {
  transition: 0.3s ease-in-out;
}
.modal-close:hover svg circle {
  stroke: #fa0738;
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
