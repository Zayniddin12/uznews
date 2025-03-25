<template>
  <div>
    <SectionsMiniAudio v-if="!isPodcastPage && audioStore.isPlaying" class="" />

    <NuxtLayout>
      <NuxtLoadingIndicator :duration="3000" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store'
import { useAudioStore } from '~/store/audio'

const router = useRoute()

const { nuxtServerInit } = useHomeStore()

const audioStore = useAudioStore()

const isPodcastPage = computed(
  () => router.fullPath.length > 9 && router.fullPath.includes('/podcasts')
)

useAsyncData(() => nuxtServerInit())
</script>
