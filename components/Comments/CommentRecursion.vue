<template>
  <div>
    <AuthMain />
    <div v-for="(item, ind) in data" :key="ind">
      <CommentsCommentUser
        :index="ind"
        class="mt-8 w-full"
        :data="item"
        :fetcher="fetcher"
        @on-comment-create="(e) => emit('on-comment-create', e)"
      />
    </div>
    <div class="flex mt-3 mb-5">
      <CommonButton
        v-if="data.length < count && data.length > 1"
        class="mx-auto"
        @click="emit('on-load')"
      >
        {{ $t('more') }}
      </CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '~/store/news'

interface ItemData {
  last_name: string
  first_name: string
  user_img: string
  comment_text: string
  comment_child?: ItemData
  images: string[]
}

interface Prop {
  data?: ItemData[]
  fetcher?: Function
}

const props = defineProps<Prop>()

const newsStore = useNewsStore()
const {
  params: { slug },
} = useRoute()
const count = computed(() => newsStore.commentCount)
const commentParams = reactive({
  limit: 5,
  offset: 0,
})
const show = ref(false)
const emit = defineEmits<{
  (e: 'on-comment-create', val: any): void
  (e: 'on-load'): void
}>()
</script>
