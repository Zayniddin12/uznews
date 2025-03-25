<template>
  <div
    class="w-[433px] h-[248px] md:h-[261px] p-4 bg-[#F5F5F8] dark:bg-dark-200 rounded-lg relative flex justify-start items-end"
  >
    <div class="w-full">
      <BlockPreloader
        loading
        width="46px"
        height="28px"
        preloader-class="mb-3"
      />
      <BlockPreloader
        loading
        width="94%"
        height="24px"
        preloader-class="mb-2"
      />
      <BlockPreloader loading width="78%" height="24px" />
    </div>
  </div>
</template>
