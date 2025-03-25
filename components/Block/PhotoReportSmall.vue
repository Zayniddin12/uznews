<template>
  <div
    class="w-full md:w-[333px] h-[147px] pt-5 p-4 bg-[#F5F5F8] dark:bg-dark-200 rounded-lg relative"
  >
    <BlockPreloader
      loading
      width="124px"
      height="16px"
      preloader-class="mb-1"
    />
    <BlockPreloader
      loading
      width="175px"
      height="16px"
      preloader-class="mb-1"
    />
    <BlockPreloader loading width="175px" height="16px" />
    <div
      class="w-[178px] h-[110px] rounded-[2px] overflow-hidden absolute-y-center -right-[48px]"
    >
      <BlockPreloader loading width="100%" height="100%" />
    </div>
    <BlockPreloader
      loading
      width="32px"
      height="14px"
      preloader-class="absolute bottom-4 left-4"
    />
  </div>
</template>
