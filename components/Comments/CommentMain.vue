<template>
  <!-- COMMENT SECTION -->
  <div class="mt-4">
    <CommentsCommentUpload
      :key="reInit"
      :comments="comments"
      @on-comment-create="(e) => onCommentCreate({ comment: e })"
      @filter-comment="handleDropdown"
    />
    <CommentsCommentRecursion
      :data="comments"
      :fetcher="newsStore.fetchNewsComment"
      @on-comment-create="onCommentCreate"
      @on-load="loadMore"
    />
    <AuthMain />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { useRoute } from '#app'
import { useAuthStore } from '~/store/auth'
import { useNewsStore } from '~/store/news'

interface Props {
  singleId: number | string
  singleType: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-comment-create', val: string): void
}>()

const route = useRoute()
const authStore = useAuthStore()
const newsStore = useNewsStore()

const authSate = computed(() => authStore.auth)
const count = computed(() => newsStore.commentCount)
const comments = computed(() => newsStore.newsCommentList)
const reInit = ref(false)
const {
  params: { slug },
} = useRoute()

const commentParams = reactive({
  limit: 5,
  offset: 0,
})

function onCommentCreate(val: string) {
  const body = new FormData()
  console.log(body)
  if (val?.parent) {
    body.append('parent', val?.parent)
  }
  body.append('comment', val?.comment)
  body.append(props.singleType, '' + props.singleId)
  if (!authSate.value.loggedIn) {
    authStore.showLoginModalAction()
  } else {
    useApi()
      .$post('news/CommentCreate/', {
        body,
      })
      .then((res) => {
        reInit.value = !reInit.value
        newsStore.fetchNewsComment(newsStore.params, slug as string)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() =>
        newsStore.fetchNewsComment(newsStore.params, slug as string)
      )
  }
}

const handleDropdown = (param) => {
  for (const key in commentParams) {
    if (key !== 'limit') {
      delete commentParams[key]
    }
  }
  commentParams[param] = true
  commentParams.offset = 0
  newsStore.fetchNewsComment(commentParams, String(slug))
}

const loadMore = () => {
  if (comments.value?.length < count.value) {
    commentParams.offset += 5
    newsStore.fetchNewsComment(commentParams, slug as string, true)
  }
}
newsStore.fetchNewsComment(commentParams, String(slug))
</script>
