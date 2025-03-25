<template>
  <div
    class="w-full flex items-center justify-end"
    :class="[searchTrigger ? '!z-40' : '!z-10']"
  >
    <SearchWrapper
      :search="search"
      :search-content="content"
      :search-trigger="searchTrigger"
      @handle-update-search="handleUpdateSearch"
      @focus="loadData"
      @clear="clear"
    />
    <button
      class="text-2xl text-blue-200 transition-200 hover:text-blue-100 lg:hidden relative z-50"
      :class="[searchTrigger ? 'icon-close' : 'icon-magnifer']"
      @click="handleShowSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useNewsStore } from '~/store/news'

const newsStore = useNewsStore()
const route = useRoute()

const content = computed(() => newsStore.newsSearchList)
const count = computed(() => newsStore.newsSearchListCount)
const search = ref('')
const searchTrigger = ref(false)

const params = reactive({
  offset: 0,
  limit: 10,
  search: undefined,
})
const handleShowSearch = () => {
  search.value = ''
  searchTrigger.value = !searchTrigger.value
}
const clear = () => {
  search.value = ''
}
const handleUpdateSearch = (value: string) => {
  params.search = value
  search.value = value
  newsStore.fetchSearchList(params)
}
watch(
  () => route.path,
  () => {
    searchTrigger.value = false
    search.value = ''
  },
  {
    deep: true,
  }
)
const loadData = () => {
  newsStore.fetchSearchList(params)
}
</script>

<style scoped>
.fade-enter-active {
  animation: Fade 0.2s ease;
}
.fade-leave-active {
  animation: Fade 0.2s ease reverse;
}

@keyframes Fade {
  from {
    transform: translateY(-5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.slideDown-enter-active {
  animation: slideDown 0.2s linear;
}
.slideDown-leave-active {
  animation: slideDown 0.2s linear reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* slightly transparent fallback */
.backdrop-blur {
  background-color: rgba(7, 9, 28, 0.12);
}

/* if backdrop support: very transparent and blurred */
@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .backdrop-blur {
    background-color: rgba(7, 9, 28, 0.12);
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
  }
}
</style>
