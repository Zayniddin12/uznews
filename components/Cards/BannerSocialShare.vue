<template>
  <div>
    <div
      class="p-3 sm:px-6 sm:py-4 border border-[#52618f33] bg-[#F8FAFC] rounded-lg dark:hover:bg-dark-200 transition-colors duration-300 dark:bg-blue-600 flex flex-col gap-y-2 md:flex-row justify-between md:items-center"
    >
      <div class="flex md:gap-4 items-center">
        <img v-if="type === 'telegram'" src="/svg/telegram.svg" alt="" />
        <img v-else-if="type === 'instagram'" src="/instagram.png" alt="" />
        <img v-else src="/youtube.png" alt="" />

        <i18n-t
          keypath="sign_in_social"
          tag="p"
          class="max-w-[350px] w-full text-dark leading-130 dark:text-white"
        >
          <template #types>
            <a
              :href="link"
              target="_blank"
              class="font-medium hover:text-blue-200 duration-300"
              :class="detectType"
              >{{ type }}</a
            >
          </template>
        </i18n-t>
      </div>
      <a :href="link" target="_blank" :class="detectType" class="relative">
        <button
          :class="type"
          class="btn-social px-5 py-2.5 rounded-lg font-medium text-sm !text-white h-min w-min duration-300 relative"
        >
          <span class="btn-socila-text">{{ $t('enter_page') }}</span>
        </button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'telegram' | 'youtube' | 'instagram'
  link: string
}

const props = defineProps<Props>()

const detectType = computed(() => {
  if (props.type == 'telegram') {
    return 'text-[#00B7EE]'
  }

  if (props.type == 'instagram') {
    return 'text-[#CA07C6]'
  }

  if (props.type == 'youtube') {
    return 'text-[#ED0505]'
  }
})
</script>
<style scoped>
.youtube {
  background: linear-gradient(271deg, #d50404 0%, #f80404 100%);
}
.instagram {
  background: linear-gradient(271deg, #842e96 0%, #fa0da4 100%);
}

.telegram {
  background: linear-gradient(271deg, #00759f 0%, #00b7ed 100%);
}
.youtube:after,
.instagram:after,
.telegram:after {
  content: '';
  opacity: 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  transition: opacity 0.3s;
  background-color: #52618f;
  color: white !important;
}
.telegram:hover:after,
.youtube:hover:after,
.instagram:hover:after {
  opacity: 1;
  color: white !important;
}
.btn-socila-text {
  z-index: 3;
  position: inherit;
}
</style>
