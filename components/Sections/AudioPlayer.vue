<template>
  <div
    class="relative player-bg-img h-[520px] lg:h-[298px]"
    :style="`backgroundImage: url(${audioStore.podcastImg})`"
  >
    <div class="player-bg absolute left-0 top-0 h-full w-full">
      <div class="container flex flex-col items-center lg:flex-row gap-8 py-8">
        <img
          :src="audioStore.podcastImg"
          alt=""
          class="h-[234px] w-[234px] rounded border border-white"
        />
        <div class="flex-1 flex flex-col justify-between">
          <h1
            class="text-32 font-semibold text-white leading-140 text-center lg:text-left"
          >
            {{ audioTitle }}
          </h1>
          <div>
            <ul
              class="mt-12 flex items-center justify-center lg:justify-start gap-4"
            >
              <CommonPlayerControllers />
            </ul>
            <div class="mt-6 flex items-center">
              <img
                v-if="!audioStore.icon"
                class="cursor-pointer w-8 h-8"
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
              <span class="text-white text-[13px] uppercase ml-2 mr-3">
                {{ audioStore.getCurrentTime }}
              </span>

              <input
                id="default-range"
                ref="seekSlider"
                type="range"
                :value="audioStore.getSeekSliderValue"
                min="1"
                max="100"
                class="w-[90%] h-1 rounded-sm appearance-none cursor-pointer transition-300"
                @input="onUpdate"
              />
              <span class="text-white text-[13px] uppercase ml-3 mr-6">
                {{ audioStore.getTotalDuration }}
              </span>
              <span
                v-if="audioStore.volume < 5"
                class="icon-volume-3 text-32 text-white w-10 mr-2"
              ></span>
              <span
                v-else
                class="icon-volume text-white text-32 mr-2 w-10 cursor-pointer"
                @click="audioStore.mute()"
              ></span>
              <input
                ref="volume"
                type="range"
                min="1"
                max="100"
                :value="audioStore.getVolume"
                class="w-[30%] lg:w-[10%] h-1 rounded-sm appearance-none cursor-pointer volum"
                @input="onInputVolume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authorsData } from '~/data/fakeData'
import { useAudioStore } from '~/store/audio'

interface Props {
  audioTitle: string
}

defineProps<Props>()
const seekSlider = ref({} as HTMLInputElement)
const volume = ref(null)
const audioStore = useAudioStore()
const coverImage = ref(null)

const bgImage = computed(() => audioStore.podcastImg)
const onUpdate = (e: Event) => {
  audioStore.onInputSeekSlider(e)
}

const onInputVolume = (e: Event) => {
  audioStore.onInputVolume(e)
}

onMounted(() => {
  const bg = computed(() => audioStore.getProgress)
  const volumeBg = computed(() => audioStore.getVolumeColor)
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
.player-bg-img {
  background-repeat: no-repeat;
  background-size: cover;
}

.player-bg {
  background: rgba(27, 27, 27, 0.7);
  backdrop-filter: blur(12.5px);
}

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
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #52618f;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  opacity: 0;
  transition: 0.2s all ease;
}

input[type='range'].volum::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
}

input[type='range']:hover::-webkit-slider-thumb {
  visibility: visible;
  opacity: 1;
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
</style>
