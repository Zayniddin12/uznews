<template>
  <div class="px-8 pt-[108px] pb-7 bg-img border border-[#52618f33] rounded-lg">
    <div class="flex items-center justify-between gap-y-2 flex-wrap">
      <div class="flex items-center gap-7">
        <div class="w-[140px] flex-center h-[140px]">
          <img
            :src="author?.avatar"
            class="rounded-full border-2 object-cover border-blue-100 w-full h-full"
            alt=""
          />
        </div>

        <div class="flex flex-col sm:self-end gap-4">
          <div>
            <h2 class="titleXL">{{ author?.full_name }}</h2>
            <span class="textSM">{{ author?.position }}</span>
          </div>

          <CommonSocials
            :author="singleAuthor"
            class="flex items-center gap-2"
          />
        </div>
      </div>

      <div class="flex items-center gap-5">
        <div
          v-if="author?.readers_count"
          class="flex flex-col items-center justify-center"
        >
          <span class="text-2xl font-bold text-blue-700 dark:text-white">
            {{ author?.readers_count }}
          </span>
          <p class="textSM !text-[12px]">{{ $t('reading') }}</p>
        </div>
        <div
          v-if="author?.articles_count"
          class="flex flex-col items-center justify-center"
        >
          <span class="text-2xl font-bold text-blue-700 dark:text-white">
            {{ author?.articles_count }}
          </span>
          <p class="textSM !text-[12px]">{{ $t('articles_detail') }}</p>
        </div>
      </div>
    </div>
    <p class="mt-7 textSM !text-blue-600 dark:!text-white">
      {{ author.bio }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#app'
import { useAuthorsStore } from '~/store/authors'
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
}

defineProps<Props>()
</script>

<style scoped>
.bg-img {
  background-image: url('/images/author/profile-bg.png');
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 100% 140px;
}

.dark .bg-img {
  background-image: url('/images/dark-bg-author.png');
}
</style>
