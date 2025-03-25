<template>
  <div class="container pb-16">
    <CommonPageWrapper :title="$t('search_result')" class="mt-8">
      <FormInput
        v-model="search"
        class="transition-200 mt-4 !px-2.5 py-[10px] !absolute w-[86%] sm:w-[90%] md:w-[93%] lg:w-full right-12 z-30 !left-[3px] !top-[2px] transition-all duration-300 lg:!relative lg:!right-0 lg:!left-0 lg:!top-0"
        :placeholder="$t('search')"
        :class="[
          searchTrigger
            ? 'max-w-full opacity-100'
            : 'max-w-0 md:max-w-full opacity-0 lg:opacity-100',
        ]"
        input-class="pl-2 pr-2 mt-0.5 dark:text-white "
        prefix-class="leading-130"
        :focus="searchTrigger"
        @update:model-value="handleUpdateSearch"
        @enter="handleEnter"
      >
        <template #prefix>
          <span
            class="icon-magnifer text-base text-blue-200 dark:text-blue-100"
          />
        </template>
        <template #suffix>
          <button
            :class="{ '!opacity-100 !visible': search?.length }"
            class="text-xl leading-5 icon-close text-gray-200 hover:text-blue-150 dark:hover:text-white transition-200 opacity-0 invisible"
            @click="clear"
          />
        </template>
      </FormInput>
      <div class="flex items-center gap-x-3 flex-wrap">
        <CommonFilter
          v-for="(item, i) in buttons"
          :key="i"
          class="mt-4"
          :text="item.text"
          :class="{
            'bg-blue-200 text-white dark:text-blue-600 dark:bg-white':
              item.isActive,
          }"
          @click="activateModelType(item.model_type)"
        />
      </div>
      <div v-if="loading" class="flex flex-col gap-6 mt-8">
        <BlockLoaderSpecialReports v-for="item in 5" :key="item" />
      </div>
      <template v-else>
        <div>
          <div v-if="results.length" class="grid gap-6 mt-6">
            <CardsPopularCard
              v-for="(item, i) in results"
              :key="i"
              :news="item"
              :link="urlFinder(item?.model_type)"
            />
          </div>
          <CommonNoData v-else class="mt-16" />
        </div>
      </template>
      <div v-if="!loading && count > results.length" ref="target"></div>
      <Transition name="fade">
        <div v-if="preloader" class="flex-center py-10">
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
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'
import { debounce, updateQueries } from '~/utils'

const newsStore = useNewsStore()

const route = useRoute()
const { t } = useI18n()
const search = ref(route.query.query || '')
const searchTrigger = ref(false)

const params = reactive({
  offset: 0,
  limit: 10,
  search: String(route.query?.query) || undefined,
  model_type: route.query?.type || undefined,
})
const results = computed(() => newsStore.newsSearchList)
const loading = computed(() => newsStore.searchListLoading)
const count = computed(() => newsStore.newsSearchListCount)
const activeSection = ref(route.query?.type || 'all')
const target = ref(null)
const preloader = ref(false)
enum Sections {
  news = 'news',
  articles = 'articles',
  photo = 'photo',
  columns = 'columns',
  specialReports = 'specialReports',
  discussions = 'discussions',
  interview = 'interview',
  all = 'all',
}

const buttons = reactive({
  [Sections.all]: {
    text: t('all'),
    value: 'all',
    btnLoading: false,
    link: urlFinder,
    model_type: undefined,
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.news]: {
    text: t('news'),
    value: 'news',
    btnLoading: false,
    link: urlFinder,
    model_type: 'news',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.articles]: {
    text: t('articles'),
    value: 'articles',
    btnLoading: false,
    link: urlFinder,
    model_type: 'article',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.photo]: {
    text: t('photo_reports'),
    value: 'photo',
    link: urlFinder,
    btnLoading: false,
    model_type: 'photo_report',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.specialReports]: {
    text: t('special_reports'),
    value: 'specialReports',
    btnLoading: false,
    link: urlFinder,
    model_type: 'special_report',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.interview]: {
    text: t('interview'),
    value: 'interview',
    btnLoading: false,
    link: urlFinder,
    model_type: 'interview',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
  [Sections.discussions]: {
    text: t('analyzes'),
    value: 'discussions',
    btnLoading: false,
    link: urlFinder,
    model_type: 'discussion',
    get isActive() {
      return this.model_type == activeSection.value
    },
  },
})
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      console.log('intersecting', isIntersecting)
      loadMore()
    }
  }
)
const clear = () => {
  search.value = ''
}
const handleUpdateSearch = (value: string) => {
  search.value = value
}

const handleEnter = () => {}

watch(
  () => search.value,
  (value) => {
    params.search = value || undefined
    params.offset = 0
    if (params.search === 'undefined') {
      params.search = undefined
    }
    updateQueries('query', params.search)
    debounce(
      'search',
      () => {
        newsStore.fetchSearchList(params)
      },
      500
    )
  }
)

function loadMore() {
  if (count.value > results.value.length) {
    preloader.value = true
    params.offset += 10
    newsStore.fetchSearchList(params, true)
    preloader.value = false
  }
}
function urlFinder(model: string) {
  switch (model) {
    case 'discussion':
      return 'analysis'
    case 'podcast':
      return 'podcasts'
    case 'photo_report':
      return 'reports/photo'
    case 'interview':
      return 'interview'
    case 'special_report':
      return 'reports/special'
    case 'article':
      return 'article-authors'
    default:
      return 'news'
  }
}
function activateModelType(type: string) {
  params.model_type = type
  params.offset = 0
  activeSection.value = type
  updateQueries('type', params.model_type)
  newsStore.fetchSearchList(params)
}
if (params.search === 'undefined') {
  params.search = undefined
}
newsStore.fetchSearchList(params)
</script>
