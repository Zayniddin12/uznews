<template>
  <div class="flex gap-2 item-center group">
    <button
      class="opacity-0 rounded-full group-hover:opacity-100 cursor-pointer transition-200 p-1"
      :class="{
        'hover:bg-[#FDE6E4]': count < 0,
        'hover:bg-[#f2f2f6]': count >= 0,
      }"
      @click="liked('dislike')"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#EB2B1E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <span
      class="w-6 h-5 px-1 py-0.5 rounded text-center item-center count-n mt-1 transition-200 text-sm leading-[16px] font-bold flex-center"
      :class="{
        'bg-[#FDE6E4] text-[#EB2B1E]': count < 0,
        'bg-[#EAF5EA] text-[#4CAF50]': count > 0,
        ' text-[#8a939a] bg-[#f2f2f6]': count === 0,
      }"
      >{{ count }}</span
    >
    <button
      class="cursor-pointer transition-200 p-1 opacity-0 rounded-full group-hover:opacity-100"
      :class="{
        'hover:bg-[#f2f2f6]': count <= 0,
        'hover:bg-[#EAF5EA]': count > 0,
      }"
      @click="liked('like')"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 15L12 9L6 15"
          stroke="#8A939A"
          stroke-width="2"
          stroke-linecap="round"
          :style="{ stroke: count > 0 ? '#4CAF50' : '#8A939A' }"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '~/store/auth'

interface Props {
  count?: Number
  id: number
  fetcher: Function
}
const props = defineProps<Props>()
const route = useRoute()
const authStore = useAuthStore()

const authSate = computed(() => authStore.auth)
function liked(type: string) {
  if (!authSate.value.loggedIn) {
    authStore.showLoginModalAction()
  } else {
    useApi()
      .$post('news/CommentLikeCreate/', {
        body: {
          comment: props.id,
          type,
        },
      })
      .then((res) => {
        // console.log(res)
        props.fetcher({}, '' + route.params.slug)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.count-n {
  transition: all 0.4s ease;
}
</style>
