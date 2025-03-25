<template>
  <div class="max-w-[886px]">
    <h1 class="font-bold leading-130 text-blue-600 text-4xl dark:text-white">
      Разборы
    </h1>
    <p class="text-sm leading-136 text-blue-150 dark:text-white">
      Добро пожаловать в раздел "Разборы" на нашем новостном сайте! Здесь вы
      найдете подробные аналитические материалы, которые позволят вам глубже
      понять сложные события и тенденции в мире.
    </p>
    <div class="grid grid-cols-12 sm:gap-x-8 gap-y-6 gap-8 mt-6">
      <CardsAnalise
        class="lg:col-span-4"
        v-for="(item, index) in analysisData"
        :key="index"
        v-bind="{ item }"
        :title="item.title"
        :text="item.text"
        :bg="item.bg"
      />
    </div>
    <CommonButton />
  </div>
</template>

<script lang="ts" setup>
import CardsAnalise from '~/components/Cards/Аnalise.vue'
import { analysisData } from '~/data/fakeData'
</script>
