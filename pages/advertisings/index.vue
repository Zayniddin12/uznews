<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumbRoutes" class="mb-8" />
    <div class="max-w-[784px] px-4 mx-auto mb-10 md:mb-16">
      <h2 class="page-title mt-12 md:mt-[84px]">{{ $t('advertisings') }}</h2>
      <CardsAds
        v-for="(item, index) in ads"
        :key="index"
        :data="item"
        :count="ads?.length"
        class="min-h-[180px]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { ads } from '~/data'

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  { title: t('advertisings'), link: '/advertisings' },
])
</script>
