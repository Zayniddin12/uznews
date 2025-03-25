<template>
  <header class="sticky top-0 left-0 w-full z-40">
    <div class="relative z-30 !shadow-ml">
      <CollapseTransition easing="linear" dimension="height">
        <div v-if="!windowIsScrolled" class="hidden lg:block transition-200">
          <LayoutHeaderActions />
        </div>
      </CollapseTransition>
      <div class="transition-200 bg-white dark:bg-blue-600">
        <!--        <LayoutHeaderMain class="hidden lg:block" />-->
        <LayoutHeaderNavigation @handle-show-menu="showMenu" />
      </div>
      <CollapseTransition
        v-if="false"
        :duration="300"
        easing="linear"
        dimension="height"
      >
        <div v-if="!windowIsScrolled">
          <LayoutHeaderBreakingNews />
        </div>
      </CollapseTransition>
    </div>
    <Transition name="fade-bottom" mode="in-out">
      <LayoutHeaderMenu v-if="menuTrigger" />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useWindowScroll } from '@vueuse/core'

import { useAuthStore } from '~/store/auth'

const menuTrigger = ref(false)
const route = useRoute()
const authStore = useAuthStore()

const showMenu = () => {
  menuTrigger.value = !menuTrigger.value
}

watch(
  () => route.path,
  () => {
    menuTrigger.value = false
  },
  { deep: true }
)

watch(
  () => menuTrigger?.value,
  (value) => {
    const body = document.body
    if (value) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }
)

const scroll = useWindowScroll()
const scrollTop = scroll.y
const windowIsScrolled = ref(false)
//
watch(
  () => scrollTop.value,
  (value) => {
    if (value > 300) {
      windowIsScrolled.value = true
    }
    if (value < 150) {
      windowIsScrolled.value = false
    }
  }
)
</script>
