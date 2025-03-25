<template>
  <CommonModal
    v-bind="{ show }"
    :title="$t('auth_modal_title')"
    content-class="!pt-0 !pb-4"
    @close="closeModal()"
  >
    <CommonTab
      v-model="active"
      class="!w-full mb-5"
      item-class="!py-4 !text-sm"
      :list="tabs"
    />
    <AuthLogin v-show="active === 'to_come_in'" @close="closeModal" />
    <AuthRegistor
      v-show="active === 'registration'"
      @tabsChanges="tabsChanges"
    />
  </CommonModal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()

const show = computed(() => authStore.showLoginModal)

const { t } = useI18n()
const active = ref('to_come_in')
const tabs = [
  {
    label: 'login',
    value: 'to_come_in',
  },
  {
    label: 'registration',
    value: 'registration',
  },
]
function closeModal() {
  authStore.showRegisterModalClose()
}
function tabsChanges() {
  active.value = 'to_come_in'
}
</script>
