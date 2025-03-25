<template>
  <CommonLIghtBoxModal :show="show" class="relative">
    <div class="thumb-example">
      <div class="relative mx-auto">
        <div
          class="slide-prev absolute-y-center left-0 z-50 w-8 h-8 md:w-12 md:h-12 flex-center rounded-full border-2 border-white/30 cursor-pointer bg-blue-600 md:bg-transparent hover:bg-blue-600 hover:border-transparent transition-200 xl:!translate-x-[100px] 2xl:!translate-x-[400px]"
        >
          <i
            class="icon-arrow-left text-white text-base md:text-xl pointer-events-none"
          ></i>
        </div>
        <div
          class="slide-next absolute-y-center right-0 z-50 w-8 h-8 md:w-12 md:h-12 flex-center rounded-full border-2 border-white/30 cursor-pointer bg-blue-600 md:bg-transparent hover:bg-blue-600 hover:border-transparent transition-200 xl:!-translate-x-[100px] 2xl:!-translate-x-[400px]"
        >
          <i
            class="icon-arrow-right text-white text-base md:text-xl pointer-events-none"
          ></i>
        </div>
        <swiper
          class="swiper"
          :loop="true"
          :navigation="{
            nextEl: '.slide-next',
            prevEl: '.slide-prev',
          }"
          :modules="modules"
          v-bind="thumbBreakpoints"
          :slides-per-view="1"
        >
          <swiper-slide
            v-for="(item, index) in content"
            :key="index"
            class="h-full max-h-[90vh] object-cover my-auto"
          >
            <div class="slide mx-auto max-w-[953px] w-full">
              <img
                class="object-cover w-full"
                :src="item?.photo ? item?.photo : item?.image"
                alt="image"
                @click="show = true"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </CommonLIghtBoxModal>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import SwiperClass, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

import { IPhotoReportsLightBox } from '~/types/photo-reports'

interface Props {
  content: IPhotoReportsLightBox[]
  active?: number
}
const props = defineProps<Props>()
const thumbsSwiper = ref<SwiperClass>()

const modules = [Navigation]

const thumbBreakpoints = computed(() => {
  return {
    initialSlide: props.active,
  }
})
const show = ref(true)
</script>

<style scoped>
@media (max-width: 1250px) {
  .slide-prev {
    transform: translate(0) !important;
  }
  .slide-next {
    transform: translate(0) !important;
  }
}
.slide-prev {
  transform: translateY(-20px) !important;
}
.slide-next {
  transform: translateY(-20px) !important;
}
</style>
