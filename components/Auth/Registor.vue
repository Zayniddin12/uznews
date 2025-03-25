<template>
  <div class="min-h-[450px]">
    <form @submit.prevent="submitForm">
      <FormGroup
        label="full_name"
        for-text="full_name"
        class="!text-blue-200 mb-5"
      >
        <FormInput
          id="full_name"
          v-model="form.values.full_name"
          :error="form.$v.value.full_name.$error"
          :placeholder="$t('enter_name')"
          input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
        />
      </FormGroup>
      <FormGroup
        label="phone_or_email"
        for-text="phone_or_email"
        class="!text-blue-200 mb-5"
      >
        <FormInput
          id="phone_or_email"
          v-model="form.values.phoneOrEmail"
          :error="form.$v.value.phoneOrEmail.$error"
          :placeholder="$t('phone_or_email')"
          input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
        />
      </FormGroup>
      <FormGroup
        label="password"
        for-text="password"
        class="!text-blue-200 mb-5"
      >
        <FormInput
          id="password"
          v-model="form.values.password"
          :error="form.$v.value.password.$error"
          :placeholder="$t('password')"
          input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
        />
      </FormGroup>
      <VueRecaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" />
      <CommonButton
        class="mt-6 w-full py-3 !bg-blue-200 !text-white !font-medium !text-base !leading-125"
        :text="$t('registration')"
        :button-type="captchaToken || success ? undefined : 'gray'"
        button-class="rounded-lg"
        :type="'submit'"
        :loading="loading"
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
          <img src="/svg/facebook.svg" alt="" />
          <span
            class="text-blue-700 dark:text-blue-100 text-sm leading-130 font-medium"
            >Facebook</span
          >
        </button>
      </div>
      <p class="text-center text-sm text-blue-200 dark:text-white leading-130">
        {{ $t('terms_use') }}
        <NuxtLink
          :to="'/pages/foydalanish-shartlari-usloviya-polzovanie'"
          class="text-blue-700"
          >{{ $t('policy_privacy') }}</NuxtLink
        >
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { VueRecaptcha } from 'vue3-recaptcha-v2'

import { useAuthStore } from '~/store/auth'
import useSocialAuth from '~/store/useSocialAuth'
import { IAuthRegister } from '~/types/auth'
import { IContactApplication } from '~/types/contact'
import { isValidPhoneOrEmail } from '~/utils'

const { loginWithGoogle, loginWithFacebook, CONFIG, authFacebook } =
  useSocialAuth()

const loading = ref(false)
const success = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const regPhone = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const captchaToken = ref('')
const onVerify = (token: string) => {
  captchaToken.value = token
}
const onExpired = () => {
  captchaToken.value = ''
}

const form = useForm<IAuthRegister>(
  {
    full_name: '',
    phoneOrEmail: '',
    password: '',
  },
  {
    full_name: { required },
    phoneOrEmail: { required, isValidPhoneOrEmail },
    password: { required },
  }
)
const submitForm = async () => {
  try {
    form.$v.value.$touch()
    loading.value = true
    if (!form.$v.value.$invalid) {
      const sendData: any = { ...form.values }
      if (emailRegex.test(sendData.phoneOrEmail)) {
        sendData.email = sendData.phoneOrEmail
      } else if (regPhone.test(sendData.phoneOrEmail)) {
        sendData.phone_number = sendData.phoneOrEmail
      }
      delete sendData.phoneOrEmail
      const resData = await authStore.userRegister(sendData)
      loading.value = false
      emit('tabsChanges')
    }
    loading.value = false
  } catch (e) {
    loading.value = false
    // throw new Error(e)
  }
}
const clickToButton = () => {
  if (success.value) {
    closeModal()
  }
}

interface Props {
  show: boolean
}

defineProps<Props>()
const emit = defineEmits(['tabsChanges'])

function closeModal() {
  form.values.full_name = ''
  form.values.phone = ''
  form.$v.value.$reset()
  success.value = false
  captchaToken.value = ''
  emit('close')
}
</script>
