<template>
  <NuxtLink
    :to="'/article-authors/' + card?.slug"
    class="rounded-sm flex flex-col relative overflow-hidden bg-white transition-200 group hover:shadow-xl hover:!rounded-lg"
    :class="{
      '!bg-blue-600 hover:!bg-blue-250 !rounded-sm ': isHalf || recommended,
    }"
  >
    <!--!bg-blue-600 hover:!bg-blue-250 !rounded-sm col-span-4 col-span-6-->
    <div>
      <div class="aspect-video">
        <img
          :src="card?.cover_image"
          alt="author-image"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div
      class="p-3 md:p-5 h-full flex flex-col"
      :class="(isHalf ? 'lg:p-6' : 'lg:p-5', { 'min-h-[126px]': recommended })"
    >
      <p
        v-if="card?.actual"
        class="text-blue-200 text-xs leading-tight mb-3"
        :class="{
          '!text-base !text-blue-100': isHalf,
        }"
      >
        {{ $t('actual_comments') }}
      </p>
      <p
        class="text-sm lg:text-base leading-136 font-medium text-blue-700 group-hover:text-blue-200 transition-200 mb-3"
        :class="{
          'md:!text-lg lg:!text-2xl text-white group-hover:text-white mb-5':
            isHalf,
          'text-white group-hover:text-white-200': recommended,
        }"
      >
        {{ card?.title }}
      </p>

      <p
        class="text-xs text-blue-700 leading-130 font-medium mt-auto"
        :class="{
          'md:!text-sm !text-white !mt-2 md:!mt-[53px]': isHalf,
          'text-white group-hover:text-white-200': recommended,
        }"
      >
        {{ card?.author?.full_name }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { IAuthorsData } from '~/types'

interface Props {
  card: IAuthorsData
  isHalf?: boolean
  isDefault?: boolean
  recommended?: boolean
}

defineProps<Props>()
</script>
