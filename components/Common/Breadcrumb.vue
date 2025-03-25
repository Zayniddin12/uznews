<template>
  <div
    class="py-[9px] pt-[14px] w-full bg-white-100 dark:bg-blue-600 hidden-on-print bg-white-400"
  >
    <div class="container flex items-center gap-2 overflow-hidden">
      <NuxtLink
        to="/"
        class="whitespace-nowrap text-blue-150 hover:text-dark-200 dark:hover:text-white-100 transition-300 leading-140 text-sm font-medium dark:text-blue-100"
      >
        {{ $t('home') }}
      </NuxtLink>

      <div
        v-for="(item, index) in menu"
        :key="index"
        class="flex items-center gap-1 sm:gap-2 group last:pr-1"
      >
        <i class="icon-double text-[12px] text-gray" />
        <NuxtLink
          v-if="item.title"
          :to="`${item?.link}`"
          :class="{
            'pointer-events-none text-gray-200 font-normal !line-clamp-1 dark:text-white whitespace-pre-wrap':
              index === menu?.length - 1,
          }"
          class="transition-200 flex cursor-pointer items-center text-blue-150 dark:text-blue-100 hover:text-dark-200 dark:hover:text-white-100 font-medium text-sm leading-140 hover:!text-purple line-clamp-1 whitespace-nowrap"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  menu: {
    title: string
    link: string
  }[]
}

defineProps<Props>()
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
