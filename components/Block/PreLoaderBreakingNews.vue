<template>
  <div class="flex flex-y-center overflow-x-hidden">
    <BlockPreloader loading width="192px" height="52px" />
    <div class="ml-8 flex space-x-6">
      <BlockPreloader
        v-for="el of 4"
        :key="el"
        loading
        width="300px"
        height="30px"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
