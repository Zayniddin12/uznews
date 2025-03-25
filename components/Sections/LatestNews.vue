<template>
  <div class="container w-full">
    <button
      class="left-0 border border-solid border-blue-100 mb-3 rounded-lg w-full z-[12] px-4 py-2.5 flex lg:hidden justify-between gap-4 transition-200 dark:bg-blue-100/[16%] dark:border-transparent"
      :class="{ 'bg-blue-200 ': isOpen }"
      @click="isOpen = !isOpen"
    >
      <div class="flex-y-center gap-2">
        <i class="icon-bell text-blue-100 text-2xl" />
        <p
          class="text-base leading-130 font-medium text-blue-200 transition-200 dark:text-blue-100"
          :class="{ '!text-blue-100': isOpen }"
        >
          {{ $t('lenta_news') }}
        </p>
      </div>
      <i
        class="icon-double text-blue-100 text-2xl transition-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    <button
      class="absolute top-[268px] left-0 border group border-solid border-blue-100 hover:border-blue-200 dark:hover:border-blue-100 rounded-r-lg z-[12] border-l-[0px] p-4 hidden lg:flex flex-col gap-4 transition-200 bg-white dark:bg-blue-100/[16%] dark:border-transparent"
      :class="{ 'bg-blue-200 ': isOpen, 'animate-slide-left': !isOpen }"
      @click="isOpen = !isOpen"
    >
      <i
        class="icon-bell text-blue-100 text-2xl transition-200 group-hover:text-blue-200 dark:group-hover:text-blue-100"
      />
      <p
        class="text-base leading-130 font-medium text-blue-200 vertical-text transition-200 dark:text-blue-100"
        :class="{ '!text-blue-100': isOpen }"
      >
        {{ $t('lenta_news') }}
      </p>
      <i
        class="icon-double text-blue-100 text-2xl transition-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 top-[170px] lg:top-[282px] z-[12] w-full"
      >
        <div class="container w-full">
          <button
            class="flex-center w-8 md:w-12 h-8 md:h-12 rounded-full bg-blue-900 ml-auto hover:bg-blue-200 transition-200 group active:scale-95"
            @click="isOpen = false"
          >
            <i class="icon-close text-white text-lg md:text-[32px]" />
          </button>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <button
        v-if="isOpen"
        class="flex-center w-12 h-12 bg-[#F0F4FA] dark:bg-opacity-10 hover:hover:bg-blue-200 transition-200 group -rotate-90 rounded-full absolute z-[12] bottom-16 right-8 active:scale-95"
        @click="toTop"
      >
        <i
          class="icon-arrow-right text-blue-100 group-hover:text-white transition-200 text-xl"
        />
      </button>
    </Transition>
    <Transition name="fade">
      <div
        v-if="isOpen"
        id="news-content"
        class="fixed inset-0 bg-white z-[31] h-screen overflow-y-scroll transition-200 pt-16 pb-8 md:pt-[150px] dark:bg-blue-700"
      >
        <div class="w-full max-w-[990px] mx-auto pb-16 px-4 pt-4">
          <template
            v-for="(groupArray, groupArrayIndex) in list"
            :key="groupArrayIndex"
          >
            <template
              v-for="(group, groupIndex) in groupArray"
              :key="groupIndex"
            >
              <div class="flex-center w-full">
                <CommonDate :date="group[0].published_at.substr(0, 10)" />
              </div>
              <ul>
                <li v-for="(item, itemIndex) in group" :key="itemIndex">
                  <div class="w-full flex flex-col gap-8 mt-8">
                    <NuxtLink :to="`/news/${item?.slug}`">
                      <CardsLatest
                        :key="'NCI' + itemIndex"
                        :card="item"
                        class="last:border-b-[0px]"
                      />
                    </NuxtLink>
                  </div>
                  <div v-if="(groupIndex + itemIndex + 1) % 4 === 0">
                    <div v-if="advertising?.length">
                      <CommonAdBanner
                        :image="
                          advertising[
                            Math.abs(advertising.length - itemIndex) %
                              advertising.length
                          ]?.ad?.image
                        "
                        :link="
                          advertising[
                            Math.abs(advertising.length - itemIndex) %
                              advertising.length
                          ]?.ad?.link
                        "
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </template>
          </template>

          <CommonButton v-if="next" class="w-full mt-4" @click="loadMore">
            <span class="icon-double rotate-90 text-xl mr-1"></span>
            {{ counter ? $t('more_news') : $t('fetch_next_month') }}
          </CommonButton>

          <button
            class="fixed close-left top-[268px] right-0 group border border-solid border-transparent hover:border-blue-200 dark:hover:border-blue-100 rounded-l-lg z-[12] border-r-[0px] p-4 hidden lg:flex flex-col gap-4 transition-200 dark:bg-blue-100/[16%] dark:border-transparent"
            :class="{ 'bg-blue-200': isOpen, 'animate-slide-in': isOpen }"
            @click="isOpen = !isOpen"
          >
            <i
              class="icon-bell text-blue-200 text-2xl transition-200 group-hover:text-blue-200 dark:group-hover:text-blue-100"
            />
            <p
              class="text-base leading-130 font-medium text-blue-200 group-hover:text-blue-200 vertical-text transition-200 dark:text-blue-100"
            >
              {{ $t('lenta_close') }}
            </p>
            <i
              class="icon-close text-blue-200 group-hover:text-blue-200 dark:group-hover:text-blue-100 text-2xl transition-200"
              :class="{ 'rotate-180': isOpen }"
            />
          </button>

          <button
            class="absolute top-[110px] right-0 border group border-solid border-blue-100 hover:border-blue-200 dark:hover:border-blue-100 rounded-l-lg z-[12] border-r-[0px] p-4 flex lg:hidden flex-col gap-4 transition-200 bg-white dark:bg-blue-100/[16%] dark:border-transparent"
            :class="{ 'bg-blue-200 ': isOpen }"
            @click="isOpen = !isOpen"
          >
            <i
              class="icon-close text-blue-200 group-hover:text-blue-200 dark:group-hover:text-blue-100 text-2xl transition-200"
              :class="{ 'rotate-180': isOpen }"
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'

