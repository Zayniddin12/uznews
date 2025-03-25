<template>
  <div class="grid grid-cols-12 sm:gap-8">
    <main class="col-span-12 md:col-span-9">
      <h2
        class="text-blue-700 dark:text-white text-xl sm:text-[32px] font-bold sm:leading-10"
      >
        {{ detail?.title }}
      </h2>
      <div class="my-4 flex items-center gap-4">
        <span
          class="text-blue-200 dark:text-blue-100 text-sm font-normal leading-tight"
        >
          <i
            class="icon-calendar-dotted group-odd:text-white/60 group-even:text-gray mr-1"
          ></i>
          {{
            dayjs(detail?.published_at).locale(locale).format('DD MMMM, HH:mm')
          }}</span
        >
        <p
          v-if="detail?.views_count"
          class="text-blue-200 text-sm font-normal leading-tight flex items-center"
        >
          <i
            class="icon-eye group-odd:text-white/60 group-even:text-gray mr-1"
          ></i>
          {{ formatNumberWithSpaces(detail?.views_count) }}
        </p>
      </div>
      <p
        class="text-blue-700 text-2xl font-medium leading-[33px] transition-200 dark:text-white mb-6"
      >
        {{ detail?.subtitle }}
      </p>

      <div
        v-if="image.length > 0"
        class="max-w-[886px] md:h-[500px] mb-10 md:mb-20"
      >
        <PhotoReportSlider
          :images="image"
          @handle-images="(i, array) => openModal(i, array)"
        />
      </div>
      <div v-for="(item, index) in content" :key="index" class="">
        <div
          v-if="item?.content_item_type === 'text'"
          class="max-w-[682px] mx-auto my-6 text-dark-200 whitespace-break-spaces text-base font-normal leading-relaxed transition-200 dark:text-white single-content"
          v-html="item?.text"
        ></div>
        <figure
          v-if="item?.content_item_type === 'photo'"
          class="mt-6 lg:min-h-[498px] h-full"
        >
          <img
            :src="item?.photo"
            class="w-full h-full object-cover rounded cursor-pointer"
            alt="This will be image"
            @click="openModal(index, content)"
          />
          <figcaption
            v-if="item?.photo_author"
            class="text-neutral-400 text-xs font-normal leading-none mt-2 italic"
          >
            © {{ $t('photo') }}: {{ item?.photo_author }}
          </figcaption>
        </figure>
        <div v-if="item?.content_item_type == 'video'" class="relative">
          <iframe
            width="100%"
            height="456px"
            :src="
              item?.video_type === 'upload'
                ? item?.video_file
                : `https://www.youtube.com/embed/${toEmbed(item?.video_link)}`
            "
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="h-[245px] sm:h-[345px] md:h-[456px] my-4 md:my-6"
          ></iframe>
        </div>
      </div>
      <!--        Lightbox modal-->
      <div v-if="allImages?.length > 0">
        <TempLightBox
          :show="lightBoxModal"
          :content="allImages"
          :active="activeIndex"
          @close="lightBoxModal = false"
        />
      </div>
      <!--        Lightbox modal-->
      <CommonAdBanner
        v-if="isSpecialReport"
        image="/images/advertising/yellow.png"
        class="container mb-10 md:mb-20 max-w-[728px] mx-auto"
      />
      <slot />
      <CardsBannerSocialShare
        class="mt-6"
        :type="detail.social_media?.title"
        :link="detail.social_media?.link"
      />
      <CommonAdBanner
        :image="mainAd?.ad1?.image"
        :link="mainAd?.ad1?.link"
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
<script setup lang="ts">
import 'swiper/css'

import dayjs from 'dayjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import PhotoReportSlider from '~/components/Slider/PhotoReportSlider.vue'
import { useAd } from '~/store/ad'
import {
  IPhotoReportsContent,
  IPhotoReportsDetail,
  IPhotoReportsImageListView,
} from '~/types/photo-reports'

interface Props {
  content: IPhotoReportsContent
  detail: IPhotoReportsDetail
  image: IPhotoReportsImageListView[]
  loading: boolean
}

const props = defineProps<Props>()

const images = computed(() => {
  const arr = props.content?.map((item) => item.photo)
  return arr
})

const lightBoxModal = ref(false)
const activeIndex = ref(0)

const { t, locale } = useI18n()
const route = useRoute()
const menu = [
  { title: t('special_reports'), link: '/reports/special' },
  { title: t('reports_single'), link: '/reports/special' },
]
const isSpecialReport = computed(() => {
  return route.path.includes('special')
})
const adStore = useAd()
const mainAd = ref()
const allImages = ref()

adStore.fetchAdvertisement('/common/MainAd').then((res) => {
  mainAd.value = res
})
const openModal = (index: string, image: any) => {
  activeIndex.value = index
  lightBoxModal.value = true
  allImages.value = image
}

useSeoMeta({
  title: () => props.detail?.title,
  ogTitle: () => props.detail?.title,
  description: () => props.detail?.subtitle,
  ogDescription: () => props.detail?.subtitle,
  ogImage: () => props.content[0]?.photo,
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
</style>
