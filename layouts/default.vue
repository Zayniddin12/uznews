<template>
  <div
    class="dark:bg-blue-700 transition-200 min-h-screen flex flex-col justify-between"
  >
    <div>
      <PushMessage />
      <LayoutHeader ref="header" />

      <div>
        <slot></slot>
      </div>
    </div>
    <LayoutFooter v-if="!($route.path === '/subscribe')" />
    <button
      v-if="windowIsScrolled"
      class="fixed right-8 bottom-8 flex-y-center justify-center text-2xl text-white icon-arrow-left rotate-90 w-12 h-12 transition-200 hover:bg-blue-600 rounded-full bg-blue-100 z-[99]"
    />
    <LayoutLoader />
  </div>
</template>
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const scroll = useWindowScroll()
// const scrollTop = scroll.y
const windowIsScrolled = ref(false)
const header = ref().value
// function scrollToTop() {
//   window.scrollTo(0, 0)
// }

// watch(
//   () => scrollTop,
//   (value) => {
//     windowIsScrolled.value = value.value > 150
//   },
//   { deep: true }
// )

const routes = [{ path: '/subscribe', name: 'Subscribe' }]
</script>
