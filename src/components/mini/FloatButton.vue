<template>
    <button 
      :class="props.classes"
      class="fixed bottom-16 right-8 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 hover:-translate-y-1 active:translate-y-0 z-50"
      @click="toPost"
    >
      <slot>
        <span>+</span>
      </slot>
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router=useRouter()

const toPost=()=>{
    router.push('/post/create')
  }
const props=defineProps({
    classes:{
        type:String,
        default:'bg-purple-600 text-white'
    }
})
</script>