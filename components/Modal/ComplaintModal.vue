<template>
  <div>
    <transition name="fade">
      <div
        v-if="show"
        class="ModalBg fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[1000]"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="show"
        id="ModalBg"
        class="fixed right-0 top-0 w-full h-screen flex items-center justify-center z-[1001] p-[15vh_auto_50px] overflow-auto"
        :class="[bodyClass, animationIn ? 'animated' : '']"
      >
        <div
          id="Modal"
          class="Modal bg-white dark:bg-blue-700 w-full rounded-xl relative"
          :class="[
            maxWidth ? 'max-w-[382px]' : 'max-w-[382px]',
            bodyWrapperClass,
          ]"
        >
          <slot name="header">
            <div
              v-if="title"
              class="flex items-center justify-between py-4 px-5 border-b border-blue-100/20 relative"
              :class="[headerClass, textCenter]"
            >
              <div class="flex-y-center gap-2">
                <slot name="pre-title" />
                <h5
                  class="text-blue-700 dark:text-white text-xl font-bold leading-24"
                  :class="textStyle"
                >
                  {{ title }}
                </h5>
              </div>
              <i
                class="icon-close cursor-pointer text-blue-100 text-2xl hover:text-blue-700 transition-200 ease-in-out"
                @click.stop="close()"
              />
            </div>
          </slot>
          <div
            :class="contentClass"
            class="bg-white rounded-xl dark:bg-blue-700"
          >
            <div
              class="relative flex items-center justify-between border-b border-blue-100/20 py-4 px-5"
            >
              <h5
                class="text-blue-700 dark:text-white text-xl font-bold leading-24"
                :class="textStyle"
              >
                {{ t('complaint') }}
              </h5>
              <button
                class="absolute group right-2 cursor-pointer modal-close bg-dark-500 w-10 h-10 rounded-lg flex items-center justify-center"
                @click.stop="close()"
              >
                <i
                  class="icon-close cursor-pointer text-blue-100 text-2xl hover:text-blue-700 transition-300 ease-in-out dark:hover:text-red"
                />
              </button>
            </div>
            <form class="px-5 py-4" @submit.prevent="submitForm">
              <div
                v-for="(item, index) in labels"
                :key="index"
                class="mb-2 flex gap-2 items-center"
              >
                <input
                  :id="'text' + index"
                  v-model="form.values.detail"
                  class="w-6 h-6 custom-radio cursor-pointer"
                  type="radio"
                  name="age"
                  :value="item.value"
                  @change="handleRadioChange(index)"
                />
                <label
                  :for="'text' + index"
                  class="text-blue-700 dark:text-white text-sm font-normal leading-20 cursor-pointer"
                  >{{ $t(item.label) }}</label
                >
              </div>
              <CollapseTransition :duration="300" dimension="height">
                <FormTextarea
                  v-if="form.values.detail === 'other'"
                  v-model="form.values.comment"
                  :placeholder="$t('enter_message')"
                  input-class="text-gray bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium min-h-[120px]"
                />
              </CollapseTransition>
              <div class="pt-4">
                <VueRecaptcha
                  ref="recaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                />
                <div class="flex w-full mt-6 gap-4">
                  <CommonButton
                    variant="light"
                    class="w-full py-3 bg-gray-300 border-0 text-blue-600"
                    :text="$t('cancel')"
                    type="button"
                    @click="close()"
                  />
                  <CommonButton
                    class="w-full py-3 !bg-blue-200 !text-white !font-medium !text-base !leading-125"
                    :text="$t('submit')"
                    button-class="rounded-lg"
                    :type="success ? 'button' : 'submit'"
                    :disabled="captchaToken || success ? false : true"
                    :button-type="captchaToken || success ? undefined : 'gray'"
                    :class="{
                      'pointer-events-none disabled:!bg-blue-200/10 disabled:hover:bg-blue-200/10 disabled:!text-gray-200':
                        !captchaToken && !success,
                    }"
                  />
                </div>
              </div>
            </form>
          </div>
          <AuthMain />
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { required } from '@vuelidate/validators'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VueRecaptcha } from 'vue3-recaptcha-v2'

