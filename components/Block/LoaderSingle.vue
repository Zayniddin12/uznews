<template>
  <main class="w-full">
    <div class="mb-1">
      <BlockPreloader :loading="true" width="100%" height="32px" />
    </div>
    <BlockPreloader :loading="true" width="90%" height="32px" />
    <div class="my-4 flex items-center gap-4">
      <BlockPreloader :loading="true" width="114px" height="16px" />
      <BlockPreloader :loading="true" width="40px" height="16px" />
    </div>
    <div
      class="mb-6 flex flex-col gap-2 w-full md:w-full rounded-lg text-dark relative transition-200 group-hover:-translate-y-1"
    >
      <BlockPreloader :loading="true" width="100%" height="24px" />
      <BlockPreloader :loading="true" width="75%" height="24px" />
      <BlockPreloader :loading="true" width="50%" height="24px" />
      <BlockPreloader :loading="true" width="25%" height="24px" />
    </div>
    <BlockPreloader :loading="true" width="100%" height="498px" />
    <div
      class="p-3 my-6 max-w-[682px] mx-auto flex flex-col gap-2 w-full md:w-full rounded-lg text-dark relative transition-200 group-hover:-translate-y-1"
    >
      <div v-for="(item, index) in 10" :key="index">
        <BlockPreloader :loading="true" width="100%" height="24px" />
      </div>
    </div>
    <BlockPreloader :loading="true" width="100%" height="498px" />
    <div
      class="p-3 my-6 max-w-[682px] mx-auto flex flex-col gap-2 w-full md:w-full rounded-lg text-dark relative transition-200 group-hover:-translate-y-1"
    >
      <div v-for="(item, index) in 10" :key="index">
        <BlockPreloader :loading="true" width="100%" height="24px" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
