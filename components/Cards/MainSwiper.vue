<template>
  <NuxtLink
    :to="`/news/${card?.slug}`"
    class="w-full aspect-video lg:h-[466px] rounded-lg relative overflow-hidden group block"
  >
    <div class="content-image relative w-full h-full">
      <img
        :src="card?.cover_image"
        alt="news"
        class="w-full h-full object-cover"
      />
      <div
        class="linear-bg-news absolute w-full h-full inset-0 transition-200"
      />
    </div>
    <div class="absolute w-full h-full inset-0 z-[1] flex items-end">
      <div class="p-3 sm:p-6 content">
        <p
          class="text-xs sm:text-sm leading-5 text-white font-normal content__first"
        >
          {{
            dayjs(card?.published_at)
              .locale(locale)
              .format('DD MMM YYYY, HH:mm')
          }}
        </p>
        <div class="content__second">
          <p
            class="text-white text-sm sm:text-2xl leading-136 font-bold mt-2 sm:mt-4 mb-3 sm:mb-7 transition-200 group-hover:text-blue-100 line-clamp-2"
          >
            {{ card?.title }}
          </p>
        </div>
        <div v-if="card.views_count" class="flex-y-center gap-1 content__third">
          <i class="icon-eye text-lg text-white" />
          <p class="text-xs leading-14 text-white font-medium">
            {{ formatNumberWithSpaces(card?.views_count) }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { INewsList } from '~/types'
import { formatNumberWithSpaces } from '~/utils'

const { locale } = useI18n()
interface Props {
  card?: INewsList
}

defineProps<Props>()
</script>
<style>
.content > * {
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.4s ease;
}
.swiper-slide-active .content > * {
  opacity: 1;
  transform: translateY(0);
}
.content-image {
  opacity: 0;
  transition: all 0.4s ease;
}
.swiper-slide-active .content-image {
  opacity: 1;
  transition-delay: 0.4s;
}
.swiper-slide-active .content > .content__first {
  transition-delay: 0.5s;
}
.swiper-slide-active .content > .content__second {
  transition-delay: 0.6s;
}
.swiper-slide-active .content > .content__third {
  transition-delay: 0.7s;
}
</style>
<style scoped>
.linear-bg-news {
  background: linear-gradient(
    180deg,
    rgba(57, 68, 102, 0) 0%,
    rgba(28, 34, 52, 0.92) 70.19%
  );
}

.linear-bg-news-blue {
  background: linear-gradient(
    180deg,
    rgba(82, 97, 143, 0) 0%,
    rgba(82, 97, 143, 0.92) 70.19%
  );
}
</style>
