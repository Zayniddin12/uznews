<template>
  <div class="container mt-8">
    <div class="grid grid-cols-12 md:gap-8">
      <main class="col-span-12 md:col-span-9">
        <BlockLoaderSingle v-if="loading" />
        <template v-else>
          <div>
            <h2
              class="text-blue-700 dark:text-white text-2xl md:text-[32px] font-bold leading-130 flex-x-center"
            >
              {{ single?.title }}
              <CommonNewsTooltip
                :is-video="single?.is_video"
                :is-verified="single?.is_verified"
                @click.prevent.stop
              />
            </h2>
            <div
              v-if="single?.published_at"
              class="mt-2 md:mt-4 flex items-center gap-4"
            >
              <span class="text-blue-200 text-sm font-normal leading-tight">
                <i
                  class="icon-calendar-dotted group-odd:text-white/60 group-even:text-gray mr-1"
                ></i>
                {{
                  dayjs(single?.published_at)
                    .locale(locale)
                    .format('DD MMMM, HH:mm')
                }}
              </span>
              <p
                v-if="single?.views_count"
                class="text-blue-200 text-sm font-normal leading-tight flex items-center"
              >
                <i
                  class="icon-eye group-odd:text-white/60 group-even:text-gray mr-1"
                ></i>
                {{ formatNumber(single?.views_count) }}
              </p>
            </div>
            <p
              v-if="single?.subtitle"
              class="text-blue-700 text-lg md:text-2xl font-medium leading-[33px] transition-200 dark:text-white mt-[10px] md:mt-4 mb-4 md:mb-6"
            >
              {{ single?.subtitle }}
            </p>
            <img
              v-if="single?.cover_image"
              :src="single?.cover_image"
              class="w-full max-h-[498px] h-full object-cover rounded my-4 md:my-6"
              alt="image"
            />
            <div v-for="(item, index) in content" :key="index" class="">
              <div
                v-if="item?.content_item_type === 'text'"
                class="images_height max-w-[682px] mx-auto my-4 md:my-6 text-dark-200 whitespace-break-spaces text-base font-normal leading-relaxed transition-200 dark:text-white single-content"
                v-html="item?.text"
              ></div>
              <figure
                v-if="item?.content_item_type === 'photo'"
                class="max-h-[498px] h-full mx-auto my-4 md:my-6"
              >
                <img
                  :src="item?.photo"
                  class="w-full h-full object-cover rounded"
                  alt=""
                />
                <figcaption
                  v-if="item?.photo_author"
                  class="text-neutral-400 text-xs font-normal leading-none mt-2 italic"
                >
                  © Фото: {{ item?.photo_author }}
                </figcaption>
              </figure>
              <NuxtLink
                v-if="item?.content_item_type == 'news'"
                class="bg-white-150 hover:bg-blue-100/20 transition-200 p-4 md:p-6 rounded flex items-center gap-6 relative"
                :to="`/news/${item?.news_content?.slug}`"
              >
                <img
                  :src="item?.news_content?.cover_image"
                  alt="cover-image"
                  class="w-[96px] h-[96px] rounded object-cover"
                />
                <p
                  class="text-lg md:text-xl font-semibold leading-136 text-blue-700"
                >
                  {{ item?.news_content?.title }}
                </p>
                <i
                  class="icon-share text-xl text-blue-100 absolute top-6 right-6"
                ></i>
              </NuxtLink>
              <div
                v-if="item?.content_item_type === 'quote'"
                class="mx-auto my-4 md:my-6 bg-blue-100/20 p-4 md:p-6 rounded flex items-center flex-col md:flex-row gap-6 relative"
              >
                <img
                  :src="item?.quote_photo"
                  :alt="item?.quote"
                  class="w-[162px] h-[162px] rounded-full object-cover"
                />
                <div>
                  <p
                    class="text-base md:text-xl leading-150 text-blue-600 mb-3 text-justify"
                  >
                    {{ item?.quote }}
                  </p>
                  <p
                    class="text-base md:text-xl leading-150 text-blue-700 font-medium"
                  >
                    - {{ item?.quote_author }}
                  </p>
                </div>
                <img
                  src="/svg/quote-icon.svg"
                  alt="quote"
                  class="absolute right-6 top-6"
                />
              </div>
              <client-only>
                <div v-if="item?.content_item_type == 'video'" class="relative">
                  <iframe
                    width="100%"
                    height="456px"
                    :src="
                      item?.video_type === 'upload'
                        ? item?.video_file
                        : `https://www.youtube.com/embed/${toEmbed(
                            item?.video_link
                          )}`
                    "
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    class="h-[245px] sm:h-[345px] md:h-[456px] my-4 md:my-6"
                  ></iframe>
                  hello
                </div>
              </client-only>
            </div>
            <div>
              <div class="flex items-baseline justify-between mb-6">
                <div
                  v-if="single?.hashtags?.length > 0"
                  class="flex-y-center gap-3 mt-6"
                >
                  <CommonHashtag :hashtag="single?.hashtags" />
                </div>
                <div v-else></div>
                <CommonLikeDislike
                  :id="single?.id"
                  v-bind="{
                    data: {
                      likesCount: single?.likes_count,
                      dislikesCount: single?.dislikes_count,
                    },
                    isLiked: single?.is_liked,
                    isDisliked: single?.is_disliked,
                  }"
                />
              </div>
              <CardsAuthorsCard
                v-if="single?.author"
                :author="single?.author"
              />
              <hr
                class="mt-6 mb-6 border-gray-300 dark:border-gray-100/20 inline-block w-full"
              />
              <CommonShareLink
                :title="single?.title"
                :short_description="single?.subtitle"
                @click="contactModal = true"
              />
              <slot />

              <CardsBannerSocialShare
                class="mt-6"
                type="telegram"
                link="https://t.me/uznewsuzb"
              />
              <CommonAdBanner
                :image="mainAd?.ad1?.image"
                :link="mainAd?.ad1?.link"
                class="pt-6 lg:pt-10"
              />
            </div>
            <ClientOnly>
              <ModalContactModal
                :show="contactModal"
                @close="contactModal = false"
              />
            </ClientOnly>
          </div>
        </template>
      </main>
      <aside class="max-md:hidden md:col-span-3">
        <div class="mt-14 w-full h-full">
          <a :href="advertising?.ad2?.link" target="_blank">
            <img :src="advertising?.ad2?.image" alt="" />
          </a>
          <a :href="advertising?.ad1?.link" target="_blank">
            <img :src="advertising?.ad1?.image" class="mt-6" alt="" />
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useRoute } from '#app'
import { useAd } from '~/store/ad'
import { useSpecialReportsStore } from '~/store/specialReports'
import { ISingleContent, ISingleData } from '~/types'

