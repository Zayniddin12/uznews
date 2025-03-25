<template>
  <div
    class="fixed left-0 bottom-0 player-bg-img sm:h-[88px] h-[60px] z-50 w-full"
    :style="`backgroundImage: url(${audioStore.podcastImg})`"
  >
    <div class="player-bg absolute left-0 top-0 h-full w-full">
      <div class="flex items-center container h-full gap-5">
        <CommonPlayerControllers class="hidden md:flex" />
        <div class="flex items-center gap-3 max-w-[824px] w-full">
          <img
            v-if="!audioStore.icon"
            class="cursor-pointer w-4 h-4 lg:w-8 lg:h-8"
            src="/podcast/play-btn.svg"
            alt=""
            @click="audioStore.playAudio()"
          />
          <svg
            v-else
            class="w-10 h-8 fill-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            @click="audioStore.pauseAudio()"
          >
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
          <span class="text-white text-[13px] leading-120">
            {{ audioStore.getCurrentTime }}
          </span>
          <input
            ref="seekSlider"
            type="range"
            :value="audioStore.getSeekSliderValue"
            min="1"
            max="100"
            class="h-1 w-full rounded-sm appearance-none cursor-pointer transition-300"
            @input="onInput"
            @change="onChange"
          />
          <span class="text-white text-[13px] leading-120">
            {{ audioStore.getTotalDuration }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span class="icon-volume text-white text-2xl lg:text-32"></span>
          <input
            id="default-range"
            ref="volume"
            type="range"
            :value="audioStore.getVolume"
            min="1"
            max="100"
            class="h-1 w-full volume rounded-sm appearance-none cursor-pointer transition-300"
            @input="onInputVolume"
          />
        </div>
        <button
          class="icon-close transition-200 hover:text-red-100 text-white text-3xl"
          @click="audioStore.destroyAudio()"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '~/store/audio'

const audioStore = useAudioStore()
const seekSlider = ref(null)
const volume = ref(null)
const route = useRoute()

const onInput = (e: Event) => {
  audioStore.onInputSeekSlider(e)
}

const onChange = (e: Event) => {
  // audioStore.onChangeSeekSlider(e)
}

const onInputVolume = (e: Event) => {
  audioStore.onInputVolume(e)
}

onMounted(() => {
  const bg = computed(() => audioStore.progress)
  const volumeBg = computed(() => audioStore.volumeColor)
  watch(
    bg,
    () => {
      seekSlider.value.style.background = bg.value
    },
    { immediate: true }
  )

  watch(
    volumeBg,
    () => {
      volume.value.style.background = volumeBg.value
    },
    { immediate: true }
  )
})
</script>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  background: #e6e6e6;
}

/* Thumb: webkit */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  visibility: hidden;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #52618f;
  border: 2px solid #fff;
  cursor: pointer;
  opacity: 0;
  transition: 0.2s all ease;
}

input[type='range']:hover::-webkit-slider-thumb {
  visibility: visible;
  opacity: 1;
}

input[type='range'].volume::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
}

input[type='range'].volum::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
}

/* Thumb: Firefox */
input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #52618f;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.player-bg {
  background: rgba(27, 27, 27, 0.7);
  backdrop-filter: blur(12.5px);
}

.player-bg-img {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
