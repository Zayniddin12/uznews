<template>
  <div
    class="p-5 relative bg-white-700 dark:bg-dark-200 w-full group rounded-lg cursor-pointer hover:bg-[#a2bcde33] transition-200 dark:hover:bg-blue-600"
  >
    <NuxtLink
      :to="`/authors/${author?.id}`"
      class="flex justify-between flex-wrap"
    >
      <div class="flex items-center gap-5">
        <div class="w-[92px] h-[92px]">
          <img :src="author?.avatar" class="rounded-full" alt="" />
        </div>

        <div class="flex flex-col justify-center">
          <h2
            class="text-xl font-semibold leading-140 text-blue-700 dark:text-white dark:group-hover:text-blue-100 transition-200"
          >
            {{ author?.full_name }}
          </h2>
          <p class="text-sm leading-140 text-blue-200 dark:text-gray-100">
            {{ author?.position }}
          </p>
        </div>
      </div>
      <CommonSocials
        v-bind="{ author }"
        class="mt-5 sm:mt-0 sm:absolute top-5 right-5 flex items-center gap-2"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { IAuthor } from '~/types/author'

interface Props {
  author: IAuthor
}

defineProps<Props>()
</script>

<style scoped lang="ts"></style>
