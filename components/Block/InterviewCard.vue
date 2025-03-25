<template>
  <div
    class="w-full md:max-w-[886px] min-h-[160px] bg-[#F5F5F8] dark:bg-dark-200 rounded-xl flex gap-6 items-center"
  >
    <div>
      <BlockPreloader loading width="274px" height="160px" preloader-class="" />
    </div>
    <div>
      <BlockPreloader
        loading
        width="100px"
        height="32px"
        preloader-class="mb-2"
      />
      <BlockPreloader loading width="572px" height="56px" preloader-class="" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
