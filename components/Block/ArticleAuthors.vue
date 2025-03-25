<template>
  <div class="grid md:grid-cols-12 md:gap-8 py-8">
    <div class="col-span-12 md:col-span-9">
      <BlockPreloader
        loading
        width="267px"
        height="47px"
        preloader-class="mb-2"
      />
      <div class="flex flex-col items-start gap-2 mb-4">
        <BlockPreloader loading width="100%" height="16px" />
        <BlockPreloader loading width="59%" height="16px" />
      </div>
      <BlockPreloader
        loading
        width="274px"
        height="36px"
        preloader-class="mb-8"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <BlockArticleAuthorsCard v-for="item in 6" :key="item" />
      </div>
    </div>
    <div class="col-span-12 md:col-span-3">
      <BlockOtherAuthor class="mb-6" />
      <BlockPreloader loading width="274px" height="584px" />
    </div>
  </div>
</template>
