<template>
  <NuxtLink
    :to="'/reports/photo/' + card?.slug"
    class="transition-200 bg-white-700 dark:bg-blue-100/[16%] rounded-lg px-4 py-5 relative flex-y-center hover:bg-white-900 dark:hover:bg-blue-100/[16%] group"
  >
    <div class="flex flex-col justify-between h-full grow">
      <h2
        class="transition-200 before:transition-200 line-clamp-3 text-blue-700 dark:text-white text-sm leading-136 font-bold mb-10 group-hover:text-blue-200"
      >
        {{ card?.title }}
      </h2>
      <p
        v-if="card?.image_count > 0"
        class="flex-y-center space-x-1 text-sm transition-200 text-blue-200 dark:text-blue-100 font-medium absolute bottom-4 left-4"
      >
        <i class="icon-gallery text-sm"></i>
        <span>{{ formatNumberWithSpaces(card?.image_count) }}</span>
      </p>
    </div>
    <div
      class="sm:w-[178px] w-[150px] h-[122px] relative ml-3 grow lg:-mr-14 max-w-[180px] sm:min-w-[178px] min-w-[150px] min-h-[107px]"
    >
      <Swiper v-bind="settings" :autoplay="auto">
        <SwiperSlide v-for="(item, index) in card?.images" :key="index">
          <img
            :src="item?.image"
            alt=""
            class="aspect-video object-cover rounded-lg absolute w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </NuxtLink>
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
}
defineProps<Props>()
const settings = {
  grabCursor: true,
  spaceBetween: 16,
  loop: true,
  effect: 'cards',
  direction: 'vertical',
  cardsEffect: {
    perSlideOffset: 12, // Space between cards in px
    perSlideRotate: 0, // Rotation of cards in degrees
    shadow: 0,
  },
  center: true,
  // navigation: {
  //   prevEl: '.main-button-prev',
  //   nextEl: '.main-button-next',
  // },
  modules: [Navigation, Autoplay, EffectCards],
}
</script>
<style scoped>
.swiper-cards {
  width: 100%;
  height: 100%;
}
.swiper-cards .swiper-slide {
  border-radius: 8px;
}
</style>
