<template>
  <div class="container">
    <div class="lg:grid items-start grid-cols-12 gap-8">
      <div class="col-span-8">
        <SectionsMainSwiper v-bind="{ newsData, loading }" />
        <div class="z-30 relative mt-8 flex flex-col gap-3 lg:gap-6">
          <template v-if="loading">
            <div class="grid lg:grid-cols-2 gap-3 lg:gap-8">
              <BlockNewsSmallPreloader v-for="item in 2" :key="item" />
            </div>
          </template>
          <template v-else>
            <div class="grid lg:grid-cols-2 gap-3 lg:gap-8">
              <CardsNewsSmall
                v-for="(card, cardIndex) in newsData.slice(0, 2)"
                v-bind="{ card }"
                :key="cardIndex"
              />
            </div>
          </template>
          <div
            class="w-full h-[0.5px] bg-white-200 dark:bg-blue-200/20 transition-200 hidden lg:block"
          />
          <div v-if="loading" class="grid lg:grid-cols-2 gap-3 lg:gap-8">
            <BlockNewsSmallPreloader v-for="(item, index) in 2" :key="index" />
          </div>
          <div v-else>
            <div class="grid lg:grid-cols-2 gap-3 lg:gap-8">
              <CardsNewsSmall
                v-for="(card, index) in newsData.slice(2, 4)"
                v-bind="{ card }"
                :key="index"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-4 bg-white-100 dark:bg-blue-100/[16%] transition-200 rounded-lg mt-6 lg:mt-0"
      >
        <SectionsSidebarNews v-bind="{ discussionList, popularList }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INewsList } from '~/types'
import { IDiscussionList } from '~/types/news'

interface Props {
  newsData: INewsList
  discussionList: IDiscussionList
  popularList: INewsList
  loading: boolean
}

defineProps<Props>()
</script>
