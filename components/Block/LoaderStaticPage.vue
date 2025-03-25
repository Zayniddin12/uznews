<template>
  <div class="max-w-[784px] px-4 mx-auto mb-10 md:mb-16">
    <BlockPreloader loading width="100%" height="36px" />
    <div class="mt-5 flex flex-col gap-[6px]">
      <BlockPreloader
        v-for="el in 6"
        :key="el"
        loading
        width="100%"
        height="32px"
      />
    </div>
    <div class="mt-5 flex flex-col gap-[6px]">
      <BlockPreloader
        v-for="el in 6"
        :key="el"
        loading
        width="100%"
        height="32px"
      />
    </div>
    <div class="mt-5 flex flex-col gap-[6px]">
      <BlockPreloader
        v-for="el in 6"
        :key="el"
        loading
        width="100%"
        height="32px"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