interface Props {
  single: ISingleData
  content: ISingleContent
  loading: boolean
}
const props = defineProps<Props>()

const reportsStore = useSpecialReportsStore()
const adStore = useAd()
reportsStore.fetchSpecialReports()
const advertising = ref({})
const mainAd = ref()
const advertisingSingle = ref({})

const { t, locale } = useI18n()
const contactModal = ref(false)
const {
  params: { slug },
} = useRoute()

adStore.fetchAdvertisement('/common/MainAd').then((res) => {
  mainAd.value = res
})

adStore.fetchAdvertisement('/common/BaseAd').then((res) => {
  advertising.value = res
})

adStore.fetchAdvertisement('/common/SingleAd').then((res) => {
  advertisingSingle.value = res
})

useSeoMeta({
  title: props.single?.title,
  ogTitle: props.single?.title,
  description: props.single?.subtitle,
  ogDescription: props.single?.subtitle,
  ogImage: props.single?.cover_image,
  twitterImage: props.single?.cover_image,
  twitterTitle: props.single?.title,
  twitterDescription: props.single?.subtitle,
})
</script>
<style>
.single-content div {
  max-width: 698px;
  margin: 0 auto;
}
.single-content figure {
  margin: 24px auto 40px;
  width: 100%;
  max-height: 498px;
  height: 100%;
}
.single-content figure img {
  width: 100%;
  height: 100%;
  max-height: 498px;
  aspect-ratio: 4 / 4;
  object-fit: cover;
  border-radius: 4px;
}
.single-content figure figcaption {
  margin-top: 8px;
  color: #919299;
  font-size: 12px;
  font-style: italic;
  line-height: 140%;
}
.single-content blockquote {
  max-width: 698px;
  margin: 24px auto;
  border-radius: 4px;
  background: rgba(162, 188, 222, 0.2);
  padding: 24px;
  color: #2c3752;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  position: relative;
}
.single-content pre {
  white-space: pre-line;
  font-family: 'Roboto';
}
.dark .single-content blockquote {
  color: white;
}
.single-content blockquote::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #52618f;
  border-radius: 4px;
}
.single-content blockquote:after {
  content: url('/svg/quote.svg');
  position: absolute;
  top: 24px;
  left: 24px;
  margin: 0;
}
.images_height img {
  width: auto !important;
  height: auto !important;
  object-fit: cover;
}
</style>
