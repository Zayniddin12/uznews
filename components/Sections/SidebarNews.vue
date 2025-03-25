<template>
  <div class="w-full">
    <CommonTab v-model="active" class="!w-full" :list="tabs" />

    <Transition name="fade" mode="out-in">
      <div :key="active" class="mt-4">
        <CommonNewsBlock
          v-if="active === 'popular'"
          :list="popularList"
          link="news"
          :button-text="$t('all_popular')"
        />
        <CommonNewsBlock
          v-if="active === 'discussed'"
          :list="discussionList"
          link="analysis"
          :button-text="$t('latest_news')"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { INewsList } from '~/types'
import { IDiscussionList } from '~/types/news'

const active = ref('popular')
const { t } = useI18n()
const loading = ref(true)

const tabs = computed(() => [
  {
    label: 'popular',
    value: 'popular',
  },
  {
    label: 'latest',
    value: 'discussed',
  },
])

interface Props {
  discussionList: IDiscussionList
  popularList: INewsList
}
defineProps<Props>()
</script>
