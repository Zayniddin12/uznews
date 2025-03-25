<template>
  <div class="relative w-full aspect-video">
    <!--    paginations-->
    <div
      v-if="$route?.path == '/'"
      class="absolute hidden md:flex justify-center top-2/4 translate-y-2/4 z-[2] swiper-cursor w-[100%]"
    >
      <div class="relative flex-y-center !justify-between w-[100%]">
        <button
          class="main-button-prev bg-black/[20%] w-7 h-7 rounded flex-center transition-200 hover:bg-black/[60%] active:scale-90 absolute left-3"
        >
          <i class="icon-arrow-left text-white" />
        </button>
        <button
          class="main-button-next bg-black/[20%] w-7 h-7 rounded flex-center transition-200 hover:bg-black/[60%] active:scale-90 absolute right-3"
        >
          <i class="icon-arrow-right text-white" />
        </button>
      </div>
    </div>
    <!--    paginations-->
    <ClientOnly>
      <Swiper
        v-if="card?.images.length > 0"
        v-bind="settings"
        :autoplay="auto"
        class="w-full h-full rounded relative z-10"
      >
        <SwiperSlide
          v-for="(item, index) in card?.images"
          :key="index"
          class="w-full h-full rounded"
          :class="main ? 'w-40' : 'w-full'"
        >
          <nuxt-link :to="`/reports/photo/${card?.slug}`">
            <img
              :src="item.image"
              :alt="card?.title"
              class="aspect-video object-cover rounded absolute w-full h-full photo-report-overlay"
            />
            <div
              class="absolute w-full h-full photo-report-overlay pt-4 px-4 pb-5 !rounded z-20 flex flex-col pointer-events-none"
              :class="small ? 'justify-between ' : 'justify-end items-start'"
            >
              <div
                v-if="card?.images.length > 1"
                class="text-xs text-white font-bold px-[10px] py-[6px] bg-blue-700/40 rounded mb-3"
                :class="small ? 'hidden' : 'block'"
              >
                {{ index + 1 }}/{{ card?.images.length }}
              </div>
              <div
                v-if="card?.images.length > 1"
                class="text-lg text-white font-bold px-3 py-2.5 bg-blue-700/40 rounded mb-3 leading-130"
                :class="small ? 'flex ml-auto' : 'hidden'"
              >
                {{ card?.images.length }}
                <p v-if="card?.images.length > 1">+</p>
              </div>
              <div v-else></div>

              <p
                class="text-white text-left text-base font-medium leading-6 line-clamp-2"
              >
                {{ card?.title }}
              </p>
            </div>
          </nuxt-link>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/effect-cards'

import { Autoplay, EffectCards, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { IPhotoReports } from '~/types/photo-reports'

interface Props {
  card: IPhotoReports
  auto: {
    delay: number
    disableOnInteraction: boolean
    reverseDirection: boolean
  }
  main?: boolean
  small?: boolean
}
defineProps<Props>()

const settings = {
  grabCursor: true,
  spaceBetween: 24,
  loop: true,
  effect: 'cards',
  direction: 'vertical',
  cardsEffect: {
    perSlideOffset: 8, // Space between cards in px
    perSlideRotate: 0, // Rotation of cards in degrees
    shadow: 0,
  },
  center: true,
  navigation: {
    prevEl: '.main-button-prev',
    nextEl: '.main-button-next',
  },
  modules: [Autoplay, EffectCards, Navigation],
  breakpoints: {
    '640': {
      center: true,
    },
  },
}
</script>
<style>
.photo-report-overlay {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(25, 31, 46, 0.06) 55.73%,
    rgba(25, 31, 46, 0.8) 100%
  );
}
</style>
