<template>
  <div class="pb-16">
    <div v-if="loading" class="max-w-[988px] mx-auto">
      <BlockLoaderSingle class="pt-8" />
    </div>

    <template v-else>
      <div class="relative md:max-h-[580px] overflow-hidden">
        <div
          class="absolute top-0 left-0 w-full h-full cover-linear flex flex-col items-start justify-end p-6"
        >
          <div class="container">
            <div class="mb-2 sm:mb-4 flex items-center gap-4">
              <span class="text-white text-sm font-normal leading-tight">
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
                class="text-white text-sm font-normal leading-tight flex items-center"
              >
                <i
                  class="icon-eye group-odd:text-white/60 group-even:text-gray mr-1"
                ></i>
                {{ formatNumberWithSpaces(single?.views_count) }}
              </p>
            </div>
            <h2
              class="text-white text-xl sm:text-2xl md:text-[32px] font-bold leading-10 line-clamp-2"
            >
              {{ single?.title }}
              <CommonNewsTooltip
                :is-video="single?.is_video"
                :is-verified="single?.is_verified"
                @click.prevent.stop
              />
            </h2>
          </div>
        </div>
        <img
          :src="single?.cover_image"
          class="object-cover w-full h-full"
          alt=""
        />
      </div>
      <div class="container max-w-[988px] mx-auto">
        <div class="grid grid-cols-12 gap-6 mt-8">
          <main class="col-span-12 md:col-span-12">
            <p
              class="text-xl font-medium leading-140 text-blue-700 dark:text-white max-w-[988px]"
            >
              {{ single?.subtitle }}
            </p>
            <div
              v-for="(item, index) in content"
              :key="index"
              class="max-w-[988px]"
            >
              <div
                v-if="item?.content_item_type === 'text'"
                class="mx-auto my-6 text-dark-200 text-lg font-normal leading-relaxed transition-200 dark:text-white full-single-content"
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
               </div>
             </client-only>
            </div>
          </main>
        </div>
      </div>
      <div class="container max-w-[988px] mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex-y-center gap-3">
            <CommonHashtag v-bind="{ hashtag: single?.hashtags }" />
          </div>
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
        <hr
          class="mt-6 mb-6 border-gray-300 dark:border-blue-100/20 inline-block w-full"
        />
        <CommonShareLink
          class="mb-6"
          :title="single?.title"
          :short_description="single?.subtitle"
          @click="contactModal = true"
        />
        <slot />
        <CommonAdBanner
          :image="advertising?.ad3?.image"
          :link="advertising?.ad3?.link"
          class="pt-6 lg:pt-10"
        />
      </div>
    </template>
    <!--    <ModalContactModal :show="contactModal" @close="contactModal = false" />-->
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
const advertising = ref({})
const contactModal = ref(false)

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

<style scoped>
.full-single-content img {
  height: 556px !important;
  object-fit: cover !important;
  width: 100%;
}
.full-single-content div {
  max-width: 988px;
  margin: 0 auto;
}
.full-single-content figure {
  margin: 24px auto 40px;
  min-width: 100vh;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-height: 498px;
  height: 100%;
}
.full-single-content figure img {
  width: 100%;
  height: 100%;
  max-height: 498px;
  object-fit: cover;
}
.full-single-content figure figcaption {
  display: none;
  margin-top: 8px;
  color: #919299;
  font-size: 12px;
  font-style: italic;
  line-height: 140%;
}
.full-single-content blockquote {
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
.dark .full-single-content blockquote {
  color: white;
}
.full-single-content blockquote::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #52618f;
  border-radius: 4px;
}
.full-single-content blockquote:after {
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
