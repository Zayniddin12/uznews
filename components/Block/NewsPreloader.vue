<template>
  <div
    class="w-full md:w-[280px] h-[312px] bg-[#F5F5F8] dark:bg-dark-200 rounded-lg relative overflow-hidden"
  >
    <div class="sticky top-0 left-0 w-full">
      <BlockPreloader
        loading
        width="100%"
        height="152px"
        border-radius="rounded-b-none"
      />
    </div>
    <div class="pt-3 p-4">
      <div class="flex-y-center gap-3 mb-3">
        <BlockPreloader loading width="80px" height="24px" />
        <BlockPreloader loading width="80px" height="24px" />
      </div>
      <div class="flex flex-col items-start gap-y-1 mb-3">
        <BlockPreloader loading width="100%" height="18px" />
        <BlockPreloader loading width="89%" height="18px" />
        <BlockPreloader loading width="70%" height="18px" />
      </div>
      <div class="flex-y-center gap-5 mb-3">
        <BlockPreloader loading width="31px" height="14px" />
        <BlockPreloader loading width="31px" height="14px" />
      </div>
    </div>
  </div>
</template>
