<template>
  <div>
    <CommonBreadcrumb :menu="breadCrumbLinks" />
    <div class="container pb-16">
      <CommonPageWrapper class="mt-8">
        <h1 class="page-title">{{ $t('popular') }}</h1>
        <div class="flex items-center justify-between gap-3 flex-wrap mt-4">
          <div class="flex items-center gap-3 overflow-auto flex-wrap">
            <CommonFilter
              v-for="item in buttons"
              :key="item.value"
              :text="item.text"
              :class="{
                'bg-blue-200 text-white dark:text-blue-600 dark:bg-white':
                  item.isActive,
              }"
              @click="onClick(item.value)"
            />
          </div>
          <FormSelect
            v-model="filter"
            :options="sort"
            label-key="text"
            value-key="value"
            class="shrink-0 min-w-[180px]"
            is-default
          />
        </div>
        <div
          v-if="buttons[activeSection]?.fetchLoading"
          class="flex flex-col gap-6"
        >
          <BlockLoaderSpecialReports v-for="item in 5" :key="item" />
        </div>
        <template v-else>
          <Transition name="fade" mode="out-in">
            <div :key="activeSection">
              <div
                v-if="buttons[activeSection]?.data?.length"
                class="flex flex-col gap-6 md:mt-8 mt-4"
              >
                <CardsPopularCard
                  v-for="(item, i) in buttons[activeSection]?.data"
                  :key="i"
                  :news="item"
                  :link="buttons[activeSection]?.link"
                />
              </div>
              <div v-else class="mt-8 w-full h-full">
                <CommonNoData class="w-full" />
              </div>
            </div>
          </Transition>
        </template>

        <CommonButton
          v-if="
            !buttons[activeSection].fetchLoading &&
            buttons[activeSection].data?.length <
              buttons[activeSection].dataCount
          "
          :loading="buttons[activeSection].btnLoading"
          class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mt-8 dark:text-white mb-6 md:mb-0"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthorsStore } from '~/store/authors'
import { useDiscussionsStore } from '~/store/discussions'
import { useNewsStore } from '~/store/news'
import { usePhotoReportsStore } from '~/store/photoReports'
import { useSpeakersStore } from '~/store/speakers'
import { useSpecialReportsStore } from '~/store/specialReports'
import { getSevenDaysBeforeToday, updateQueries } from '~/utils'

const newsStore = useNewsStore()
const columnsStore = useSpeakersStore()
const specialReportsStore = useSpecialReportsStore()
const photoReportsStore = usePhotoReportsStore()
const authorsStore = useAuthorsStore()
const discussionsStore = useDiscussionsStore()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const filter = ref(route.query?.filter || 'for_a_whole_time')

enum Sections {
  news = 'news',
  articles = 'articles',
  photo = 'photo',
  columns = 'columns',
  specialReports = 'specialReports',
  discussions = 'discussions',
}
const sort = computed(() => [
  {
    id: 1,
    text: t('for_a_week'),
    value: 'for_a_week',
  },
  {
    id: 2,
    text: t('for_a_whole_time'),
    value: 'for_a_whole_time',
  },
])
const list = computed(() => newsStore.news)
const activeSection = ref(route.query?.section || 'news')
const buttons = reactive({
  [Sections.news]: {
    text: 'news',
    value: 'news',
    btnLoading: false,
    link: 'news',
    dataCount: computed(() => newsStore.newsListCount),
    data: computed(() => newsStore.newsList),
    fetchLoading: computed(() => newsStore.loading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: newsStore.fetchNewsList,
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.articles]: {
    text: 'articles',
    value: 'articles',
    btnLoading: false,
    link: 'article-authors',
    dataCount: computed(() => authorsStore.articlesCount),
    data: computed(() => authorsStore.articles),
    fetchLoading: computed(() => authorsStore.articlesLoading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: authorsStore.fetchAuthorArticles,
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.photo]: {
    text: 'photo_reports',
    value: 'photo',
    link: 'reports/photo',
    btnLoading: false,
    dataCount: computed(() => photoReportsStore.count),
    data: computed(() => photoReportsStore.reports),
    fetchLoading: computed(() => photoReportsStore.loading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: photoReportsStore.fetchPhotoReports,
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.specialReports]: {
    text: 'special_reports',
    value: 'specialReports',
    btnLoading: false,
    link: 'reports/special',
    dataCount: computed(() => specialReportsStore.count),
    data: computed(() => specialReportsStore.specialReports),
    fetchLoading: computed(() => specialReportsStore.loading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: specialReportsStore.fetchSpecialReports,
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.columns]: {
    text: 'column',
    value: 'columns',
    btnLoading: false,
    dataCount: computed(() => columnsStore.count),
    data: computed(() => columnsStore.speakers),
    fetchLoading: computed(() => columnsStore.loading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: columnsStore.fetchSpeakers,
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.discussions]: {
    text: 'analyzes',
    value: 'discussions',
    btnLoading: false,
    link: 'analysis',
    dataCount: computed(() => discussionsStore.count),
    data: computed(() => discussionsStore.discussions),
    fetchLoading: computed(() => discussionsStore.loading),
    params: {
      offset: 0,
      limit: 5,
      is_popular: 1,
      published_at_before: undefined,
      published_at_after: undefined,
    },
    fetcher: discussionsStore.fetchDiscussions,
    get isActive() {
      return this.value == activeSection.value
    },
  },
})
const breadCrumbLinks = computed(() => [
  { title: t('popular'), link: '/popular' },
])

watch(
  () => filter.value,
  (val) => {
    buttons[activeSection.value].params.offset = 0
    filterMaintainer()
    fetchData(true, true)
    updateQueries('filter', val)
  }
)

function filterMaintainer() {
  if (filter.value == 'for_a_week') {
    buttons[activeSection.value].params.published_at_after =
      getSevenDaysBeforeToday()
    buttons[activeSection.value].params.published_at_before = dayjs(
      new Date()
    ).format('YYYY-MM-DD')
  } else {
    buttons[activeSection.value].params.published_at_after = undefined
    buttons[activeSection.value].params.published_at_before = undefined
  }
}
function loadMore() {
  buttons[activeSection.value].btnLoading = true
  buttons[activeSection.value].params.offset += 5
  buttons[activeSection.value].fetcher(
    buttons[activeSection.value]?.params,
    true
  )
  buttons[activeSection.value].btnLoading = false
}
function onClick(value: string) {
  activeSection.value = value
  updateQueries('section', value)
  if (buttons[activeSection.value]?.data?.length === 0) {
    fetchData()
  }
}
function fetchData(force?: boolean, filter?: boolean) {
  filterMaintainer()
  buttons[activeSection.value].fetcher?.(
    buttons[activeSection.value]?.params,
    force,
    filter
  )
}
fetchData()
</script>
