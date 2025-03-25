<template>
  <div>
    <template v-for="(item, i) in icons" :key="i">
      <div
        v-if="item?.url"
        class="rounded-md flex group transition-200 items-center justify-center"
      >
        <a
          target="_blank"
          :href="item.url"
          class="text-blue-200 rounded-md dark:text-blue-100 border-[#a2bcde4d] hover:border-blue-150 border dark:hover:text-white hover:text-white hover:bg-blue-150 p-1 cursor-pointer transition-200"
          :class="item.icon"
        >
        </a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { IAuthorsData, ISocials } from '~/types'
import { IAuthorCard } from '~/types/author'

interface Props {
  mediaList?: ISocials[]
  author: IAuthorCard
  authorsData?: IAuthorsData[]
}

const props = defineProps<Props>()

const icons = computed(() => [
  {
    url: props.author?.instagram,
    icon: 'icon-instagram',
  },
  {
    url: props.author?.telegram,
    icon: 'icon-telegram',
  },
  {
    url: props.author?.facebook,
    icon: 'icon-facebook',
  },
  {
    url: props.author?.twitter,
    icon: 'icon-twitter',
  },
])
</script>
