<template>
  <div>
    <div class="container">
      <div class="max-w-[988px] mx-auto">
        <BlockLoaderSingle v-if="loading" class="pt-8" />
        <template v-else>
          <div class="relative md:max-h-[580px] overflow-hidden">
            <div
              class="absolute top-0 left-0 w-full h-full cover-linear flex flex-col items-start justify-end p-6"
            >
              <div class="mb-2 sm:mb-4 flex items-center gap-4">
                <span class="text-white text-sm font-normal leading-tight">
                  <i
                    class="icon-calendar-dotted group-odd:text-white/60 group-even:text-gray mr-1"
                  ></i>
                  {{
                    dayjs(single.published_at)
                      .locale(locale)
                      .format('DD MMMM, HH:mm')
                  }}</span
                >
                <p
                  v-if="single.views_count > 0"
                  class="text-white text-sm font-normal leading-tight flex items-center"
                >
                  <i
                    class="icon-eye group-odd:text-white/60 group-even:text-gray mr-1"
                  ></i>
                  {{ formatNumberWithSpaces(single.views_count) }}
                </p>
              </div>
              <h2
                class="text-white text-xl sm:text-2xl lg:h-[67px] md:text-[32px] font-bold leading-136 line-clamp-2"
              >
                {{ single.title }}
                <CommonNewsTooltip
                  :is-video="single?.is_video"
                  :is-verified="single?.is_verified"
                  @click.prevent.stop
                />
              </h2>
            </div>
            <img
              :src="single?.cover_image"
              class="object-cover w-full h-full"
              alt=""
            />
          </div>
          <div class="grid grid-cols-12 gap-8 mt-8">
            <main class="col-span-12 md:col-span-9">
              <p
                class="text-xl font-medium leading-140 text-blue-700 dark:text-white"
              >
                {{ single?.subtitle }}
              </p>
              <figure v-if="single?.image" class="max-h-[498px] h-full">
                <img
                  :src="single.image"
                  class="w-full h-full object-cover rounded"
                  alt=""
                />
                <figcaption
                  v-if="single.author"
                  class="text-neutral-400 text-xs font-normal leading-none mt-2 italic"
                >
                  © Фото: {{ single.author }}
                </figcaption>
              </figure>
              <div v-for="(item, index) in content" :key="index" class="">
                <div
                  v-if="item?.content_item_type === 'text'"
                  class="mx-auto my-6 text-dark-200 text-base font-normal leading-relaxed transition-200 dark:text-white single-content"
                  v-html="item?.text"
                ></div>
                <figure
                  v-if="item?.content_item_type === 'photo'"
                  class="mt-6 max-h-[498px] h-full"
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
                  class="bg-white-150 dark:bg-dark-600 dark:hover:bg-blue-100/20 hover:bg-blue-100/20 transition-200 p-4 md:p-6 rounded flex items-center gap-6 relative"
                  :to="`/news/${item?.news_content?.slug}`"
                >
                  <img
                    :src="item?.news_content?.cover_image"
                    alt="cover-image"
                    class="w-[96px] h-[96px] rounded object-cover"
                  />
                  <p
                    class="text-lg md:text-xl font-semibold leading-136 text-blue-700 dark:text-white"
                  >
                    {{ item?.news_content?.title }}
                  </p>
                  <i
                    class="icon-share text-xl text-blue-100 absolute bottom-6 sm:bottom-0 sm:top-6 right-6"
                  ></i>
                </NuxtLink>
                <div
                  v-if="item?.content_item_type === 'quote'"
                  class="mx-auto my-4 md:my-6 bg-blue-100/20 p-4 md:p-6 rounded flex items-center flex-col md:flex-row gap-6 relative"
                >
                  <img
                    :src="item?.quote_photo"
                    :alt="item?.quote"
                    class="w-[240px] h-[240px] rounded-full object-cover"
                  />
                  <div>
                    <p
                      class="text-base leading-150 text-blue-600 dark:text-gray-300 mb-3"
                    >
                      {{ item?.quote }}
                    </p>
                    <p
                      class="text-base leading-150 text-blue-700 dark:text-white font-medium"
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
                  <div
                    v-if="item?.content_item_type == 'video'"
                    class="relative"
                  >
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
                  </div>
                </client-only>
              </div>
              <div class="flex-y-center justify-between my-6">
                <CommonHashtag v-bind="{ hashtag: single?.hashtags }" />
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
              <CardsAuthorsCard v-bind="{ author: single?.author }" />
              <div
                class="w-full h-[1px] bg-gray-300 dark:bg-blue-100/20 my-6"
              ></div>
              <CommonShareLink
                class="mb-6"
                :title="single?.title"
                :short_description="single?.subtitle"
                @click="contactModal = true"
              />
              <slot />
              <CommonAdBanner
                :image="advertising.ad2?.image"
                :link="advertising.ad2?.link"
                class="pt-6 lg:pt-10"
              />
            </main>
            <aside class="max-md:hidden md:col-span-3">
              <div class="w-full h-full">
                <slot name="aside" />
              </div>
            </aside>
          </div>
        </template>
      </div>
    </div>
    <ModalContactModal :show="contactModal" @close="contactModal = false" />
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useAd } from '~/store/ad'
import { ISingleContent, ISingleData } from '~/types'

interface Props {
  single: ISingleData
  content: ISingleContent
  loading: boolean
}
const props = defineProps<Props>()

const adStore = useAd()
const { locale } = useI18n()
const contactModal = ref(false)
const advertising = ref({})

adStore.fetchAdvertisement('/common/MainAd').then((res) => {
  advertising.value = res
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

.cover-linear {
  background: linear-gradient(
    180deg,
    rgba(22, 28, 45, 0) 0%,
    rgba(22, 28, 45, 0.06) 7.29%,
    rgba(22, 28, 45, 0.88) 100%
  );
}
</style>
