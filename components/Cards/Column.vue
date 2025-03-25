<template>
  <NuxtLink
    :to="`/speakers/${data?.slug}`"
    class="p-4 transition-200 rounded-lg group odd:bg-blue-600 even:bg-white-700 odd:hover:bg-blue-600 even:hover:bg-white-800 w-full h-full flex flex-col justify-between hover:-translate-y-2 hover:shadow-xs"
  >
    <div>
      <h2
        class="line-clamp-1 transition-200 text-lg font-semibold leading-130 group-odd:text-white group-even:text-blue-700 group-odd:group-hover:text-blue-100 group-even:group-hover:text-blue-200"
      >
        {{ data.title }}
      </h2>
      <p
        class="line-clamp-5 transition-200 text-sm leading-130 group-odd:text-white/80 group-even:text-blue-600 mt-2 mb-[38px] group-odd:group-hover:text-blue-100 group-even:group-hover:text-blue-200"
      >
        {{ data.subtitle }}
      </p>
    </div>
    <div
      class="transition-200 border-t border-t-gray-300 group-odd:border-t-white/20 pt-4 flex-y-center mt-auto"
    >
      <img
        :src="data?.author?.avatar || '/images/avatar.png'"
        class="w-11 h-11 object-cover rounded-full"
        alt=""
      />
      <div class="ml-2">
        <h3
          class="text-sm font-semibold group-odd:text-white group-even:text-blue-600"
        >
          {{ data?.author?.full_name }}
        </h3>
        <div class="flex-y-center mt-1">
          <div>
            <p
              v-if="data.views_count"
              class="group-odd:text-white/60 group-even:text-gray flex-y-center text-sm leading-130"
            >
              <i
                class="icon-eye group-odd:text-white/60 group-even:text-gray mr-1"
              ></i>
              {{ formatNumberWithSpaces(data.views_count) }}
            </p>
          </div>

          <span class="w-1 h-1 rounded-full bg-gray mx-1.5"></span>
          <p
            class="group-odd:text-white/60 group-even:text-gray flex-y-center text-sm leading-130"
          >
            {{ dayjs(data?.published_at).fromNow() }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'

import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useI18n } from 'vue-i18n'

import { IColony } from '~/types'

const { locale } = useI18n()
dayjs.extend(RelativeTime)
dayjs.locale(locale.value === 'uz' ? 'uz-latn' : locale.value)

interface Props {
  data: IColony
}

defineProps<Props>()
</script>
