<template>
  <div>
    <FormInput
      :placeholder="$t('search')"
      :model-value="searchOption"
      @update:model-value="handleUpdateSearch"
    >
      <template #prefix>
        <span
          class="icon-magnifer text-base text-blue-200 dark:text-blue-100 mr-2"
        />
      </template>
    </FormInput>
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchOption: string
}
defineProps<Props>()
interface Emits {
  (e: 'handle-update-search', value: string): void
}
const emit = defineEmits<Emits>()

const handleUpdateSearch = (value: string) => {
  debounce('searchOption', () => {
    emit('handle-update-search', value)
  })
}
</script>
