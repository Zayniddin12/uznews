<template>
  <div
    class="flex items-center justify-center flex-col space-y-5 py-[77px] px-[67px]"
  >
    <img
      src="/svg/empty.svg"
      alt="empty"
      class="block dark:hidden transition-200 -translate-x-2"
    />
    <img
      src="/svg/empty-dark.svg"
      alt="empty"
      class="hidden dark:block transition-200 -translate-x-2"
    />
    <div class="space-y-1">
      <p
        class="text-sm text-center text-blue-700 transition-200 dark:text-white font-bold leading-136"
      >
        {{ $t('empty_title') }}
      </p>
      <p
        class="text-center text-xs transition-200 text-blue-600 dark:text-blue-100 font-normal leading-136"
      >
        {{ $t('empty_subtitle') }}
      </p>
    </div>
  </div>
</template>
