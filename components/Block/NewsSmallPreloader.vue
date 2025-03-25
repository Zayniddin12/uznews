<template>
  <div
    class="w-full md:w-[376px] h-[101px] rounded-lg relative overflow-hidden"
  >
    <div class="flex items-start gap-4">
      <BlockPreloader loading width="100px" height="100px" />
      <div class="flex flex-col justify-between">
        <div class="flex-y-center gap-4 mb-[11px]">
          <BlockPreloader loading width="80px" height="24px" />
          <BlockPreloader loading width="80px" height="24px" />
        </div>
        <div>
          <BlockPreloader
            loading
            width="178px"
            height="18px"
            preloader-class="mb-1"
          />
          <BlockPreloader
            loading
            width="240px"
            height="18px"
            preloader-class="mb-1"
          />
          <BlockPreloader loading width="240px" height="18px" />
        </div>
      </div>
    </div>
  </div>
</template>
