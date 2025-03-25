<template>
  <div class="container pb-16">
    <CommonPageWrapper :title="`#${route.query?.hash}`" class="mt-8">
      <div class="flex flex-wrap items-center gap-3 mt-3">
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
      <div v-if="loading" class="flex flex-col gap-6 mt-8">
        <BlockLoaderSpecialReports v-for="item in 5" :key="item" />
      </div>
      <template v-else>
        <Transition name="fade" mode="out-in">
          <div :key="activeSection">
            <div
              v-if="list?.length"
              class="flex flex-col gap-4 md:gap-6 my-5 md:my-8"
            >
              <CardsPopularCard
                v-for="(item, i) in list"
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
        v-if="!loading && list?.length < count"
        :loading="buttons[activeSection].btnLoading"
        class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mb-8 dark:text-white"
        @click="loadMore"
      >
        <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
        {{ $t('load_more') }}</CommonButton
      >
      <Transition name="fade">
        <div v-if="loading" class="flex-center py-10">
          <div class="dots" />
        </div>
      </Transition>
      <template #aside>
        <img src="https://picsum.photos/200/400" class="w-full" alt="" />
      </template>
    </CommonPageWrapper>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'

const newsStore = useNewsStore()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const target = ref(null)

const list = computed(() => newsStore.newsSearchList)
const count = computed(() => newsStore.newsSearchListCount)
const loading = computed(() => newsStore.searchListLoading)
const activeSection = ref(route.query?.section || 'news')
enum Sections {
  news = 'news',
  articles = 'articles',
  photo = 'photo',
  columns = 'columns',
  specialReports = 'specialReports',
  discussions = 'discussions',
  interview = 'interview',
}

const buttons = reactive({
  [Sections.news]: {
    text: t('news'),
    value: 'news',
    btnLoading: false,
    link: 'news',
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'news',
      // search: undefined,
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.articles]: {
    text: 'Статьи',
    value: 'articles',
    btnLoading: false,
    link: 'article-authors',
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'article',
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.photo]: {
    text: 'Фоторепортажи',
    value: 'photo',
    link: 'reports/photo',
    btnLoading: false,
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'photo_report',
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.specialReports]: {
    text: 'Спецрепортажи',
    value: 'specialReports',
    btnLoading: false,
    link: 'reports/special',
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'special_report',
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.interview]: {
    text: t('interview'),
    value: 'interview',
    btnLoading: false,
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'interview',
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
  [Sections.discussions]: {
    text: 'Разборы',
    value: 'discussions',
    btnLoading: false,
    link: 'analysis',
    params: {
      offset: 0,
      limit: 5,
      hashtags__slug: computed(() => route.query?.hash),
      model_type: 'discussion',
    },
    get isActive() {
      return this.value == activeSection.value
    },
  },
})

function updateQueries(name: string, value: string) {
  const queries = {
    ...route.query,
    [name]: value,
  }
  router.replace({ query: queries })
}

function loadMore() {
  buttons[activeSection.value].btnLoading = true
  buttons[activeSection.value].params.offset += 5
  newsStore.fetchSearchList(buttons[activeSection.value]?.params, true)
  buttons[activeSection.value].btnLoading = false
}
function onClick(value: string) {
  activeSection.value = value
  buttons[activeSection.value].params.offset = 0
  updateQueries('section', value)
  fetchData()
}
function fetchData(filter?: boolean) {
  newsStore.fetchSearchList(buttons[activeSection.value]?.params, filter)
}
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      loadMore()
    }
  }
)

fetchData()
</script>
