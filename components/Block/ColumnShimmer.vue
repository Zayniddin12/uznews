<template>
  <div class="w-[274px] h-[250px] rounded-lg bg-white-100 p-4 dark:bg-dark-200">
    <div class="flex flex-col gap-3 h-full">
      <BlockPreloader loading width="100%" height="23px" />
      <div class="flex flex-col gap-1">
        <BlockPreloader loading width="100%" height="16px" />
        <BlockPreloader loading width="100%" height="16px" />
        <BlockPreloader loading width="100%" height="16px" />
        <BlockPreloader loading width="50%" height="16px" />
      </div>

      <BlockPreloader loading width="100%" height="1px" class="mt-5" />

      <div class="mt-4">
        <div class="flex items-center gap-2">
          <BlockPreloader
            loading
            width="44px"
            height="44px"
            borderRadius="100%"
          />
          <div class="flex flex-col gap-1.5 w-full">
            <BlockPreloader loading width="124px" height="16px" />
            <div class="flex gap-1.5">
              <BlockPreloader loading width="46px" height="16px" />
              <BlockPreloader
                loading
                width="4px"
                height="4px"
                borderRadius="100%"
              />
              <BlockPreloader loading width="79px" height="16px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
