<template>
  <div>
    <div v-if="loading">
      <BlockPreloader
        :loading="loading"
        width="100%"
        height="466px"
        preloader-class="!rounded-lg"
      />
    </div>

    <div v-else>
      <div class="relative">
        <div class="absolute hidden md:block top-6 right-6 z-[2]">
          <div class="flex-y-center gap-2">
            <button
              class="main-button-prev bg-blue-200/[24%] w-7 h-7 rounded flex-center transition-200 hover:bg-blue-200/100 active:scale-90"
            >
              <i class="icon-arrow-left text-white" />
            </button>
            <button
              class="main-button-next bg-blue-200/[24%] w-7 h-7 rounded flex-center transition-200 hover:bg-blue-200/100 active:scale-90"
            >
              <i class="icon-arrow-right text-white" />
            </button>
          </div>
        </div>
        <Swiper
          v-if="newsData?.length"
          v-bind="settings"
          @swiper="onInit"
          @active-index-change="sliderChange"
        >
          <div
            class="absolute top-0 left-0 w-full h-full bg-white-100 dark:bg-blue-100/[16%] rounded-lg"
          />

          <SwiperSlide
            v-for="(card, index) in newsData?.slice(0, 3)"
            :key="index"
          >
            <CardsMainSwiper v-bind="{ card }" />
          </SwiperSlide>
        </Swiper>
        <div class="flex-y-center gap-1 absolute z-[2] bottom-6 right-6">
          <div
            v-for="(pagination, index) in newsData?.slice(0, 3)"
            :key="index"
            class="h-0.5 bg-blue-100/20 w-6 md:w-16 rounded-lg relative overflow-hidden"
          >
            <div
              class="bg-blue-100 h-0.5 w-0"
              :class="{ 'animation-fill': index === activeIndex }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/effect-fade'

import { Autoplay, EffectFade, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { INewsList } from '~/types'

interface Props {
  newsData: INewsList
  loading: boolean
}

defineProps<Props>()

const activeIndex = ref(0)

const settings = {
  grabCursor: true,
  spaceBetween: 16,
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: '.main-button-prev',
    nextEl: '.main-button-next',
  },
  modules: [Navigation, Autoplay, EffectFade],
}

const imageSlider = ref()

function sliderChange(e: any) {
  activeIndex.value = e?.realIndex
}

function onInit(swiper: any) {
  imageSlider.value = swiper
}
</script>

<style scoped>
.animation-fill {
  animation: fill 4s linear forwards;
}

@keyframes fill {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
