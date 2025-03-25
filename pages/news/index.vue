<template>
  <div>
    <CommonBreadcrumb :menu="breadCrumbLinks" />
    <div class="container pb-8 md:pb-16">
      <CommonPageWrapper class="mt-8" :title="$t('all_news')">
        <div class="flex items-center justify-between gap-3 flex-wrap mt-4">
          <div class="flex items-center gap-3 overflow-auto flex-wrap">
            <CommonCategoryButton
              v-for="(item, idx) in categories"
              :key="idx"
              :text="item.title"
              :item="item.slug"
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
        <div v-if="loading" class="flex flex-col gap-6 mt-8">
          <BlockLoaderSpecialReports v-for="item in 5" :key="item" />
        </div>
        <div v-else class="flex flex-col gap-6 mt-8">
          <template v-if="list?.length">
            <CardsPopularCard
              v-for="(item, i) in list"
              :key="i"
              :news="item"
              link="news"
            />
          </template>
          <div v-else class="flex-center py-8 md:py-16">
            <div class="text-center flex flex-col items-center">
              <img src="/svg/no-data.svg" alt="no-data" class="mb-4" />
              <p class="font-bold text-xl leading-136 text-blue-700">
                {{ $t('result_not_found') }}
              </p>
              <p class="text-sm leading-136 text-blue-600 md:max-w-[398px]">
                {{ $t('not_found_detail') }}
              </p>
            </div>
          </div>
        </div>

        <CommonButton
          v-if="!loading && newsStore.hasNext"
          :loading="isLoading"
          class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 my-6 md:my-8 dark:text-white"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >

        <template #aside>
          <TempAdvetisimentBanner />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'
import { getSevenDaysBeforeToday } from '~/utils'

const newsStore = useNewsStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

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
const filter = ref(route.query?.filter || 'for_a_whole_time')

const list = computed(() => newsStore.newsList)
const loading = computed(() => newsStore.loading)
const categories = computed(() => [
  { title: t('all'), slug: undefined, id: 0 },
  ...newsStore.newsCategoryList,
])

const newsParams = ref({
  ...newsStore.params,
  category: computed(() =>
    route.query.category ? '' + route.query.category : undefined
  ),
  published_at_before: undefined,
  published_at_after: undefined,
  sort: 'week',
})

const breadCrumbLinks = computed(() => [
  { title: t('all_news'), link: '/news' },
])

const isLoading = ref(false)
function updateQueries(name: string, value: string) {
  const queries = {
    ...route.query,
    [name]: value,
  }
  router.replace({ query: queries })
}

watch(
  () => route.query.category,
  (val) => {
    newsParams.value.offset = 0
    newsStore.fetchNewsList(newsParams.value, true, true)
  }
)

watch(
  () => filter.value,
  (val) => {
    filterMaintainer()
    newsStore.fetchNewsList(newsParams.value, true, true)
    // fetchData(true, true)
    updateQueries('filter', val)
  },
  {
    deep: true,
  }
)

function filterMaintainer() {
  if (filter.value == 'for_a_week') {
    newsParams.value.published_at_after = getSevenDaysBeforeToday()
    newsParams.value.published_at_before = dayjs(new Date()).format(
      'YYYY-MM-DD'
    )
  } else {
    newsParams.value.published_at_after = undefined
    newsParams.value.published_at_before = undefined
  }
}
const loadMore = async () => {
  try {
    isLoading.value = true
    newsParams.value.offset += 5
    await newsStore.fetchNewsList(newsParams.value, true)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

useAsyncData(async () => {
  await newsStore.fetchNewsCategoryList()
})

newsStore.fetchNewsList(newsParams.value, false)

// function fetchData(force?: boolean, filter?: boolean) {
//   filterMaintainer()
// newsParams.value.fetcher?.(newsParams.value, force, filter)
// }

// fetchData()
</script>
