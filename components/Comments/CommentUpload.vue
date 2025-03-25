<template>
  <div>
    <div v-if="!withoutHeader" class="flex justify-between items-center">
      <h4 class="text-xl leading-130 font-bold text-blue-700 dark:text-white">
        {{ $t('comments') }}
      </h4>
      <CommonDropdown
        list-style="min-w-[150px] bg-white"
      >
        <template #head>
          <i
            class="icon-filter text-lg text-blue-600 cursor-pointer hover:text-blue-100 transition-200"
          ></i>
        </template>
        <template #default>
          <li
            v-for="(item, index) in filterList"
            :key="index"
            class="px-3 py-2.5 text-blue-700 transition-200 dark:text-white dark:hover:text-blue-600 hover:bg-white-200 z-40"
            :class="[
              { 'rounded-t-md': index === 0 },
              { 'rounded-b-md': index === filterList.length - 1 },
              { 'bg-white-100 !text-blue-600': filter === item.value },
            ]"
            @click="filterValue(item.value)"
          >
            {{ $t(item.label) }}
          </li>
        </template>
      </CommonDropdown>
    </div>
    <div
      class="relative mt-4 duration-300 border border-transparent flex flex-col bg-blue-200/10 py-2.5 px-3 rounded cursor-pointer !ease-[cubic-bezier(0.95,0.05,0.795,0.035)]"
      :class="[
        {
          '!border-[#00B7EE] dark:!border-blue-200 !bg-white dark:!bg-blue-700 min-h-[180px] !max-h-[220px] !cursor-auto':
            isFocus,
        },
        {
          '!border-red-500': invalid,
        },
      ]"
      tabindex="0"
      @click="isFocus = true"
      @focusin="isFocus = true"
    >
      <div
        class="absolute z-0 text-blue-200/50 dark:text-blue-100/50 text-sm leading-6 opacity-100 scale-100 origin-left transition-200"
        :class="{ '!opacity-0 !scale-0': comment.length }"
      >
        {{ $t('comments') }}...
      </div>
      <div
        ref="editor"
        contenteditable="true"
        class="w-full outline-none relative min-h-full max-h-[140px] overflow-auto transition-200 text-blue-600 dark:text-white"
        :class="[
          {
            'h-[98px]': isFocus,
          },
        ]"
        @input="updateValue"
      ></div>
      <div
        v-show="isFocus"
        class="flex justify-end mt-6 gap-3 absolute opacity-0 origin-right transition-200 z-0"
        :class="{ '!static !opacity-100': isFocus }"
      >
        <button
          class="text-gray-200 hover:text-white dark:hover:text-white cursor-pointer rounded text-sm sm:text-base px-3 py-1.5 hover:bg-red-600 dark:text-blue-100/50 !hover:text-white-200 duration-700"
          @click.stop="cancel"
          @mousedown.prevent
        >
          {{ $t('cancel') }}
        </button>
        <button
          class="rounded bg-[#48A4E3] hover:bg-cyan-300 text-sm sm:text-base text-white px-3 py-1.5 cursor-pointer duration-700"
          @mousedown.prevent
          @click="onSubmit"
        >
          {{ $t('send') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface ItemData {
  last_name: string
  first_name: string
  user_img: string
  comment_text: string
  comment_child?: ItemData
  images: string[]
}
interface Props {
  isChild?: Boolean
  reInit?: boolean
  withoutHeader?: boolean
  comments: ItemData[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'on-comment-create', val: string): void
  (e: 'filter-comment', val: string): void
}>()

const editor = ref<HTMLDivElement | null>(null)
const comment = ref('')
const invalid = ref(false)
const isFocus = ref(false)
const filter = ref('')
const filterList = computed(() => [
  {
    label: 'for_a_week',
    value: 'is_last_week',
  },
  {
    label: 'latest',
    value: 'is_latest',
  },
  {
    label: 'popular',
    value: 'is_popular',
  },
])

const updateValue = (event: Event) => {
  const target = event.target as HTMLDivElement
  comment.value = target.innerText
  if (comment.value) {
    isFocus.value = true
  }
}
function onSubmit() {
  if (comment.value) {
    emit('on-comment-create', comment.value)
  } else {
    invalid.value = true
  }
}
watch(
  () => comment.value,
  () => {
    if (comment.value.length) {
      invalid.value = false
    }
  }
)
watch(
  () => props.reInit,
  () => {
    comment.value = ''
    invalid.value = false
    isFocus.value = false
  }
)
function cancel() {
  comment.value = ''
  invalid.value = false
  isFocus.value = false
  if (editor.value) {
    editor.value.innerHTML = ''
  }
}

const filterValue = (val: string) => {
  filter.value = val
  if (filter.value) {
    emit('filter-comment', val)
  }
}
</script>
