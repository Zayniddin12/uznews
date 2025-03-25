<template>
  <div class="hidden lg:flex items-center gap-2">
    <NavigationLink
      v-for="(link, index) of navigations"
      :key="index"
      :link="link"
      :link-settings="menuLinkSettings[Object.keys(menuLinkSettings)[index]]"
    />
  </div>
</template>

<script setup lang="ts">
import { IMenuLinkSettings, INavigation } from '~/types'

interface Props {
  navigations: INavigation[]
  menuLinkSettings: IMenuLinkSettings
}
defineProps<Props>()
</script>
