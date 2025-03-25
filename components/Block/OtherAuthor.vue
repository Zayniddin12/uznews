<template>
  <div class="p-5 rounded-lg bg-white-100 dark:bg-dark-200">
    <div class="flex flex-col gap-5 mb-5">
      <BlockPreloader loading width="70%" height="28px" />
      <div v-for="item in 5" :key="item" class="flex items-center gap-3">
        <BlockPreloader
          loading
          width="57px"
          height="57px"
          class="!rounded-full !overflow-hidden"
          preloader-class="rounded-full"
        />
        <BlockPreloader loading width="65%" height="28px" />
      </div>
    </div>
    <BlockPreloader
      loading
      width="100%"
      height="50px"
      class="rounded py-2 !mt-5"
    />
  </div>
</template>
<script setup lang="ts"></script>