import { useAd } from '~/store/ad'
import { IAD } from '~/types/advertisement'

const adStore = useAd()

const isOpen = ref(false)
const loading = ref(false)
const isNotMore = ref(true)
const count = ref(1)
const advertising = ref<IAD[]>([])

const list = ref([])
const offset = ref(0)
const next = ref(null)
const counter = ref(0)
const advertsIndex = ref(0)

function fetchLentalist() {
  useApi()
    .$get('/news/TimelineNewsList/', {
      params: { offset: offset.value, limit: 10 },
    })
    .then((res) => {
      const groupedItems = {}
      res.results.forEach((item) => {
        next.value = res.next
        const publishedDate = item.published_at.substr(0, 10)
        if (!groupedItems[publishedDate]) {
          groupedItems[publishedDate] = []
        }
        groupedItems[publishedDate].push(item)
      })
      list.value.push(Object.values(groupedItems))

      const currentDate = new Date()
      const yesterday = new Date(currentDate)
      yesterday.setDate(currentDate.getDate() - 1)
      yesterday.toISOString().slice(0, 10) === Object.keys(groupedItems).at(0)
        ? counter.value
        : (counter.value += 1)
    })
}

fetchLentalist()

const loadMore = () => {
  offset.value = offset.value + 10

  fetchLentalist()

  setTimeout(() => {
    counter.value = counter.value + 1
  }, 600)
}

adStore.fetchAdvertisement('/common/TimelineAdList').then((res) => {
  advertising.value = res.results
})

watch(
  () => isOpen.value,
  () => {
    const body = document.body
    if (isOpen.value) {
      body.style.overflow = 'auto'
    } else {
      body.style.overflow = 'auto'
    }
  }
)

function toTop() {
  const element = document.querySelector('#news-content') as HTMLDivElement
  element.scroll({ top: 0, behavior: 'smooth' })
}

const target = ref(null)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      loadMore()
    }
  }
)

function nextMonth() {
  loading.value = true
  setTimeout(() => {
    count.value += 1
    // isNextMonth.value = true
    isNotMore.value = false
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.animate-slide-in {
  animation: open-right 0.6s ease;
}

.animate-slide-left {
  animation: open-left 0.6s ease;
}

@keyframes open-left {
  0% {
    left: -100px;
  }
  100% {
    left: 0px;
  }
}

@keyframes open-right {
  0% {
    right: -100px;
  }
  100% {
    right: 0px;
  }
}
.close-left {
  background: rgba(162, 188, 222, 0.16) !important;
}
.close-left:hover {
  background: transparent !important;
}
</style>
