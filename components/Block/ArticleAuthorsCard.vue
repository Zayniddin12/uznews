<template>
  <div
      class="w-full md:w-[431px] h-[390px] bg-[#F5F5F8] dark:bg-dark-200 rounded-0.5 relative overflow-hidden"
  >
    <div class="sticky top-0 left-0 w-full">
      <BlockPreloader
          loading
          width="100%"
          height="242px"
          border-radius="rounded-b-none"
      />
    </div>
    <div class="p-5">
      <BlockPreloader loading width="174px" height="18px" preloader-class="mb-2" />
      <div class="flex flex-col items-start gap-y-1 mb-5">
        <BlockPreloader loading width="100%" height="18px" />
        <BlockPreloader loading width="89%" height="18px" />
      </div>
      <BlockPreloader loading width="101px" height="18px" />
    </div>
  </div>
</template>
