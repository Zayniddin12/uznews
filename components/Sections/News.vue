<template>
  <div>
    <div class="container">
      <CommonSectionWrapper :title="$t('news')" all-link="/news" />

      <div
        v-if="loading"
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 md:mt-6"
      >
        <BlockNewsPreloader v-for="item in 8" :key="item" />
      </div>
      <div v-else>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 md:mt-6"
        >
          <CardsNews
            v-for="(card, index) in newsData.slice(0, 8)"
            v-bind="{ card }"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INewsList } from '~/types'

interface Props {
  newsData?: INewsList[]
  loading?: boolean
}

defineProps<Props>()
</script>
