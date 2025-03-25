import { useI18n } from 'vue-i18n'
import * as pkg from 'vue-toastification'

import customToast from '~/components/Common/CustomToast.vue'

const { useToast } = pkg

export const useCustomToast = () => {
  const toast = useToast()
  const { t } = useI18n()
  const showToast = (
    type: 'success' | 'error',
    message: string = t('success_message')
  ) => {
    toast({
      component: customToast,
      props: {
        type,
        message,
      },
    })
  }

  return { showToast }
}
