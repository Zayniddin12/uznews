<template>
  <NuxtLink
    :to="'/interview/' + coverData?.slug"
    class="w-full h-[345px] md:h-[472px] relative rounded overflow-hidden inline-block"
  >
    <Transition name="fade" mode="out-in">
      <img
        v-if="!isPlaying"
        :src="coverData?.cover_image_optional"
        alt=""
        class="w-full h-full object-cover absolute z-10"
      />
    </Transition>
    <div
      class="cover-content w-full h-full absolute left-0 top-0 flex items-start justify-end flex-col p-6 z-20"
    >
      <p class="mb-2 md:mb-3 text-white text-sm leading-140">
        {{
          dayjs(coverData?.published_at)
            .locale(locale)
            .format('DD MMM YYYY, HH:mm')
        }}
      </p>
      <p
        class="mb-3 md:mb-5 text-white text-lg sm:text-xl md:text-2xl leading-136 font-medium line-clamp-1"
      >
        {{ coverData?.title }}
      </p>
      <div
        v-if="coverData?.views_count"
        class="flex items-center gap-2 text-white"
      >
        <i class="icon-eye"></i>
        <p class="text-sm font-medium">
          {{ formatNumberWithSpaces(coverData?.views_count) }}
        </p>
      </div>
    </div>
    <div
      class="absolute-center z-40"
      @mouseenter="isPlaying = true"
      @mouseleave="isPlaying = false"
    >
      <div class="pulse">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59661 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
    <client-only>
      <iframe
        width="100%"
        height="100%"
        :src="`https://www.youtube.com/embed/${toEmbed(
          coverData?.video_url
        )}?autoplay=1&mute=1&controls=0`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="absolute inset-0 z-0"
      ></iframe>
    </client-only>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { formatNumberWithSpaces, toEmbed } from '~/utils'

const { locale } = useI18n()

const isPlaying = ref(false)

interface TCover {
  id: number
  slug: string
  title: string
  views_count: number
  cover_image_optional: string
  with_whom: string
  published_at: string
  video_duration: number
  video_url: string
}
interface Props {
  coverData?: TCover
}

defineProps<Props>()
</script>

<style scoped>
.cover-content {
  background: linear-gradient(
    180deg,
    rgba(57, 68, 102, 0) 0%,
    rgba(28, 34, 52, 0.72) 70.19%
  );
}

.pulse {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.28);
  animation: pulse-kefe91md 3s infinite linear;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.pulse:before,
.pulse:after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
  animation: inherit;
  animation-delay: -0.5s;
}

.pulse:after {
  animation-delay: -1s;
}

@keyframes pulse-kefe91md {
  100% {
    box-shadow: 0 0 0 44.8px #0000;
  }
}
</style>
