<template>
    <Transition name="fade"
    
    >
      <div v-if="message" :class="['alert', type === 'error' ? 'alert-error' : 'alert-success']">
        {{ message }}
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { computed, watch } from 'vue'
  import { useAuthStore } from '../appwrite/utils/global'
  
  const store = useAuthStore()
  
  const props = defineProps({
    duration: {
      type: Number,
      default: 3000
    }
  })
  
  const message = computed(() => store.error || store.success)
  const type = computed(() => store.error ? 'error' : 'success')
  
  watch(message, (newMessage) => {
    if (newMessage) {
      setTimeout(() => {
        store.error = ''
        store.success = ''
      }, props.duration)
    }
  })
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 4px;
    z-index: 1000;
  }
  
  .alert-success {
    background-color: #4caf50;
    color: white;
  }
  
  .alert-error {
    background-color: #f44336;
    color: white;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  