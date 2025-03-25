<template>
  <div class="grid gap-6">
    <a
      v-for="(item, idx) in convertedObject?.advertisements"
      :key="idx"
      :href="item?.link"
      target="_blank"
    >
      <img class="w-[274px]" :src="item.image" alt="advert" />
    </a>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const advertising = ref({})

useApi()
  .$get('/common/BaseAd')
  .then((res) => {
    advertising.value = res
  })

function convertToInnerArray(obj: any) {
  const keys = Object.keys(obj)
  const innerArray = keys.map((key) => obj[key])
  return { advertisements: innerArray }
}

const convertedObject = computed(() => convertToInnerArray(advertising.value))
</script>

<style></style>
