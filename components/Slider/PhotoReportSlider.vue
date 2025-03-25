<template>
  <div class="thumb-example">
    <div class="relative h-[260px] sm:h-[320px] md:h-[480px] sm:max-w-full">
      <div
        class="slide-prev absolute-y-center left-3 md:left-5 z-30 w-8 h-8 md:w-12 md:h-12 flex-center rounded-full border-2 border-white/30 cursor-pointer hover:bg-blue-600 hover:border-transparent transition-200"
      >
        <i
          class="icon-arrow-left text-white text-base md:text-xl pointer-events-none"
        ></i>
      </div>
      <div
        class="slide-next absolute-y-center right-3 md:right-5 z-30 w-8 h-8 md:w-12 md:h-12 flex-center rounded-full border-2 border-white/30 cursor-pointer hover:bg-blue-600 hover:border-transparent transition-200"
      >
        <i
          class="icon-arrow-right text-white text-base md:text-xl pointer-events-none"
        ></i>
      </div>

      <swiper
        class="top-swiper"
        :modules="modules"
        :space-between="12"
        :grab-cursor="true"
        :loop="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :navigation="{
          nextEl: '.slide-next',
          prevEl: '.slide-prev',
        }"
      >
        <swiper-slide
          v-for="(item, index) in images"
          :key="index"
          class="slide"
          @click="getImage(index, images)"
        >
          <img
            :src="item.image"
            class="cursor-pointer w-full h-full object-cover"
          />
        </swiper-slide>
      </swiper>
      <div class="linear-bg absolute top-0 left-0 w-full h-full"></div>
    </div>

    <swiper
      v-if="images?.length > 1"
      class="thumbs-swiper"
      :modules="modules"
      :space-between="12"
      :slides-per-view="9"
      :watch-slides-progress="true"
      :grab-cursor="true"
      :prevent-clicks="false"
      :prevent-clicks-propagation="false"
      :breakpoints="thumbBreakpoints"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide
        v-for="(item, index) in images"
        :key="index"
        class="slide relative cursor-pointer"
      >
        <img
          :src="item.image"
          class="absolute top-0 left-0 w-full h-full rounded-md"
        />
        <div
          class="thumbs-bg absolute top-0 left-0 w-full h-full border-2 border-blue-100 rounded"
        ></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import SwiperClass, { Navigation, Pagination, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

import { IPhotoReportsImageListView } from '~/types/photo-reports'

const thumbsSwiper = ref<SwiperClass>()
const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

const modules = [Navigation, Thumbs, Pagination]

const thumbBreakpoints = {
  '320': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '492': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '768': {
    slidesPerView: 9,
    spaceBetween: 12,
  },
}

interface Props {
  images: IPhotoReportsImageListView[]
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleImages', index: number, images: any): void
}>()

const getImage = (i: number, array: any) => {
  emit('handleImages', i, array)
}
</script>

<style scoped>
.thumb-example {
  height: 480px;
  background-color: transparent;
}

@media (max-width: 768px) {
  .thumb-example {
    height: 360px;
  }
}
@media (max-width: 640px) {
  .thumb-example {
    height: 300px;
  }
}

.top-swiper,
.thumbs-swiper .slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.top-swiper {
  height: 100%;
  width: 100%;
}

.thumbs-swiper {
  /*height: 20%;*/
  box-sizing: border-box;
  padding: 18px 0;
}

.thumbs-swiper .slide {
  width: 80px !important;
  height: 48px !important;
  opacity: 1;
  /*border: 2px solid #a2bcde;*/
  border-radius: 4px;
  background-color: rgba(25, 31, 46, 0) !important;
}

.thumbs-swiper .slide:not(.swiper-slide-thumb-active) {
  background-color: rgba(25, 31, 46, 0.28) !important;
}

.thumbs-swiper .slide:not(.swiper-slide-thumb-active) .thumbs-bg {
  border: 2px solid transparent;
}
.linear-bg {
  background: linear-gradient(
    90deg,
    rgba(25, 31, 46, 0.53) 0%,
    rgba(25, 31, 46, 0) 53.13%,
    rgba(25, 31, 46, 0.53) 100%
  );
}
</style>
