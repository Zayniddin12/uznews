<template>
  <div class="w-full">
    <FormInput
      :model-value="search"
      class="transition-200 ease-in-out !px-2.5 py-[10px] !absolute !w-[98%] sm:w-[90%] md:w-[93%] lg:w-full right-12 z-30 !left-[3px] !top-[2px] lg:!relative lg:!right-0 lg:!left-0 lg:!top-0"
      :placeholder="searchPlaceholder"
      :class="[
        searchTrigger
          ? 'max-w-full opacity-100 z-30 translate-x-0'
          : 'max-w-0 md:max-w-full opacity-0 lg:opacity-100 sm:translate-x-10 lg:translate-x-0',
      ]"
      input-class="pl-2 pr-2 mt-0.5 dark:text-white "
      prefix-class="leading-130"
      :focus="searchTrigger"
      @update:model-value="handleUpdateSearch"
      @enter="handleEnter"
      @focus="$emit('focus')"
    >
      <!-- Fix it @enter kiddo -->
      <template #prefix>
        <span
          class="icon-magnifer text-base text-blue-200 dark:text-blue-100"
        />
      </template>
      <template #suffix>
        <button
          :class="{ 'hidden sm:!block !opacity-100 !visible': search?.length }"
          class="text-xl leading-5 icon-close text-gray-200 hover:text-blue-150 dark:hover:text-white transition-200 opacity-0 invisible"
          @click="clear"
        />
      </template>
    </FormInput>
    <Transition name="fade" mode="out-in">
      <div v-if="(searchTrigger && search) || search" class="w-full">
        <div
          class="absolute top-16 left-0 lg:left-auto md:!w-[376px] !w-[87.9%] sm:!w-[90%] transition-200 bg-white dark:bg-blue-600 border border-solid border-white-500 dark:border-blue-200 rounded max-h-[320px] overflow-y-auto z-50"
        >
          <template v-if="searchContent?.length > 0">
            <ul class="list">
              <SearchValue
                v-for="(value, index) of searchContent"
                :key="index"
                :search="search"
                :slug="value?.slug"
                :title="value?.title"
                :image="value?.cover_image"
                :type="value?.model_type"
                :breadcrumb="value?.region"
              />
            </ul>
          </template>
          <template v-else>
            <SearchEmpty
              v-if="!($route.path == '/search')"
              class="max-h-[310px]"
            />
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  search?: string
  searchTrigger?: boolean
  searchContent?: {
    title?: string
    region?: {}
  }[]
  wrapperClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  searchTrigger: true,
})
interface Emits {
  (e: 'handle-update-search', value: string): void
  (e: 'clear'): void
}
const emit = defineEmits<Emits>()

const { t } = useI18n()

const router = useRouter()
const isEmpty = ref(true)
const searchPlaceholder = computed(() => t('search'))
function clear() {
  emit('clear')
}
const handleUpdateSearch = (value: string) => {
  debounce('search', () => {
    emit('handle-update-search', value)
  })
}

const handleEnter = () => {
  clear()
  isEmpty.value = false
  router.push({
    path: '/search',
    query: {
      query: props.search,
    },
  })
}
</script>

<style>
.list li {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
}
.list li a {
  padding: 10px 10px 10px 0 !important;
}
.list li:first-child {
  border-radius: 4px 4px 0 0;
}

.list li:last-child {
  border-radius: 0 0 4px 4px;
}

.list li:hover {
  background-color: rgba(118, 129, 148, 0.11);
}
</style>
