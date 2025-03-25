<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" />
    <div class="mt-8">
      <CommonSinglePageWrapper :single="singleData"> </CommonSinglePageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { singleData } from '~/data/fakeData'

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  { title: t('popular_head'), link: '/popular-news' },
  { title: singleData.title, link: '/popular-news' },
])
// useSeoMeta({
//   title: 'My Amazing Site',
//   ogTitle: 'My Amazing Site',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
// })
</script>
