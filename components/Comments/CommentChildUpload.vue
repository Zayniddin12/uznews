<template>
  <div>
    <div class="relative mt-4 duration-700 border border-[#E5E7EE] p-4 rounded">
      <textarea
        v-model="comment"
        placeholder="Комментарии..."
        class="relative px-3 rounded w-full focus:outline-none"
        :class="{ 'border border-red-400': isCommentEmpty }"
        @focus="InputFocus"
        @blur="InputBlur"
      >
      </textarea>

      <div class="flex gap-1.5 transition duration-700 ease-in-out">
        <div
          v-for="(item, ind) in images"
          :key="ind"
          class="relative w-13 h-13"
        >
          <span
            class="absolute rounded-full -top-2 -right-2 cursor-pointer bg-blue-600 w-5 h-5 text-center item-center"
            @click="itemImageRemove(ind)"
          >
            <i class="icon-close text-white text-xs" @mousedown.prevent></i
          ></span>
          <img
            width="52"
            height="52"
            class="rounded w-13 h-13"
            :src="item"
            alt=""
          />
        </div>
      </div>
      <div class="flex justify-between">
        <div class="mt-2 mb-4 cursor-pointer">
          <i class="absolute icon-gallery text-blue-200 cursor-pointer"></i>
          <input
            class="absolute opacity-0 w-4 h-4 cursor-pointer"
            type="file"
            @mousedown.prevent
            @change="onFileChanged"
          />
        </div>
        <div class="w-1/2 gap-2 flex justify-end">
          <button
            class="cursor-pointer rounded px-3 py-1.5 hover:bg-red-600 hover:text-white duration-700"
            @click="cancel"
            @mousedown.prevent
          >
            Отменить
          </button>
          <button
            class="rounded bg-[#48A4E3] hover:bg-cyan-300 text-white px-3 py-1.5 cursor-pointer duration-700"
            @mousedown.prevent
            @click="onSubmit"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
image upload qilganda chqiadigan textni designi chizilmagan ekan faqat shu case qoldi
va filter chiuzilmagan qanaqa content chiqishi ?
-->

<script setup lang="ts">

interface Props {
  isChild: Boolean
  index: Number
}

const emit = defineEmits(['ItemCommnetChildAdd'])
const props = defineProps<Props>()

const comment = ref<String>('')
const isCommentEmpty = ref<Boolean>(false)
const showText = ref(false)
const isFocus = ref<Boolean>(false)
const images = ref<File[]>([])
const image = ref<File | null>(null)
const toggleText = () => {
  showText.value = !showText.value
}

function onFileChanged(event: Event) {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files
  const fileReader = new FileReader()
  if (files && files.length > 0) {
    image.value = files[0]
    fileReader.onload = function (event: any) {
      images.value.push(event.target.result)
    }
    fileReader.readAsDataURL(image.value)
  } else {
    image.value = null
  }
}

function itemImageRemove(index: number) {
  images.value = images.value.filter((el, ind) => ind !== index)
}

function InputFocus(event: Event) {
  isFocus.value = true
  isCommentEmpty.value = false
}

function InputBlur(event: Event) {
  isFocus.value = false
  isCommentEmpty.value = false
}

function onSubmit() {
  const _data = {
    last_name: 'Eljahon',
    first_name: "Normo'minov",
    comment_text: comment,
    images,
    time: '30 минут назад',
    isOpen: false,
  }
  if (comment.value) {
    emit('ItemCommnetChildAdd', { _data, id: props.index })
  } else {
    isCommentEmpty.value = true
  }
}

function cancel() {
  isCommentEmpty.value = false
}
</script>
