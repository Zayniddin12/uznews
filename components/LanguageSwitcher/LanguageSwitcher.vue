<template>
  <div class="flex-y-center md:space-x-[10px]">
    <button
      v-for="item in languageList"
      :key="item?.value"
      class="transition-200 w-8 h-8 md:w-auto md:h-auto rounded-full"
      :class="[
        activeLang?.value === item?.value
          ? 'bg-white md:bg-transparent text-blue-200 md:text-blue-200 md:dark:text-white'
          : ' text-blue-100  md:text-gray md:dark:text-gray-100/40 hover:text-blue-200/80',
      ]"
      @click="switchLanguage(item)"
    >
      {{ item?.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

interface ILanguage {
  value: string
  name: string
}

const { locale } = useI18n()
const i18n = useI18n()

const authStore = useAuthStore()

const switchLanguage = async (item: ILanguage) => {
  const lang = useCookie('i18n_redirected')
  lang.value = item.value
  await nextTick()
  window.location.reload()
  await authStore.fetchLocaleJson(i18n)
}

const languageList = ref<ILanguage[]>([
  { value: 'uz', name: 'UZ' },
  { value: 'ru', name: 'RU' },
  { value: 'en', name: 'EN' },
])

const activeLang = computed(() =>
  languageList.value.find((el) => el.value === locale.value ?? 'uz')
)
</script>
