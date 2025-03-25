<template>
  <div>
    <CommonBreadcrumb :menu="breadcrumb" class="md:mb-8" />
    <div class="py-8 md:py-16">
      <div class="container">
        <p class="page-title mb-4 md:mb-6">{{ $t('contacts') }}</p>
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-x-8 gap-y-5"
        >
          <BlockContactShimmer v-for="item in 6" :key="item" />
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-x-8 gap-y-5"
        >
          <div
            v-for="(contactItem, index) in formattedContacts"
            :key="index"
            class="contact__card group"
          >
            <div class="contact__card_symbol">
              <BlockPreloader v-bind="{ loading }" width="100%" height="100%">
                <img :src="contactItem?.icon" alt="" />
              </BlockPreloader>
            </div>
            <BlockPreloader
              v-bind="{ loading }"
              width="241px"
              height="31px"
              preloader-class="mb-4"
            >
              <p class="contact__card_title">
                {{ contactItem?.title }}
              </p>
            </BlockPreloader>

            <div v-if="contactItem?.type === 'mixed'" class="flex flex-col">
              <div
                v-for="(sortedItems, sortedIdx) in contactItem?.midexItems"
                :key="'A' + sortedIdx"
                class="flex-y-center space-x-2"
              >
                <a
                  v-for="(item, idx) in sortedItems"
                  :key="'A' + idx"
                  :href="getItemValue(item).href"
                  class="contact__card_link space-x-1 flex items-center space-x-1 group/icon"
                  :class="getItemValue(item).style"
                  target="_blank"
                >
                  <span class="inline-block">
                    {{ getItemValue(item).title }}</span
                  >
                  <i
                    :class="getItemValue(item).icon"
                    class="text-xs inline-block group-hover/icon:translate-x-1 transition-transform !ml-2"
                  ></i>
                  <span v-if="idx % 2 === 0" class="text-white/40">|</span>
                </a>
              </div>
            </div>

            <div v-else class="flex items-start flex-col">
              <a
                v-for="(item, idx) in contactItem?.items"
                :key="'A' + idx"
                :href="getItemValue(item).href"
                class="contact__card_link space-x-1 flex items-center group/icon"
                :class="getItemValue(item).style"
                target="_blank"
              >
                <span class="inline-block">{{ getItemValue(item).title }}</span>
                <i
                  :class="getItemValue(item).icon"
                  class="text-xs inline-block group-hover/icon:translate-x-1 transition-transform !ml-2"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useContactStore } from '~/store/contact'
import { IObject } from '~/types'
import { IContactItem } from '~/types/contact'
import { formatPhoneNumber } from '~/utils'

const contactStore = useContactStore()

const loading = ref(true)

const contact = computed(() => contactStore.contact)
Promise.allSettled([contactStore.fetchContact()]).finally(() => {
  loading.value = false
})

const { t } = useI18n()
const breadcrumb = computed(() => [{ title: t('contacts'), link: '/contact' }])

const getItemValue = computed(() => (item: IContactItem) => {
  const valueKeys: IObject<string> = {
    email: 'email',
    phone: 'phone_number',
    link: 'link',
    telegram: 'telegram_link',
  }

  const value = valueKeys[item?.type]
    ? item[valueKeys[item?.type] as keyof typeof item]
    : []
  if (item?.type === 'phone') {
    return {
      title: formatPhoneNumber(value as string),
      href: `tel:${value}`,
    }
  } else if (item?.type === 'email') {
    return {
      title: value,
      href: `mailto:${value}`,
    }
  } else if (item?.type === 'telegram') {
    if (item.id == 7 || item.id == 8) {
      return {
        title: removeHttpPrefix(value as string),
        href: value,
        icon: 'icon-chevron-right',
      }
    } else {
      return {
        title: 'Telegram',
        href: value,
        icon: 'icon-chevron-right',
        style: 'inline',
      }
    }
  } else {
    return {
      title: removeHttpPrefix(value as string),
      href: value,
      icon: 'icon-chevron-right',
    }
  }
})

function removeHttpPrefix(url: string) {
  return url.replace(/^https?:\/\//i, '')
}

function containsPhoneAndTelegram(contactItems: IContactItem[]) {
  const hasPhone = contactItems.some((item) => item.type === 'phone')
  const hasTelegram = contactItems.some((item) => item?.type === 'telegram')
  return hasPhone && hasTelegram
}

function collectPhoneAndTelegram(contactItems: IContactItem[]) {
  const phoneObjects = []
  const telegramObjects = []

  for (const object of contactItems) {
    if (object.type === 'phone') {
      phoneObjects.push(object)
    } else {
      telegramObjects.push(object)
    }
  }

  const result = []

  for (let i = 0; i < phoneObjects.length; i++) {
    for (let j = 0; j < telegramObjects.length; j++) {
      if (i === j) {
        result.push([phoneObjects[i], telegramObjects[j]])
      }
    }
  }

  return result
}

const formattedContacts = computed(() => {
  const contactClone = [...contact.value]
  contactClone.forEach((c) => {
    const items = c.items

    if (containsPhoneAndTelegram(items)) {
      c.midexItems = collectPhoneAndTelegram(items)
      c.type = 'mixed'
    }
  })

  return contactClone
})

useSeoMeta({
  title: t('contacts'),
  ogTitle: t('contacts'),
})
</script>

<style scoped>
.contact__card {
  @apply bg-blue-700 dark:bg-dark-200 dark:hover:bg-blue-600 cursor-pointer hover:bg-blue-600 rounded-xl p-4 lg:p-5 flex flex-col items-start transition-all;
}
.contact__card:hover .contact__card_symbol {
  transition: all 0.2s ease;
  background: #52618f;
}
.contact__card_symbol {
  @apply w-12 lg:w-[72px] h-12 lg:h-[72px] flex items-center justify-center rounded-lg bg-blue-600 mb-4 lg:mb-7 group-hover:bg-blue-200 transition-all;
}

.contact__card_title {
  @apply mb-4 text-white text-xl lg:text-2xl font-bold leading-130;
}

.contact__card_link {
  @apply font-semibold text-sm lg:text-base leading-130 text-white duration-200 transition-all hover:text-blue-300;
}
</style>
