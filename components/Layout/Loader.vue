<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="background-shadow-loader w-full h-screen fixed inset-0 z-[99999] flex-center bg-white"
    >
      <div class="flex-y-center relative">
        <svg
          :class="{ '!left-1/2 !translate-x-[-50%]': !fullSvg }"
          class="transition-300 left-[-115px] translate-x-[0] absolute"
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="28"
          viewBox="0 0 54 28"
          fill="none"
        >
          <path
            class="first-part"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M53.8714 27.2519H29.874V22.015L44.4856 6.51917H30.4072V0.748047H53.4446V5.98485L38.8329 21.4807H53.8714V27.2519ZM19.6859 22.9771H18.9393C17.8725 25.435 15.4196 27.6793 10.5672 27.6793C4.70114 27.6793 0.274902 23.458 0.274902 16.5649V0.748047H6.99417V15.9236C6.99417 19.6107 9.12729 21.8014 12.9669 21.8014C17.2865 21.8014 19.5795 19.1297 19.5795 14.4274V0.748047H26.2989V27.2519H19.6859V22.9771Z"
            fill="#A2BCDE"
          />
        </svg>
        <svg
          class="absolute opacity-0 transition-300"
          :class="{ '!opacity-100 translate-x-[-115px]': fullSvg }"
          xmlns="http://www.w3.org/2000/svg"
          width="243"
          height="28"
          viewBox="0 0 243 28"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M242.725 27.2519H218.728V22.0151L233.339 6.51922H219.26V0.748091H242.298V5.98488L227.687 21.4808H242.725V27.2519ZM208.866 22.9771H208.119C207.052 25.435 204.6 27.6793 199.746 27.6793C193.881 27.6793 189.454 23.4581 189.454 16.565V0.748091H196.173V15.9236C196.173 19.6107 198.306 21.8015 202.145 21.8015C206.465 21.8015 208.759 19.1298 208.759 14.4274V0.748091H215.479V27.2519H208.866V22.9771ZM183.216 28C180.336 28 178.149 25.916 178.149 22.9236C178.149 19.9312 180.336 17.8474 183.216 17.8474C186.094 17.8474 188.281 19.9312 188.281 22.9236C188.281 25.916 186.096 28 183.216 28ZM163.972 10.8473L164.879 10.9542C173.358 11.9695 176.505 14.1603 176.505 19.0229C176.505 24.206 171.651 28 164.613 28C157.307 28 153.579 24.2595 151.127 20.5191L156.134 17.1526C157.787 20.626 161.36 22.4427 164.772 22.4427C167.491 22.4427 169.998 21.2672 169.998 19.1831C169.998 17.2062 167.279 16.8321 164.399 16.5114L163.493 16.4045C156.081 15.5496 152.72 13.145 152.72 8.22902C152.72 3.31301 157.2 0 163.333 0C168.773 0 172.613 2.40456 176.185 6.14503L171.331 9.99238C169.306 7.5878 166.639 5.45041 163.119 5.45041C160.613 5.45041 159.226 6.51908 159.226 8.12214C159.226 10.0458 161.199 10.5267 163.972 10.8473ZM136.444 27.2519L132.284 6.51922H131.645L127.485 27.2519H117.886L112.66 0.748091H119.379L122.526 21.4808H123.165L127.325 0.748091H136.604L140.764 21.4808H141.404L144.55 0.748091H151.27L146.044 27.2519H136.444ZM99.1124 22.229C102.845 22.229 104.818 20.145 105.725 18.2748L111.218 21.4809C109.404 24.2595 106.311 28 99.2188 28C91.3261 28 85.6198 22.0152 85.6198 13.7862C85.6198 5.77098 91.1126 0 98.8988 0C106.578 0 111.751 5.39693 111.751 13.3588V15.9771H92.4991C92.7657 19.5038 95.2728 22.229 99.1124 22.229ZM104.925 11.2746C104.445 7.90822 102.311 5.77083 98.8457 5.77083C95.0594 5.77083 93.0863 8.01512 92.5531 11.2746H104.925ZM76.3932 12.0761C76.3932 8.38916 74.26 6.19828 70.4203 6.19828C66.1006 6.19828 63.8079 8.87009 63.8079 13.5723V27.2519H57.0889V0.748091H63.7015V5.02289H64.4475C65.5141 2.56492 67.9673 0.320567 72.8203 0.320567C78.6861 0.320567 83.1129 4.54196 83.1129 11.4351V27.2519H76.3932V12.0761Z"
            fill="#52618F"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// import { useStore } from '~/store'

interface Props {
  customLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  customLoading: undefined,
})

const fullSvg = ref(false)
const loading = ref(true)
// const store = useStore()
// const mainLoading = computed(() => store.mainLoading)

onMounted(() => {
  const body = document.body
  body.style.overflow = 'hidden'
  setTimeout(() => {
    fullSvg.value = true
  }, 1000)

  setTimeout(() => {
    fullSvg.value = true
  }, 1000)

  setTimeout(() => {
    body.style.overflow = ''
    loading.value = false
  }, 2000)
})

watch(
  () => props.customLoading,
  (newValue) => {
    if (typeof newValue !== 'undefined') {
      loading.value = newValue
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.background-shadow-loader {
  backdrop-filter: blur(28px);
}
/* Define the keyframes for animating the first path */
@keyframes animateFirstPath {
  0% {
    fill: #52618f; /* Initial fill color */
  }
  100% {
    fill: #a2bcde; /* Intermediate fill color */
  }
}

.first-part {
  animation: animateFirstPath 1s linear forwards;
  animation-iteration-count: 2;
}
</style>
