<template>
  <div class="container">
    <CommonSectionWrapper
      :title="slug ? $t('read_more') : $t('parsing')"
      all-link="/analysis"
      :is-centered="!slug"
    />
    <div v-if="loading" class="grid grid-cols-4 sm:gap-x-8 gap-y-6 gap-8 mt-6">
      <BlockAnalysisShimmer
        v-for="(blockItem, blockIndex) in 4"
        :key="blockIndex"
      />
    </div>
    <div class="grid grid-cols-12 sm:gap-x-8 gap-y-6 md:gap-8 mt-6">
      <CardsAnalise
        v-for="(discussion, discussionId) in discussionData.slice(0,4)"
        :key="discussionId"
        :item="discussion"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useRoute } from '#app'
import CardsAnalise from '~/components/Cards/Аnalise.vue'
import { IDiscussionData } from '~/types'

const {
  params: { slug },
} = useRoute()

interface Props {
  discussionData?: IDiscussionData[]
  loading?: boolean
}

defineProps<Props>()

const settings = {
  slidesPerView: 4,
  spaceBetween: 32,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  modules: [Autoplay],
}
</script>
