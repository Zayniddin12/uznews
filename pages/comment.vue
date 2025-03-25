<template>
  <!-- COMMENT SECTION -->
  <div class="container">
    <div class="mt-4">
      <CommentsCommentUpload @ItemCommnetAdd="itemCommnetAdd" />
      <CommentsCommentRecursion
        :data="dataCommnets"
        @itemCommnetChildAdd="itemCommnetChildAdd"
        @childCommnetOpen="childCommnetOpen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import img from '~/assets/images/user.jpg'
// import ContactModal from "~/components/Modal/ContactModal.vue";
const dataCommnets = ref([
  {
    id: 1,
    last_name: 'Eljahon',
    first_name: "Normo'minov",
    comment_text:
      'Все где присутствует слово Яндекс вызывает лишь отвращение... интересно с чем это связано ?',
    user_img: img,
    images: [],
    time: '30 минут назад',
    comment_child: [
      {
        id: 10,
        last_name: 'Eljahon',
        first_name: "Normo'minov",
        comment_text:
          'Все где присутствует слово Яндекс вызывает лишь отвращение... интересно с чем это связано ?',
        user_img: img,
        isOpen: false,
        images: [],
        time: '30 минут назад',
      },
    ],
  },
  {
    id: 2,
    last_name: 'Eljahon',
    first_name: "Normo'minov",
    user_img: img,
    images: [],
    time: '30 минут назад',
    comment_text:
      'Все где присутствует слово Яндекс вызывает лишь отвращение... интересно с чем это связано ?',
    comment_child: [
      {
        id: 20,
        isOpen: false,
        last_name: 'Eljahon',
        first_name: "Normo'minov",
        comment_text:
          'Все где присутствует слово Яндекс вызывает лишь отвращение... интересно с чем это связано ?',
        user_img: img,
        images: [],
        time: '30 минут назад',
      },
    ],
  },
  {
    id: 3,
    last_name: 'Eljahon',
    first_name: "Normo'minov",
    user_img: img,
    images: [],
    time: '30 минут назад',
    comment_child: [
      {
        id: 30,
        last_name: 'Eljahon',
        first_name: "Normo'minov",
        user_img: img,
        isOpen: false,
        images: [],
        time: '30 минут назад',
        comment_text:
          'Все где присутствует слово Яндекс вызывает лишь отвращение... интересно с чем это связано ?',
      },
    ],
  },
])
const show = ref<Boolean>(false)
function onSubmit() {}
function childUploadCloce(array: any) {
  return array.map((el: any) => {
    return {
      ...el,
      isOpen: false,
    }
  })
}
function itemCommnetChildAdd(item: any) {
  console.log(item)
  const { id, _data } = item
  for (let i = 0; i < dataCommnets.value.length; i++) {
    if (dataCommnets.value[i].id === id) {
      dataCommnets.value[i].comment_child.push({ ..._data, user_img: img })
      dataCommnets.value[i].comment_child = childUploadCloce(
        dataCommnets.value[i].comment_child
      )
    }
  }
}
function itemCommnetAdd(item: any) {
  const _item_commnet_data = {
    ...item,
    comment_child: [],
    user_img: img,
    id: dataCommnets.value.length + 1,
  }
  console.log(_item_commnet_data)
  dataCommnets.value.push(_item_commnet_data)
}
function childCommnetOpen(perentInd: number, childInd: number) {
  console.log(perentInd, childInd)
  dataCommnets.value[perentInd].comment_child = dataCommnets.value[
    perentInd
  ].comment_child.map((el, ind) => {
    if (childInd === ind) {
      return {
        ...el,
        isOpen: true,
      }
    } else return el
  })
  console.log(dataCommnets.value[perentInd].comment_child)
}
</script>
