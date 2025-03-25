<template>
  <div
    class="border border-blue-200/20 dark:border-blue-200/20 bg-white dark:bg-dark-200 rounded-lg relative overflow-hidden"
  >
    <div class="sticky top-0 left-0 w-full h-[120px] bg-blue-200">
      <img
        v-if="author?.background_image"
        :src="author?.background_image"
        alt=""
        class="w-full h-full object-cover"
      />
      <img
        v-else
        src="/svg/uznews-cover-light.png"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-3 md:p-8 sm:pt-5">
      <div
        class="flex items-start justify-between flex-col sm:flex-row gap-3"
        :class="author?.bio ? 'mb-4 md:mb-7' : ''"
      >
        <div class="flex items-start flex-col sm:flex-row gap-4 sm:gap-7">
          <div
            class="w-[100px] sm:w-[140px] h-[100px] sm:h-[140px] rounded-full border-2 border-blue-100 overflow-hidden -mt-[42px] relative z-10"
          >
            <img
              :src="author?.avatar"
              :alt="author?.full_name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              class="text-base sm:text-xl font-semibold leading-140 text-blue-700 dark:text-white mb-0.5"
            >
              {{ author?.full_name }}
            </p>
            <p
              class="text-xs sm:text-sm leading-140 text-blue-200 dark:text-gray-100 mb-3 sm:mb-4"
            >
              {{ author?.position }}
            </p>
            <CommonSocials
              :author="singleAuthor"
              class="flex items-center gap-2"
            />
          </div>
        </div>
        <div class="flex items-start gap-6">
          <div v-if="author?.readers_count" class="flex flex-col items-center">
            <p
              class="text-xl sm:text-2xl font-bold text-blue-700 dark:text-white"
            >
              {{ author?.readers_count }}
            </p>
            <p
              class="text-xs leading-140 text-blue-200 dark:text-gray-100 lowercase"
            >
              {{ $t('reading') }}
            </p>
          </div>
          <div v-if="articleDetail.length" class="flex flex-col items-center">
            <p
              class="text-xl sm:text-2xl font-bold text-blue-700 dark:text-white"
            >
              {{ articleDetail.length }}
            </p>
            <p
              class="text-xs leading-140 text-blue-200 lowercase dark:text-gray-100"
            >
              {{ $t('articles') }}
            </p>
          </div>
        </div>
      </div>
      <p class="text-sm text-blue-600 dark:text-white leading-140">
        {{ author?.bio }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#app'
import { useAuthorsStore } from '~/store/authors'
import { IArticleAuthorsDetail } from '~/types/articleAuthors'
import { IAuthorSingle } from '~/types/author'

const authorStore = useAuthorsStore()
const {
  params: { id },
} = useRoute()
const authors = computed(() => authorStore.authors)
const singleAuthor = computed(() =>
  authors.value.find((el: any) => el.id === +id)
)

interface Props {
  author: IAuthorSingle
  articleDetail: IArticleAuthorsDetail
}

defineProps<Props>()
</script>