import { useCustomToast } from '@/composables/customToast'
import { useAuthStore } from '~/store/auth'

const { showToast } = useCustomToast()
const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()
const authSate = computed(() => authStore.auth)
const showAuth = ref(false)
const success = ref(false)
interface Props {
  id?: number
  show: boolean
  title?: string
  contentClass?: string
  bodyClass?: string
  maxWidth?: string
  bodyWrapperClass?: string
  closeOnBackdrop?: boolean
  headerClass?: string
  textStyle?: string
  textCenter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  contentClass: '',
  bodyClass: 'px-4',
  closeOnBackdrop: true,
})

watch(
  () => props.show,
  (first) => {
    const body = document.body
    if (first) {
      body.classList.add('overflow-hidden')
    } else {
      body.classList.remove('overflow-hidden')
    }
  }
)

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const animationIn = ref(false)
const captchaToken = ref('')

const onVerify = (token: string) => {
  captchaToken.value = token
}

const onExpired = () => {
  captchaToken.value = ''
}

const form = useForm(
  {
    detail: '',
    comment: '',
  },
  {
    detail: { required },
    comment: { required },
  }
)
const handleRadioChange = (index: number) => {
  if (index === labels.value.length - 1) {
    form.values.comment = ''
  } else {
    form.values.comment = ''
  }
}
function submitForm() {
  form.$v.value.$touch()
  if (!authSate.value.loggedIn) {
    authStore.showLoginModalAction()
  } else {
    useApi()
      .$post('news/CommentComplainCreate/', {
        body: {
          text:
            form.values.detail === 'other'
              ? form.values.comment
              : form.values.detail,
          comment: props?.id,
        },
      })
      .then((res) => {
        form.$v.value.$reset()
        success.value = true
        showToast('success', t('finally'))
      })
      .catch((err) => {
        console.log(err)
        showToast('error', t('fail_message'))
      })
      .finally(() => {
        closeModal()
      })
  }
}
// const labels = ref([
//   'adults_content',
//   'offencive_content',
//   'promotion',
//   'doesnt_reality',
//   'other',
// ])

const labels = ref([
  {
    value: 'adults_content',
    label: 'adults_content',
  },
  {
    value: 'offencive_content',
    label: 'offencive_content',
  },
  {
    value: 'promotion',
    label: 'promotion',
  },
  {
    value: 'doesnt_reality',
    label: 'doesnt_reality',
  },
  {
    value: 'other',
    label: 'other',
  },
])
const onMousedown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target.id !== 'Modal' && target.id === 'ModalBg') {
    animationIn.value = true
    setTimeout(() => {
      animationIn.value = false
    }, 500)
  }
}
const keydown = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    close()
  }
}
onMounted(() => {
  document?.addEventListener('mousedown', onMousedown)
  document?.addEventListener('keydown', keydown)
})
onBeforeUnmount(() => {
  document?.removeEventListener('mousedown', onMousedown)
  document?.removeEventListener('keydown', keydown)
})
function closeModal() {
  form.values.detail = 1
  form.$v.value.$reset()
  success.value = true
  captchaToken.value = ''
  emit('close') // Emit the 'close' event
}
</script>

<style>
#Modal {
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 10%);
}
.ModalBg {
  background: rgba(25, 31, 46, 0.8);
}
.modal-close svg circle,
path {
  transition: 0.3s ease-in-out;
}
.modal-close:hover svg circle {
  stroke: #fa0738;
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style scoped>
input[type='radio']:checked {
  box-shadow: 0 0 0 2px #d1d2d5;
  background-color: #d1d2d5;
}
input[type='radio']:checked {
  border: 4px solid #fff;
  background-clip: border-box;
  border-radius: 50%;
  appearance: none;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.error {
  border: 1px solid red;
  background: #000;
}
</style>
