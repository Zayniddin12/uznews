<template>
  <button
    class="category-button py-[7px] px-2 rounded-[30px] text-sm font-medium leading-130 text-blue-200 dark:text-blue-100 transition-colors duration-200 hover:!bg-blue-100/40 dark:bg-blue-100/10 capitalize"
    :class="{
      '!bg-blue-200 dark:!bg-white text-white dark:text-blue-600':
        active === item,
    }"
    @click="updateCategoryQuery(item)"
  >
    <span v-if="isHash">#</span>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import useUpdateRouteQuery from '~/composables/useUpdateQuery'

interface Props {
  text: string
  item: string
  isHash?: boolean
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'on-click'): void
}>()

const route = useRoute()

const active = computed(() => route.query?.category?.toString())

function updateCategoryQuery(activeValue: string) {
  useUpdateRouteQuery('category', activeValue)
  emits('on-click')
}
</script>

<style scoped>
.category-button {
  background-color: rgba(162, 188, 222, 0.16);
}

.category-button:hover {
  background-color: rgba(162, 188, 222, 0.4);
}
</style>
