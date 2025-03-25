<template>
  <CommonModal
    v-bind="{ show }"
    :title="$t('contact_modal')"
    @close="closeModal"
  >
    <div>
      <form @submit.prevent="submitForm">
        <FormGroup
          label="how_do_you_connect"
          for-text="full_name"
          class="!text-blue-200 mb-5"
        >
          <FormInput
            id="full_name"
            v-model="form.values.first_name"
            :error="form.$v.value.first_name.$error"
            :placeholder="$t('enter_name')"
            input-class="text-gray dark:text-white bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
          />
        </FormGroup>
        <FormGroup
          label="phone_number"
          for-text="phone_number"
          class="!text-blue-200 mb-5 flex"
        >
          <FormInput
            id="phone_number"
            v-model="form.values.phone_number"
            v-maska="'## ### ## ##'"
            :error="form.$v.value.phone_number.$error"
            placeholder="00 000 00 00"
            input-class="text-gray bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium"
          >
            <template #prefix>
              <span
                class="mr-1.5 text-sm font-medium text-blue-700 dark:text-white leading-130"
                >+998</span
              >
            </template>
          </FormInput>
        </FormGroup>
        <FormGroup
          label="your_message"
          for-text="letter"
          class="!text-blue-200 mb-5"
        >
          <FormTextarea
            id="letter"
            v-model="form.values.description"
            :error="form.$v.value.description.$error"
            :placeholder="$t('enter_message')"
            input-class="text-gray bg-gray lg:hover:!bg-blue-100/20 !text-blue-700 lg:hover:!bg-transparent !font-medium min-h-[120px]"
          />
        </FormGroup>
        <VueRecaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" />
        <CommonButton
          class="mt-6 w-full py-3 !bg-blue-200 !text-white !font-medium !text-base !leading-125"
          :text="$t('submit')"
          :button-type="captchaToken || success ? undefined : 'gray'"
          :disabled="captchaToken || success ? false : true"
          button-class="rounded-lg"
          :class="{
            'pointer-events-none disabled:!bg-blue-200/10 disabled:hover:bg-blue-200/10 disabled:!text-gray-200':
              !captchaToken && !success,
          }"
          :type="success ? 'button' : 'submit'"
          @click="clickToButton"
        />
      </form>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
// Import necessary modules and types
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { VueRecaptcha } from 'vue3-recaptcha-v2'

import { useCustomToast } from '@/composables/customToast'
import { IContactReport } from '~/types/contact'
// Define Props interface
interface Props {
  show: boolean
}
defineProps<Props>()

// Initialize reactive variables
const success = ref(false)
const captchaToken = ref('')
const { t } = useI18n()

// Use the custom toast composable
const { showToast } = useCustomToast()

// Recaptcha event handlers
const onVerify = (token: string) => {
  captchaToken.value = token
}
const onExpired = () => {
  captchaToken.value = ''
}

// Create the form using Vuelidate
const form = useForm<IContactReport>(
  {
    phone_number: '',
    first_name: '',
    description: '',
  },
  {
    first_name: { required },
    phone_number: { required, isValidPhone },
    description: { required },
  }
)

// Function to handle click event on the button
const clickToButton = () => {
  if (success.value) {
    closeModal()
    showToast('success', t('finally'))
  }
}

// Function to submit the form
async function submitForm() {
  try {
    const isValid = await validateForm()
    if (!isValid) {
      return
    }

    const formData = prepareFormData()
    await createFeedback(formData)
    handleSuccess()
    captchaToken.value = ''
  } catch (error) {
    handleFailure()
  }
}

// Function to validate the form using Vuelidate
function validateForm() {
  form.$v.value.$touch()
  return !form.$v.value.$invalid
}

// Function to prepare form data
function prepareFormData() {
  const phoneNumber = '+998' + (form.values?.phone_number || '')
  return {
    ...form.values,
    phone_number: phoneNumber,
  }
}

// Function to create feedback using the API
async function createFeedback(formData: any) {
  const response = await useApi().$post('common/FeedBackCreate', {
    body: formData,
  })
  return response
}

// Function to handle success after form submission
function handleSuccess() {
  form.$v.value.$reset()
  success.value = true
  closeModal()
  showToast('success', t('finally'))
}

// Function to handle failure after form submission
function handleFailure() {
  showToast('error', t('fail_message'))
}

// Emit the 'close' event using defineEmits
const emit = defineEmits<{
  (e: 'close'): void
}>()

const trigger = ref(0)

// Function to close the modal
function closeModal() {
  // Reset the form values
  form.values.description = ''
  form.values.first_name = ''
  form.values.phone_number = ''
  form.$v.value.$reset()
  success.value = true
  captchaToken.value = ''
  emit('close') // Emit the 'close' event
}
</script>
