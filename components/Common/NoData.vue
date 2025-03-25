<template>
  <div class="flex items-center justify-center flex-col mb-5">
    <slot name="icon">
      <img class="pointer-events-none" src="/svg/no-data.svg" alt="no-data" />
    </slot>
    <slot name="title">
      <h3
        class="mt-4 font-bold leading-136 text-xl text-blue-700 dark:text-white"
      >
        {{ $t('not_result') }}
      </h3>
    </slot>
    <slot name="text">
      <p class="text-sm text-center leading-136 text-blue-600 dark:text-white">
        {{ $t('not_result_detail') }}
      </p>
    </slot>
  </div>
</template>
