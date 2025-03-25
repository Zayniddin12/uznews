<template>
  <div v-if="speakers.length > 0" class="container">
    <CommonSectionWrapper
      :title="slug ? $t('read_more') : $t('column')"
      all-link="/speakers"
      :is-centered="!slug"
    />
    <div v-if="loading" class="grid grid-cols-4 sm:gap-x-8 gap-y-6 mt-7">
      <BlockColumnShimmer v-for="(item, index) in 4" :key="index" />
    </div>
    <div v-else>
      <div class="grid grid-cols-12 sm:gap-x-8 gap-y-6 mt-7">
        <CardsColumn
          v-for="(item, index) in speakers"
          :key="index"
          :data="item"
          class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from '#app'

interface Props {
  speakers: any
  loading?: boolean
}
defineProps<Props>()

const {
  params: { slug },
} = useRoute()
</script>
