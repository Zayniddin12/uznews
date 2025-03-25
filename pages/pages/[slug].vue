<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" class="mb-8" />
    <BlockLoaderStaticPage v-if="!staticPageSingle?.id" />
    <div v-else class="max-w-[784px] px-4 mx-auto mb-10 md:mb-16">
      <h2 class="page-title mt-8">
        {{ staticPageSingle.title }}
      </h2>
      <p
        class="text-base text-blue-600 dark:text-white md:text-lg pt-5"
        v-html="staticPageSingle.content"
      ></p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'

const { t } = useI18n()
const route = useRoute()
const homeStore = useHomeStore()
homeStore.fetchStaticPageSingle(route.params?.slug.toString())
const staticPageSingle = computed(() => homeStore.staticPageSingle)

const breadcrumbRoutes = computed(() => [
  { title: staticPageSingle.value?.title, link: '/materials' },
])

useSeoMeta({
  title: () => staticPageSingle.value?.title,
  ogTitle: () => staticPageSingle.value?.title,
  description: () => staticPageSingle.value?.content,
  ogDescription: () => staticPageSingle.value?.content,
})
</script>
