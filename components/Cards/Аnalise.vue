<template>
  <NuxtLink
    :to="`/analysis/${item.slug}`"
    class="relative flex flex-col justify-between h-[362px] w-full lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 rounded overflow-hidden hover:-translate-y-2 hover:cursor-pointer transition-200 hover:shadow-m"
  >
    <img
      :src="item?.cover_image"
      :alt="item?.title"
      class="absolute inset-0 w-full h-full rounded object-cover z-0"
    />
    <span class="absolute !bg-blue-700/60 inset-0 w-full h-full z-1"></span>
    <article class="flex flex-col justify-between h-full p-5 z-10">
      <h4
        class="font-semibold text-white pb-3 text-center uppercase border-white/20 border-b-2 text-xs"
      >
        {{ item?.category?.title }}
      </h4>
      <p
        v-if="item?.title"
        class="text-xl text-white font-semibold line-clamp-3 md:line-clamp-4"
      >
        {{ item?.title }}
      </p>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import { IDiscussionData } from '~/types'

interface Props {
  item: IDiscussionData
}

defineProps<Props>()
</script>
