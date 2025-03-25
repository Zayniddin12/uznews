<template>
  <div>
    <div>
      <div class="flex w-full items-center justify-between mb-3">
        <div class="w-1/2 flex gap-2.5">
          <img
            v-if="innerAvatar"
            class="rounded-full block shrink-0 w-[33px] h-[33px] object-cover"
            width="33"
            height="33"
            :src="innerAvatar"
            alt=""
            @error="innerAvatar = null"
          />
          <img
            v-else
            class="rounded-full block shrink-0 w-[33px] h-[33px] object-cover"
            width="33"
            height="33"
            src="/images/default/avatar.png"
            alt="image"
          />
          <div>
            <p
              class="font-semibold leading-130 tracking-[-0.32px] text-base text-blue-700 dark:text-white"
            >
              {{ data.user.full_name }}
            </p>
            <p class="text-gray-200 text-xs dark:text-gray-100">
              <!--              {{ dayjs(data?.created_at).fromNow() }}-->
              {{ getTimeText(data?.created_at) }}
            </p>
          </div>
        </div>
        <CommentsVote
          :id="data?.id"
          :count="data?.rate_count"
          :fetcher="fetcher"
        />
      </div>

      <p
        class="text-base overflow-scroll scrollbar-none text-blue-600 font-medium leading-140 tracking-[-0.32px] dark:text-white"
      >
        {{ data.comment }}
      </p>
      <div class="flex items-center gap-4">
        <button
          class="text-[#919299] hover:text-blue-200 duration-300"
          @click="data.is_open = !data.is_open"
        >
          {{ $t('answering') }}
        </button>
        <button
          v-if="data?.status === 'accepted'"
          class="text-[#919299] flex-center duration-300 hover:text-gray-200"
          @click="handleShowComplain(data?.id)"
        >
          ...
        </button>
        <ModalComplaintModal
          :id="selectedID"
          :show="complaintModal"
          @close="complaintModal = false"
        >
        </ModalComplaintModal>
      </div>
      <button
        v-if="!childComment && data?.answers_count"
        class="text-[#48A4E3]"
        @click="openAnswers = !openAnswers"
      >
        {{ $t('answers_count', { count: data?.answers_count }) }}
      </button>
      <CommentsCommentUpload
        v-if="data?.is_open"
        without-header
        @on-comment-create="
          (e) => emit('on-comment-create', { parent: data?.id, comment: e })
        "
      />
      <CollapseTransition :duration="150" easing="linear" dimension="height">
        <div
          v-if="openAnswers"
          class="ml-12 relative before:content-[''] before:absolute before:h-full before:w-px before:bg-[#D1D5D9] before:-ml-12"
        >
          <template v-if="data?.children?.length">
            <CommentsCommentUser
              v-for="(item, ind) in data?.children"
              :key="ind"
              :index="ind"
              class="mt-8 w-full"
              :data="item"
              :child-comment="true"
              :fetcher="fetcher"
              @on-comment-create="(e) => emit('on-comment-create', e)"
            />
          </template>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'

import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
dayjs.extend(RelativeTime)
dayjs.locale(locale.value === 'uz' ? 'uz-latn' : locale.value)

interface itemData {
  user_img: String
  full_name: String
  comment_text: String
  commnet_child: itemData
  time: String
  images: String[]
}
interface Prop {
  data?: itemData
  index: Number
  childComment?: Boolean
  fetcher?: Function
}

const props = defineProps<Prop>()
const emit = defineEmits<{
  (e: 'on-comment-create', val: any): void
}>()

const isFocus = ref<Boolean>(false)
const openAnswers = ref<Boolean>(false)
const isChildTextOpen = ref<Boolean>(false)
const ischildCommnet = ref<Boolean>(false)
const innerAvatar = ref<String>(props.data?.user?.avatar)

const selectedID = ref(null)
const complaintModal = ref(false)

function onSubmit(id: number) {
  if (props.data?.children.length) {
    isFocus.value = !isFocus.value
  } else {
    isChildTextOpen.value = !isChildTextOpen.value
  }
}

function childonSubmit(item: number) {
  emit('childIsOpen', props.index, item)
}

function childCommnetAdd(item: any) {
  console.log(item, props.index)
  emit('itemCommnetChildAdd', item)
  ischildCommnet.value = false
  isChildTextOpen.value = false
}
function handleShowComplain(value: number) {
  selectedID.value = value
  complaintModal.value = true
}
</script>

<style scoped></style>
