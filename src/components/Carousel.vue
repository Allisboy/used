<template>
  <div class="relative overflow-hidden ">
    <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: isMobile?`translateX(-${currentIndex * 105}%)`:`translateX(-${currentIndex * 102}%)` }">
      <div
        v-for="(item, index) in items"
        class=" flex items-center justify-center w-screen h-[120px] flex-shrink-0 "
        :key="index">
        <div class=" min-h-[120px] lg:w-[80vw] bg-purple-600 h-auto flex flex-col items-center justify-center border border-purple-600 m-2 rounded-md">
          
          <h1 class="text-white text-bold text-2xl">{{ item.title }}</h1>
          <p class="text-white text-sm ">{{ item.note }}</p>
        </div>
      </div>
    </div>
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, index) in items"
        :key="index"
        @click="currentIndex = index"
        class="w-2 h-2 rounded-full transition-all "
        :class="currentIndex === index ? 'bg-white w-7' : 'bg-white/50'">
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core';

const isMobile=useMediaQuery('(max-width: 768px)')
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        title:'Buy and Sell in Used Market',
        note:'Used is a open platform for selling used product.'
      },
      {
        title:'Get costumer across Nigeria',
        note:'Make your Used product reach people across Nigeria.'
      },
      {
        title:'Find any fairly used item',
        note:'Get fairly used items of your choice in cheaper cost.'
      },
    ]
  }
})

const currentIndex = ref(0)
let autoplayInterval

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1
}

onMounted(() => {
  autoplayInterval = setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(autoplayInterval)
})
</script>
