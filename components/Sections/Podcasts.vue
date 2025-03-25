<template>
  <div class="container">
    <CommonSectionWrapper :title="$t('podcasts')">
      <template #actions>
        <CommonTags v-bind="{ loading, tags: podcastTags, link: 'podcasts' }" />
      </template>
    </CommonSectionWrapper>
    <div class="grid grid-cols-12 sm:gap-x-8 gap-y-6 mt-7">
      <client-only>
        <CardsPodcast
          v-for="(item, index) in podcasts"
          :key="index"
          :data="item"
          class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
        />
      </client-only>
    </div>
  </div>
</template>
<script setup lang="ts">
import { podcastTags } from '~/data'
import { IPodcast } from '~/types/podcast'

const loading = ref(true)

interface Props {
  podcasts: IPodcast[]
}

defineProps<Props>()

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
