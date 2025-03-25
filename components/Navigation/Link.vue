<template>
  <NuxtLink
    v-if="linkSettings"
    class="flex-y-center py-2 px-4 rounded-lg space-x-2 font-medium cursor-pointer transition-200 group hover:bg-white-100 dark:hover:bg-blue-100/10 navigation-link"
    :to="link?.url"
  >
    <span
      class="text-blue-200 dark:text-blue-100 text-sm transition-200 leading-130"
    >
      {{ $t(link?.title) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { INavigation } from '~/types'

interface Props {
  link: INavigation
  linkSettings?: boolean
}
defineProps<Props>()
</script>

<style>
.navigation-link.router-link-exact-active {
  background: rgba(162, 188, 222, 0.16);
}

.navigation-link.router-link-exact-active span {
  color: #191f2e;
}
.dark .navigation-link.router-link-exact-active span {
  color: #fff;
}
</style>
