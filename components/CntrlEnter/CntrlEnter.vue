<template>
  <div>
    <transition name="fade">
      <div
        v-if="contactModal"
        class="modal flex flex-col bg-white"
        @close="contactModal = false"
      >
        <ModalContactModal :show="contactModal" @close="closeModal" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { onMounted, ref } from 'vue'

import { IContactApplication } from '~/types/contact'

const showModal = ref(false)

const contactModal = ref(false)
const form = useForm<IContactApplication>(
  {
    full_name: '',
    phone: '',
    description: '',
  },
  {
    full_name: { required },
    phone: { required },
    description: { required },
  }
)
const submitForm = () => {
  form.$v.value.$touch()
  if (form.$v.value.$invalid) return
  success.value = true
}
const success = ref(false)

const closeModal = () => {
  contactModal.value = false
}

onMounted(() => {
  if (process.client) {
    document.body.addEventListener('keypress', handleKeypress)
    form.page = document.location.href
  }
})

watch(
  () => contactModal.value,
  () => {
    const body = document.body
    if (contactModal.value) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }
)

const handleKeypress = (e) => {
  if (e.code === 'Enter' && e.ctrlKey) {
    if (!showModal.value) {
      let selectedText = ''

      if (window.getSelection) {
        selectedText = window.getSelection().toString()
      } else if (document.getSelection) {
        selectedText = document.getSelection().toString()
      } else if (document.selection) {
        selectedText = document.selection.createRange().text
      }

      form.title = selectedText
      contactModal.value = true
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 31, 46, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
}

.modal-head h6 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.modal-body label {
  display: block;
  margin-bottom: 5px;
}

.modal-body input,
.modal-body textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.modal-actions button {
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #063f62;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.btn-close svg {
  width: 20px;
  height: 20px;
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
