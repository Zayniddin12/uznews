<template>
  <div
    class="p-2 rounded-2xl sm:w-[376px] relative"
    :class="[
      type === 'success'
        ? 'bg-green-200 border-[#B1E5BB]'
        : '!bg-[#c63e3e] !text-white',
    ]"
  >
    <div class="flex items-center gap-3">
      <div
        class="flex-center"
        :class="[
          type === 'success'
            ? 'bg-green-300 w-10 h-10 rounded-xl'
            : 'hidden, !text-white',
        ]"
      >
        <svg
          :class="[type === 'success' ? 'block' : 'hidden text-white']"
          width="22"
          height="22"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            r="10.5"
            stroke="white"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 14L12.8333 16.3334L17.5 11.6667"
            stroke="white"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div
          class="border border-solid border-red rounded-full bg-red"
          :class="[type === 'success' ? 'hidden' : 'block']"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.1528 9.84668C28.2634 9.95698 28.3511 10.088 28.411 10.2323C28.4709 10.3766 28.5017 10.5312 28.5017 10.6874C28.5017 10.8436 28.4709 10.9983 28.411 11.1426C28.3511 11.2868 28.2634 11.4179 28.1528 11.5282L11.5278 28.1532C11.3048 28.3762 11.0024 28.5014 10.687 28.5014C10.3717 28.5014 10.0693 28.3762 9.8463 28.1532C9.62332 27.9302 9.49805 27.6278 9.49805 27.3124C9.49805 26.9971 9.62332 26.6947 9.8463 26.4717L26.4713 9.84668C26.5816 9.73609 26.7126 9.64835 26.8569 9.58848C27.0012 9.52862 27.1558 9.4978 27.312 9.4978C27.4682 9.4978 27.6229 9.52862 27.7672 9.58848C27.9114 9.64835 28.0425 9.73609 28.1528 9.84668Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.84692 9.84668C9.73633 9.95698 9.64859 10.088 9.58873 10.2323C9.52886 10.3766 9.49805 10.5312 9.49805 10.6874C9.49805 10.8436 9.52886 10.9983 9.58873 11.1426C9.64859 11.2868 9.73633 11.4179 9.84692 11.5282L26.4719 28.1532C26.6949 28.3762 26.9973 28.5014 27.3127 28.5014C27.628 28.5014 27.9304 28.3762 28.1534 28.1532C28.3764 27.9302 28.5017 27.6278 28.5017 27.3124C28.5017 26.9971 28.3764 26.6947 28.1534 26.4717L11.5284 9.84668C11.4181 9.73609 11.2871 9.64835 11.1428 9.58848C10.9985 9.52862 10.8439 9.4978 10.6877 9.4978C10.5315 9.4978 10.3768 9.52862 10.2325 9.58848C10.0883 9.64835 9.95723 9.73609 9.84692 9.84668Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <p
        class="max-w-[248px] font-medium text-sm leading-20"
        :class="[type === 'success' ? 'text-[#373C3B]' : 'text-white']"
      >
        {{ message }}
      </p>
    </div>
    <button
      class="absolute right-4 group"
      :class="[type === 'success' ? 'top-4' : 'top-[13px]']"
    >
      <i
        class="icon-close group-hover:text-green transition-200 text-2xl"
        :class="[
          type === 'success'
            ? 'text-black/50'
            : 'text-white group-hover:!text-red-200',
        ]"
      ></i>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  type: 'success' | 'error'
}
defineProps<Props>()
</script>

<style>
.error {
  background: red !important;
}

.Vue-Toastification__toast {
  display: block;
  position: relative;
  max-height: 800px;
  min-height: 64px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  justify-content: space-between;
  font-family: 'Lato', Helvetica, 'Roboto', Arial, sans-serif;
  max-width: 600px;
  min-width: 326px;
  pointer-events: auto;
  overflow: hidden;
  transform: translateZ(0);
  direction: ltr;
  background: none;
}
.Vue-Toastification__icon {
  display: none;
}
.Vue-Toastification__close-button {
  display: none;
}
</style>
