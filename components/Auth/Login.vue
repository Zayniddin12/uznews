<template>
  <div class="min-h-[450px] overflow-scroll noscrollbar">
    <form @submit.prevent="submitForm">
      <FormGroup
        label="phone_or_email"
        for-text="full_name"
        class="!text-blue-200 mb-5"
      >
        <FormInput
          id="full_name"
          v-model="form.values.phoneOrEmail"
          :error="form.$v.value.phoneOrEmail.$error"
          :placeholder="$t('phone_or_email_placeholder')"
          input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
        />
      </FormGroup>
      <FormGroup
        label="password"
        for-text="password"
        class="!text-blue-200 mb-4"
      >
        <FormInput
          id="password"
          v-model="form.values.password"
          :error="form.$v.value.password.$error"
          :placeholder="$t('password')"
          input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
        />
      </FormGroup>
      <FormCheckbox class="mb-7" for-text="remember_me" label="remember_me" />

      <VueRecaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" />
      <CommonButton
        class="mt-6 w-full py-3 !bg-blue-200 !text-white !font-medium !text-base !leading-125"
        :text="$t('login')"
        :button-type="captchaToken || success ? undefined : 'gray'"
        button-class="rounded-lg"
        :type="'submit'"
      />
      <div class="flex-y-center gap-[10px] my-3">
        <span class="w-full h-[1px] bg-gray-300" />
        <span
          class="text-sm text-blue-200 dark:text-white leading-130 font-semibold"
          >{{ $t('or') }}</span
        >
        <span class="w-full h-[1px] bg-gray-300" />
      </div>
      <div class="flex-y-center gap-4 mb-7">
        <button
          type="button"
          class="w-full py-[10px] rounded bg-gray-300 hover:bg-gray-300/50 dark:bg-dark-200 dark:hover:bg-dark-200/60 transition-200 flex-center gap-[7px]"
          @click="loginWithGoogle"
        >
          <AuthGoogleSvg />
          <span
            class="text-blue-700 dark:text-blue-100 text-sm leading-130 font-medium"
            >Google</span
          >
        </button>
        <button
          type="button"
          class="w-full py-[10px] rounded bg-gray-300 hover:bg-gray-300/50 dark:bg-dark-200 dark:hover:bg-dark-200/60 transition-200 flex-center gap-[7px]"
          @click="loginWithFacebook"
        >
          <AuthFacebookSvg />
          <span
            class="text-blue-700 dark:text-blue-100 text-sm leading-130 font-medium"
            >Facebook</span
          >
        </button>
      </div>
      <i18n-t
        keypath="terms_use"
        tag="p"
        class="text-center text-sm text-blue-200 dark:text-white leading-130"
      >
        <template #policy_privacy>
          <a
            href="#"
            class="text-blue-700 dark:text-white dark:hover:text-white-200 hover:text-blue-600 transition-200"
            >{{ $t('policy_privacy') }}</a
          >
        </template>
      </i18n-t>
    </form>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { VueRecaptcha } from 'vue3-recaptcha-v2'

import { useHomeStore } from '~/store'
import { useAuthStore } from '~/store/auth'
import useSocialAuth from '~/store/useSocialAuth'
import { IAuthLogin } from '~/types/auth'
import { isValidPhoneOrEmail } from '~/utils'

const { loginWithGoogle, loginWithFacebook, CONFIG, authFacebook } =
  useSocialAuth()
const { showToast } = useCustomToast()
const regPhone = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const success = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const captchaToken = ref('')
const onVerify = (token: string) => {
  captchaToken.value = token
}
const onExpired = () => {
  captchaToken.value = ''
}

const form = useForm<IAuthLogin>(
  {
    password: '',
    phoneOrEmail: '',
  },
  {
    password: { required },
    phoneOrEmail: { required, isValidPhoneOrEmail },
  }
)
const submitForm = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    const token: any = useCookie('token')
    const sendData: any = { ...form.values }
    if (emailRegex.test(sendData.phoneOrEmail)) {
      sendData.email = sendData.phoneOrEmail
    } else if (regPhone.test(sendData.phoneOrEmail)) {
      sendData.phone_number = sendData.phoneOrEmail
    }
    delete sendData.phoneOrEmail
    authStore
      .userLogin(sendData)
      .then((res) => {
        token.value = res?.access
        authStore.fetchMe(token.value)
        emit('close')
      })
      .catch((err) => {
        console.log(err)
        showToast('error', err?._data?.non_field_errors?.[0])
      })
  }
}

interface Props {
  show: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

function closeModal() {
  form.values.password = ''
  form.values.phoneOrEmail = ''
  form.$v.value.$reset()
  success.value = false
  captchaToken.value = ''
  emit('close')
}
</script>

<style>
.noscrollbar::-webkit-scrollbar {
  display: none;
}
.noscrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
