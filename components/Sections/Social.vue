<template>
  <div class="container">
    <div class="rounded bg-[#F8FAFC] dark:bg-blue-600 transition-200 pt-6 pb-8">
      <SectionWrapper
        :title="$t('we_social')"
        :all-title="$t('we_social')"
        is-centered
      />

      <div
        class="max-w-[960px] mx-auto grid grid-cols-2 md:grid-cols-4 px-4 gap-x-6 gap-y-6 md:gap-y-10 mt-5 md:mt-11"
      >
        <CommonSocial
          v-for="(item, index) in mediaList"
          :key="index"
          v-bind="{ item }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionWrapper from '~/components/Common/SectionWrapper.vue'
import { IMediaList } from '~/types'

interface Props {
  mediaList: IMediaList[]
}
defineProps<Props>()
</script>
