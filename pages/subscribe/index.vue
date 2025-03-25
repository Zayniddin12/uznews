<template>
  <div class="flex">
    <div class="container relative py-8 md:py-16">
      <div class="text-center flex flex-col items-center">
        <div
          class="w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] flex-center border-[3px] border-blue-100 rounded-[32px] bg-blue-200 p-4 sm:p-6 shadow-qrShadow sm:mb-8 mb-4"
        >
          <img
            src="/svg/qr.svg"
            alt="qr"
            class="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <p
          class="text-blue-600 font-bold leading-130 text-xl sm:text-[32px] mb-2"
        >
          {{ $t('download_app') }}
        </p>
        <p
          class="text-base sm:text-lg leading-130 text-blue-600 sm:max-w-[584px] mb-8"
        >
          {{ $t('scan_qr_code') }}
        </p>
        <div class="flex-y-center gap-4">
          <a
            v-for="(item, index) in stores"
            :key="index"
            :href="item.link"
            target="_blank"
          >
            <img :src="item.img" :alt="item.title" />
          </a>
        </div>
      </div>
      <NuxtLink :to="'/'" class="absolute top-7 right-0">
        <i
          class="icon-close text-[28px] cursor-pointer text-blue-850 hover:text-blue-100 transition-200"
        ></i
      ></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const stores = [
  {
    id: 0,
    title: 'App Store',
    img: '/svg/appstore.svg',
    link: 'https://www.apple.com/ru/app-store/',
  },
  {
    id: 1,
    title: 'Google Play',
    img: '/svg/googleplay.svg',
    link: 'https://play.google.com/store/games?hl=ru&gl=US',
  },
  {
    id: 2,
    title: 'AppGallery',
    img: '/svg/appgallery.svg',
    link: 'https://appgallery.huawei.com/',
  },
]
</script>
