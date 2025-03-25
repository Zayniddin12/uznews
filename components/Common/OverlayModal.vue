<template>
  <transition name="modal">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <slot></slot>
        </div>
        <button class="modal-close" @click="$emit('close')">Close</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

interface ModalProps {
  visible: boolean
}

defineProps<ModalProps>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 31, 46, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.modal-content {
  margin-bottom: 10px;
}

.modal-close {
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
