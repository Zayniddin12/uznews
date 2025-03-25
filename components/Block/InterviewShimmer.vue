<template>
  <div>
    <!--    <div class="mb-6">-->
    <!--      <BlockPreloader-->
    <!--        loading-->
    <!--        width="150px"-->
    <!--        height="40px"-->
    <!--        preloader-class="absolute"-->
    <!--      />-->
    <!--      <BlockPreloader-->
    <!--        loading-->
    <!--        width="500px"-->
    <!--        height="35px"-->
    <!--        preloader-class="absolute top-6"-->
    <!--      />-->
    <!--    </div>-->
    <div
      class="p-5 w-full md:max-w-[886px] min-h-[472px] bg-[#F5F5F8] dark:bg-dark-200 rounded-xl relative"
    >
      <BlockPreloader
        loading
        width="120px"
        height="120px"
        preloader-class="absolute left-[44%] top-[33%] rounded-full overflow-hidden"
      />
      <BlockPreloader
        loading
        width="220px"
        height="31px"
        preloader-class="mb-4 absolute bottom-24 "
      />
      <BlockPreloader
        loading
        width="838px"
        height="32px"
        preloader-class="absolute bottom-14"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
