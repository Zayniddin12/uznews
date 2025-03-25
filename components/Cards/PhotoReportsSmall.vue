<template>
  <div class="relative w-full aspect-video">
    <ClientOnly>
      <Swiper
        v-if="card?.length > 0"
        v-bind="settings"
        :autoplay="auto"
        class="w-full h-full rounded relative z-10"
      >
        <SwiperSlide
          v-for="(item, index) in card"
          :key="index"
          class="w-full h-full aspect-video rounded"
          :class="main ? 'w-40' : 'w-full'"
        >
          <nuxt-link :to="`/reports/photo/${item?.slug}`">
            <img
              :src="item.cover_image"
              :alt="item?.title"
              class="aspect-video object-cover rounded absolute w-full h-full photo-report-overlay"
            />
            <div
              class="absolute inset-0 w-full h-full photo-report-overlay pt-4 px-4 pb-5 !rounded z-20 flex flex-col pointer-events-none"
              :class="
                small ? 'justify-between items-end' : 'justify-end items-start'
              "
            >
              <div
                class="text-xs text-white font-bold px-[10px] py-[6px] bg-blue-700/40 rounded mb-3"
                :class="small ? 'hidden' : 'block'"
              >
                {{ index + 1 }}/{{ item?.images.length }}
              </div>
              <div
                class="text-lg text-white font-bold px-3 py-2.5 bg-blue-700/40 rounded mb-3 leading-130"
                :class="small ? 'flex' : 'hidden'"
              >
                {{ item?.images.length }}
                <p v-if="item?.images.length > 1">+</p>
              </div>
              <p class="text-white text-base font-medium leading-6">
                {{ item?.title }}
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
