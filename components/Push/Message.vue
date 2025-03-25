<template>
  <div class="inline">
    <Transition name="fade">
      <div
        v-if="showPush"
        class="fixed top-0 left-0 h-screen w-full bg-[#191F2ECC] z-50 flex items-center justify-center"
      ></div>
    </Transition>

    <Transition name="modal-in">
      <div
        v-if="showPush"
        class="fixed top-0 left-0 h-screen w-full z-[51] flex-center px-4"
      >
        <div class="py-[100px] relative flex">
          <div
            class="relative mx-auto max-w-[450px] flex flex-col items-center bg-[white] p-3 sm:p-7 rounded-xl"
          >
            <div
              class="absolute -top-10 right-0 sm:-top-8 sm:-right-8 hover:cursor-pointer z-100"
              @click="closePush()"
            >
              <i class="icon icon-close text-3xl text-blue-100"></i>
            </div>
            <div class="-mt-[120px]">
              <img src="../../assets/images/bell.png" alt="bell" />
            </div>
            <div class="text-center">
              <p class="text-blue-700 text-lg sm:text-2xl font-bold">
                {{ $t('first_to_know') }}
              </p>
              <p class="text-sm">
                {{ $t('subscribe_to_news') }}
              </p>
            </div>
            <div class="w-full sm:w-auto mt-8 sm:mt-11">
              <div>
                <NuxtLink :to="'/subscribe'" @click="closePush()">
                  <CommonButton
                    variant="secondary"
                    class="flex gap-1.5 sm:max-w-[326px] w-full md:w-[326px] hover:bg-blue-200/20 dark:hover:bg-blue-200/[16%] !mr-0"
                  >
                    <div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.25 7.5V10.5H15.75V7.5H14.25ZM3.75 10.5V7.5H2.25V10.5H3.75ZM9 15.75C7.56458 15.75 6.56347 15.7484 5.80812 15.6469C5.07435 15.5482 4.68577 15.3678 4.40901 15.091L3.34835 16.1516C3.95027 16.7536 4.70814 17.0125 5.60825 17.1335C6.48678 17.2516 7.60699 17.25 9 17.25V15.75ZM2.25 10.5C2.25 11.893 2.24841 13.0132 2.36652 13.8918C2.48754 14.7919 2.74643 15.5497 3.34835 16.1516L4.40901 15.091C4.13225 14.8142 3.9518 14.4257 3.85315 13.6919C3.75159 12.9365 3.75 11.9354 3.75 10.5H2.25ZM14.25 10.5C14.25 11.9354 14.2484 12.9365 14.1469 13.6919C14.0482 14.4257 13.8678 14.8142 13.591 15.091L14.6517 16.1516C15.2536 15.5497 15.5125 14.7919 15.6335 13.8918C15.7516 13.0132 15.75 11.893 15.75 10.5H14.25ZM9 17.25C10.393 17.25 11.5132 17.2516 12.3918 17.1335C13.2919 17.0125 14.0497 16.7536 14.6517 16.1516L13.591 15.091C13.3142 15.3678 12.9257 15.5482 12.1919 15.6469C11.4365 15.7484 10.4354 15.75 9 15.75V17.25ZM9 2.25C10.4354 2.25 11.4365 2.25159 12.1919 2.35315C12.9257 2.4518 13.3142 2.63225 13.591 2.90901L14.6517 1.84835C14.0497 1.24643 13.2919 0.987539 12.3918 0.866523C11.5132 0.748407 10.393 0.75 9 0.75V2.25ZM15.75 7.5C15.75 6.10699 15.7516 4.98678 15.6335 4.10825C15.5125 3.20814 15.2536 2.45027 14.6517 1.84835L13.591 2.90901C13.8678 3.18577 14.0482 3.57434 14.1469 4.30812C14.2484 5.06347 14.25 6.06458 14.25 7.5H15.75ZM9 0.75C7.60699 0.75 6.48678 0.748407 5.60825 0.866523C4.70814 0.987539 3.95027 1.24643 3.34835 1.84835L4.40901 2.90901C4.68577 2.63225 5.07434 2.4518 5.80812 2.35315C6.56347 2.25159 7.56458 2.25 9 2.25V0.75ZM3.75 7.5C3.75 6.06458 3.75159 5.06347 3.85315 4.30812C3.9518 3.57434 4.13225 3.18577 4.40901 2.90901L3.34835 1.84835C2.74643 2.45027 2.48754 3.20814 2.36652 4.10825C2.24841 4.98678 2.25 6.10699 2.25 7.5H3.75Z"
                          fill="#52618F"
                        />
                        <path
                          d="M11.25 14.25H6.75"
                          stroke="#52618F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <p>{{ $t('download_app') }}</p>
                  </CommonButton></NuxtLink
                >
              </div>
              <div class="mt-4">
                <NuxtLink :to="'/subscribe'" @click="closePush()">
                  <CommonButton
                    variant="primary-dark"
                    class="flex gap-1.5 w-full hover:bg-blue-600"
                  >
                    <div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5817 9.06405L13.9506 9.46938V9.46938L14.5817 9.06405ZM2.58777 10.3571L1.95673 9.95182L2.58777 10.3571ZM3.41835 9.06405L2.78731 8.65872H2.78731L3.41835 9.06405ZM14.2722 13.5172L14.068 12.7955L14.2722 13.5172ZM3.72777 13.5172L3.93204 12.7955H3.93204L3.72777 13.5172ZM13.3118 6.75372V7.28218H14.8118V6.75372H13.3118ZM13.9506 9.46938L14.7812 10.7625L16.0433 9.95182L15.2127 8.65872L13.9506 9.46938ZM3.21881 10.7625L4.04939 9.46938L2.78731 8.65872L1.95673 9.95182L3.21881 10.7625ZM4.68815 7.28218V6.75372H3.18815V7.28218H4.68815ZM14.068 12.7955C10.7497 13.7348 7.25027 13.7348 3.93204 12.7955L3.5235 14.2388C7.10884 15.2537 10.8912 15.2537 14.4765 14.2388L14.068 12.7955ZM4.04939 9.46938C4.46691 8.81934 4.68815 8.05837 4.68815 7.28218H3.18815C3.18815 7.77436 3.04766 8.25339 2.78731 8.65872L4.04939 9.46938ZM13.3118 7.28218C13.3118 8.05837 13.5331 8.81934 13.9506 9.46938L15.2127 8.65872C14.9523 8.25339 14.8118 7.77436 14.8118 7.28218H13.3118ZM1.95673 9.95182C0.940345 11.5342 1.69417 13.721 3.5235 14.2388L3.93204 12.7955C3.1224 12.5664 2.71789 11.5423 3.21881 10.7625L1.95673 9.95182ZM14.7812 10.7625C15.2821 11.5423 14.8776 12.5664 14.068 12.7955L14.4765 14.2388C16.3058 13.721 17.0597 11.5342 16.0433 9.95182L14.7812 10.7625ZM9 2.25C11.3553 2.25 13.3118 4.23984 13.3118 6.75372H14.8118C14.8118 3.4645 12.2359 0.75 9 0.75V2.25ZM9 0.75C5.76415 0.75 3.18815 3.4645 3.18815 6.75372H4.68815C4.68815 4.23984 6.64469 2.25 9 2.25V0.75Z"
                          fill="white"
                        />
                        <path
                          d="M5.625 14.25C6.11627 15.5608 7.44184 16.5 9 16.5C10.5582 16.5 11.8837 15.5608 12.375 14.25"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <p>{{ $t('subscribe') }}</p>
                  </CommonButton>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const showPush = ref(false)

onMounted(() => {
  const PushMessage = localStorage.getItem('PushMessage')

  if (!PushMessage) {
    setTimeout(() => {
      showPush.value = true
      localStorage.setItem('PushMessage', 'true')
    }, 300)
  }

  watchEffect(() => {
    if (showPush.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  })
})

function closePush() {
  showPush.value = false
}
</script>

<style scoped>
.modal-in-enter-active {
  animation: modal 300ms ease-out;
}

.modal-in-leave-active {
  animation: modal 300ms ease-in reverse;
}

@keyframes modal {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
