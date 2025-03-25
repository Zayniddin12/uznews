<template>
  <div
    class="bg-white py-3 dark:bg-blue-700 transition-200 border-b-[0.5px] border-blue-200/[25%]"
  >
    <div class="container flex-y-center justify-between">
      <LayoutHeaderLogo />
      <div class="flex-y-center space-x-3">
        <LayoutHeaderMain />
        <hr class="relative h-6 w-px bg-blue-100/20 border-0" />
        <LanguageSwitcher />
        <hr class="relative h-6 w-px bg-blue-100/20 border-0" />
        <CommonThemeTrigger />
        <hr class="relative h-6 w-px bg-blue-100/20 border-0" />
        <div class="flex-y-center space-x-3">
          <a href="https://t.me/UznewsSendBot" target="_blank">
            <CommonButton variant="light" button-class="hover:!bg-blue-200 !px-3 sm:px-5">
              <span
                class="relative text-blue-200 inline-block icon-plus text-lg group-hover:text-white font-medium mr-1.5 leading-20 dark:text-blue-100 transition-200 ease-in-out"
              />
              <span
                class="text-sm font-medium leading-20 dark:text-white group-hover:text-white transition-200 ease-in"
              >
                {{ $t('news') }}
              </span>
            </CommonButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
