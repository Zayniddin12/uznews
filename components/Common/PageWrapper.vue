<template>
  <div class="grid md:grid-cols-12 gap-5 md:gap-8">
    <main class="col-span-12 md:col-span-9">
      <h2 class="page-title">{{ title }}</h2>
      <p
        v-if="text"
        class="text-slate-500 text-sm font-normal leading-[136%] mb-8 transition-200 dark:text-white"
      >
        {{ text }}
      </p>
      <div>
        <slot />
      </div>
    </main>
    <aside class="col-span-12 md:col-span-3">
      <div class="w-full h-full">
        <div v-if="articleAuthors">
          <CommonOtherAuthors :others="otherAuthors" class="mb-6" />
        </div>
        <a :href="advertising.ad2?.link" target="_blank">
          <img :src="advertising.ad2?.image" class="bg-cover" alt="" />
        </a>
        <a :href="advertising.ad1?.link" target="_blank">
          <img :src="advertising.ad1?.image" class="mt-6 bg-cover" alt="" />
        </a>
      </div>
    </aside>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#app'
import { useAuthorsStore } from '~/store/authors'

interface Props {
  title?: string
  text?: string
}
defineProps<Props>()

const advertising = ref({})
const authorStore = useAuthorsStore()
const route = useRoute()
const otherAuthors = computed(() => authorStore.authors)
const articleAuthors = computed(() => route.path === '/article-authors')
const params = { offset: 0, limit: 5, search: undefined }

useAsyncData(async () => {
  await authorStore.fetchAuthorsList(params)
})

useApi()
  .$get('/common/BaseAd')
  .then((res) => {
    advertising.value = res
  })
</script>
