<template>
  <div class="pb-16">
    <CommonBreadcrumb :menu="[{ title: $t('articles_author'), link: '/' }]" />
    <div class="container">
      <CommonPageWrapper
        :title="$t('articles_author')"
        :text="$t('article_author_text')"
        class="mt-8"
      >
        <div class="max-w-[274px] mb-8">
          <FormSelect
            v-model="articleParams.author"
            :model-value="articleParams.author"
            :options="[...options]"
            value-key="id"
            label-key="full_name"
            search
            :placeholder="$t('all_authors')"
            infinite-scroll
            @handle-search="(e: string) => search = e"
            @infinite-scroll="onInfiniteScroll"
            @on-select="onSelect"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <CardsDefaultAuthor
            v-for="(card, index) in authorsArticleList"
            :key="index"
            v-bind="{ card }"
            is-default
          />
        </div>
        <div
          v-if="authorsArticleList?.length === 0"
          class="flex-center py-8 md:py-16"
        >
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
        <CommonLoadButton
          v-if="
            !authorsStore.articlesLoading &&
            authorsArticleList?.length < authorsStore.articlesCount
          "
          :loading="authorsStore.articlesLoading"
          :text="$t('load_more')"
          @click="loadMore"
        />
        <template #aside>
          <div v-if="!authorsList?.length">
            <BlockOtherAuthor />
          </div>

          <CommonOtherAuthors
            v-else
            :others="authorsList.slice(0, 5)"
            class="mb-6"
          />
          <TempAdvetisimentBanner />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthorsStore } from '~/store/authors'
import { IAuthor } from '~/types/author'
import { updateQueries } from '~/utils'

const route = useRoute()
const { t } = useI18n()

const authorsStore = useAuthorsStore()
const authorsArticleList = computed(() => authorsStore.articles)
const authorsList = computed(() => authorsStore.authors)
const authorsSearchList = computed(() => authorsStore.authorsSearch)
// const loading = computed(() => authorsStore.articlesLoading)

const optionAll = computed(() => {
  return {
    id: '0',
    full_name: t('all_authors'),
  }
})

const search = ref('')
const articleParams = ref({
  limit: 8,
  offset: 0,
  author:
    route.query?.author?.length && route.query?.author?.length > 0
      ? route.query?.author
      : undefined,
})
const authorParams = ref({
  limit: 5,
  offset: 0,
  search: undefined,
})

const options = computed(() => {
  if (authorParams.value.search) {
    return authorsSearchList.value?.length
      ? [optionAll.value, ...authorsSearchList.value]
      : [...authorsSearchList.value]
  } else {
    return authorsList.value?.length
      ? [optionAll.value, ...authorsList.value]
      : [...authorsList.value]
  }
})

const loadMore = async () => {
  try {
    authorsStore.articlesLoading = true
    authorsStore.params.offset += 8
    await authorsStore.fetchAuthorArticles(authorsStore.params, true)
  } catch (error) {
    console.error(error)
  } finally {
    authorsStore.articlesLoading = false
  }
}

const onInfiniteScroll = () => {
  authorParams.value.offset += 5
  if (authorsList.value.length < authorsStore.authorsCount) {
    authorsStore.fetchAuthorsList(authorParams.value, true)
  }
}

const onSelect = (author: IAuthor) => {
  // if (articleParams.value.author === undefined) {
  //   articleParams.value.author = undefined
  // } else {
  //   articleParams.value.author = author.full_name
  // }
  updateQueries('author', author.id == 0 ? '' : author.full_name)
  // console.log('author: ', author)
  search.value = ''
}

watch(
  () => search.value,
  () => {
    authorParams.value.offset = 0
    authorParams.value.search = search.value
    authorsStore.fetchAuthorsList(authorParams.value, true, true)
  }
)

watch(
  () => route.query,
  () => {
    articleParams.value.author = (route.query?.author as string).replace(
      '+',
      '%20'
    )
    articleParams.value.offset = 0
    authorsStore.fetchAuthorArticles(articleParams.value, true, true)
  },
  {
    deep: true,
  }
)

useAsyncData(async () => {
  await authorsStore.fetchAuthorArticles(articleParams.value, false)
  await authorsStore.fetchAuthorsList(authorParams.value, false)
})
</script>
