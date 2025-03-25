<template>
  <div class="bg-blue-700 py-6 md:pt-10 md:pb-12">
    <div class="container">
      <CommonSectionWrapper
        :title="$t('special_reports')"
        :all-link="'/reports/special'"
        :all-title="$t('all')"
        dark-title
        class="mb-5 md:mb-4 flex md:hidden"
        is-centered
      />
      <CommonSectionWrapper
        :title="$t('special_reports')"
        :all-link="'/reports/special'"
        :all-title="$t('all')"
        dark-title
        class="mb-5 md:mb-4 hidden md:flex"
      >
        <template #actions>
          <div class="flex items-center gap-1">
            <button
              class="button-report-prev w-7 h-7 rounded-full border border-solid border-blue-100/30 flex-center hover:border-blue-100 transition-200"
            >
              <i class="icon-arrow-left text-blue-100" />
            </button>
            <button
              class="button-report-next w-7 h-7 rounded-full border border-solid border-blue-100/30 flex-center hover:border-blue-100 transition-200"
            >
              <i class="icon-arrow-right text-blue-100" />
            </button>
          </div>
        </template>
      </CommonSectionWrapper>
    </div>
    <div class="hidden md:block">
      <Swiper v-bind="settings">
        <SwiperSlide
          v-for="(item, idx) in data"
          :key="idx"
          class="py-4 !w-[521px] h-[180px]"
        >
          <CardsSpecialReports :data="item" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="container">
      <div class="flex flex-col items-center gap-4 md:hidden">
        <CardsSpecialReports
          v-for="(item, idx) in data.slice(0, 3)"
          :key="idx"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 44,
  loop: true,
  navigation: {
    prevEl: '.button-report-prev',
    nextEl: '.button-report-next',
  },
  modules: [Navigation],
}

interface Props {
  data: object
}
defineProps<Props>()
</script>
