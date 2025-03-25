<template>
  <div
    class="p-4 dark:bg-dark-200 flex-col gap-2 h-[261px] sm:p-5 bg-[#F5F5F8] w-[433px] rounded-lg text-dark relative transition-200 group-hover:-translate-y-1 flex justify-between"
  >
    <div>
      <BlockPreloader
        :loading="true"
        width="56px"
        height="40px"
        class="!float-right"
        preloader-class="absolute right-4"
      />
    </div>
    <div class="flex flex-col gap-1">
      <BlockPreloader :loading="true" width="385px" height="24px" />
      <BlockPreloader :loading="true" width="240px" height="24px" />
    </div>
    <!-- no need to set :loading="true" just loading -->
  </div>
</template>
