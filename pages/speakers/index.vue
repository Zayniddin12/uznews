<template>
  <div>
    <CommonBreadcrumb :menu="menu" />
    <div class="container pb-16">
      <CommonPageWrapper
        :title="$t('column')"
        :text="$t('column_text')"
        class="mt-8"
      >
        <div v-if="loading" class="grid grid-cols-3 gap-8">
          <BlockColumnShimmer v-for="item in 6" :key="item" />
        </div>
        <template v-else>
          <ClientOnly>
            <div class="mb-5 md:mb-6">
              <div
                v-if="speakers?.length"
                class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <CardsColumn
                  v-for="(item, index) in speakers"
                  :key="index"
                  :data="item"
                  class="min-h-[250px]"
                />
              </div>
              <CommonNoData v-else />
            </div>
          </ClientOnly>
        </template>
        <CommonButton
          v-if="!loading && speakers.length < count"
          :loading="loadMoreBtnLoading"
          class="w-full text-blue-600 !bg-[#52618f1a] font-medium leading-125 mt-8 dark:text-white"
          @click="loadMore"
        >
          <span class="icon-double rotate-90 mr-[10px] text-xl"></span>
          {{ $t('load_more') }}</CommonButton
        >
        <template #aside>
          <img src="https://picsum.photos/200/400" class="w-full" alt="" />
        </template>
      </CommonPageWrapper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSpeakersStore } from '~/store/speakers'

const { t } = useI18n()
const speakersStore = useSpeakersStore()

const menu = computed(() => [{ title: t('column'), link: '/column' }])
const params = reactive({
  offset: 0,
  limit: 12,
})

const speakers = computed(() => speakersStore.speakers)
const count = computed(() => speakersStore.count)
const loading = computed(() => speakersStore.loading)
const loadMoreBtnLoading = ref(false)

const loadMore = async () => {
  if (count.value > speakers.value?.length) {
    loadMoreBtnLoading.value = true
    params.offset += 12
    await speakersStore.fetchSpeakers(params)
    loadMoreBtnLoading.value = false
  }
}

speakersStore.fetchSpeakers(params)

useSeoMeta({
  title: t('column'),
  ogTitle: t('column'),
  description: t('column_text'),
  ogDescription: t('column_text'),
})
</script>
