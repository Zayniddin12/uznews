<template>
  <div class="flex items-center gap-4">
    <button
      class="btn"
      :class="
        audioStore.normalSpeed ? 'icon-multiplier-1x' : 'icon-multiplier-2x'
      "
      @click="audioStore.makeFaster()"
    ></button>
    <button class="btn icon-time-back" @click="audioStore.backward()"></button>
    <button
      class="btn icon-time-forvard"
      @click="audioStore.forward()"
    ></button>

    <button v-if="audioStore.isDownloading" class="btn h-12">
      <div class="spinner"></div>
    </button>
    <button
      v-else
      class="btn icon-download-stroke"
      @click="audioStore.downloadAudio()"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '~/store/audio'

const audioStore = useAudioStore()
</script>

<style scoped>
.btn {
  @apply p-2 rounded-md text-white bg-[#0000004d] text-2xl cursor-pointer transition duration-200 ease-out sm:hover:text-opacity-50;
}

.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #babbe2 94%, #0000) top/3.8px 3.8px
      no-repeat,
    conic-gradient(#0000 30%, #babbe2);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 3.8px),
    #000 0
  );
  animation: spinner-c7wet2 0.8s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
