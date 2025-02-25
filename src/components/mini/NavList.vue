<template>
    <div
    v-if="isMobile === false"
    :class="className"   
    class="cursor-pointer flex flex-col items-center text-purple-800 hover:border-b hover:scale-75 transition-all p-1 hover:border-b-white">
        <span>
            <slot name="icon"></slot>
        </span>
        <h1>{{ title }}</h1>
    </div>
    <div
    v-else
    :class="className"
    class="cursor-pointer flex space-x-2 p-2 text-purple-800 hover:border-b hover:text-purple-500 transition-colors hover:border-b-white"
    >
        <span>
            <slot name="icon"></slot>
        </span>
        <h1>{{ title }}</h1>
    </div>
</template>

<script setup>
import { useMediaQuery } from '@vueuse/core';

const isMobile=useMediaQuery('(max-width: 768px)')

defineProps({
    title: {
        type: String,
        required: true
    },
    className:{
        type:String,
        required:false
    }
});
</script>

