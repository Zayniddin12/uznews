<template>
  <footer class="bg-blue-700 dark:bg-blue-600/30">
    <div class="container">
      <div
        class="flex justify-between pb-5 pt-7 sm:pt-10 sm:pb-6 border-b border-solid items-start md:items-center border-blue-600 flex-col md:flex-row gap-4"
      >
        <div class="flex-y-center gap-3 group">
          <NuxtLink to="/" class="flex-y-center space-x-3">
            <img
              src="/svg/uznews.svg"
              alt="logo"
              class="w-full sm:w-[90%] lg:w-full"
            />
            <div
              class="inline-block px-1.5 rounded-[2px] bg-blue-200 transition-200 group-hover:bg-red"
            >
              <i class="icon-18 text-white text-xs" />
            </div>
          </NuxtLink>
        </div>

        <div
          class="flex sm:items-center items-start sm:flex-row flex-col gap-2 md:gap-3 lg:gap-8"
        >
          <client-only>
            <NuxtLink
              v-for="(link, index) in staticPageList"
              :key="index"
              :to="`/pages/${link?.slug}`"
              class="text-sm sm:text-base leading-5 font-medium text-white transition-200 hover:text-blue-100 whitespace-nowrap"
            >
              {{ link.title }}
            </NuxtLink>
          </client-only>

          <client-only>
            <NuxtLink
              v-for="(link, index) in menu"
              :key="index"
              :to="`${link.link}`"
              class="text-sm sm:text-base leading-5 font-medium text-white transition-200 hover:text-blue-100"
            >
              {{ link.title }}
            </NuxtLink>
          </client-only>
        </div>
      </div>

      <div
        class="flex items-start md:items-center justify-between py-5 sm:py-8 flex-col lg:flex-row gap-5"
      >
        <div class="hidden md:block">
          <p
            class="text-sm leading-140 text-white font-normal lg:max-w-[70%] text-left"
          >
            {{ $t('found_mistake_warn_us') }}
          </p>

          <client-only>
            <i18n-t
              keypath="press_this"
              scope="global"
              tag="div"
              class="inline-block rounded border border-solid border-blue-600 py-1 px-2.5 text-white text-sm leading-140 mt-4"
            >
              <template #key>
                <span class="font-bold text-blue-100 ml-1.5">
                  CTRL + ENTER
                </span>
              </template>
            </i18n-t>
          </client-only>
        </div>
        <div class="flex items-start md:item-start gap-4 flex-col md:flex-row">
          <div
            v-for="(item, index) in about"
            :key="index"
            class="px-4 py-3 rounded-[5px] border border-solid border-[#4E6293]/[36%]"
          >
            <p class="text-base text-white leading-5 font-medium">
              {{ item?.name }}
            </p>
            <p class="text-xs leading-[14px] font-normal text-blue-100 mt-0.5">
              {{ t(item?.subtitle) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <CntrlEnter />
    <div class="py-[18px] border-t border-solid border-blue-600">
      <div
        class="container flex items-start md:items-center justify-between flex-col md:flex-row gap-5"
      >
        <p class="text-sm leading-140 text-blue-100 font-normal">
          © 2015-2023 UzNews.uz
        </p>
        <Transition name="fade" mode="out-in">
          <div v-if="$route?.path !== '/'">
            <ul class="flex-y-center flex-wrap justify-center gap-3">
              <li v-for="(social, idx) in mediaList" :key="idx">
                <a
                  v-tooltip="capitalizeString(social?.title)"
                  :href="social?.link"
                  target="_blank"
                  class="text-white text-base w-9 h-9 rounded-full flex-center hover:text-white transition-200"
                >
                  <i
                    class="text-blue-100 text-2xl hover:text-white"
                    :class="`icon-${social?.title}`"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </Transition>
        <div class="flex-y-center gap-2">
          <p class="text-sm leading-140 text-blue-100 font-normal">
            {{ t('developed_by') }}:
          </p>
          <CommonUicLogo main-color="#fff" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'

const { t } = useI18n()

const homeStore = useHomeStore()

homeStore.fetchStaticPageList()
homeStore.fetchSocialMediaList()

const staticPageList = computed(() => homeStore.staticPageList)
const mediaList = computed(() => homeStore.mediaList)

function capitalizeString(str: string) {
  return str.toUpperCase().charAt(0) + str.slice(1)
}

const menu = computed(() => [
  {
    title: t('contacts'),
    link: '/contact',
  },
])

const about = computed(() => [
  {
    name: t('main_editor_name'),
    subtitle: t('main_editor'),
  },
  {
    name: t('founder_name'),
    subtitle: t('founder'),
  },
  {
    name: t('registration_date'),
    subtitle: t('registration'),
  },
])
</script>
