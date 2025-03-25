<template>
  <div class="bg-gray-800 dark:bg-blue-700">
    <div class="container">
      <CommonSectionWrapper
        :title="$t('articles_author')"
        :all-link="'/article-authors'"
      />
      <div class="flex flex-col md:grid grid-cols-12 gap-4 md:gap-6 mt-6">
        <CardsAuthor
          v-for="(card, index) in authorsData.slice(0, 5)"
          :key="index"
          v-bind="{ card }"
          class="col-span-4"
          :is-half="index === 0 || index === 1"
          :class="{ 'col-span-6': index === 0 || index === 1 }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAuthorsData, ISocials } from '~/types'
import { IAuthorCard } from '~/types/author'

interface Props {
  authorsData?: IAuthorsData[]
  authorsList?: IAuthorCard[]
  mediaList?: ISocials[]
}

defineProps<Props>()
</script>
