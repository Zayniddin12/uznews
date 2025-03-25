<template>
  <div class="container">
    <CommonSectionWrapper :title="$t('interview')">
      <template #actions>
        <CommonTags
          v-bind="{ loading, tags: interviewTags, link: 'interview' }"
        />
      </template>
    </CommonSectionWrapper>

    <div class="grid grid-cols-12 gap-5 md:gap-x-8 md:gap-y-6 mt-7">
      <CardsInterview
        v-for="(item, index) in interviewData"
        :key="index"
        :data="item"
        class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { interviewTags } from '~/data'
import { IInterview } from '~/types'

interface Props {
  interviewData?: IInterview[]
}

defineProps<Props>()
const loading = ref(true)
</script>
