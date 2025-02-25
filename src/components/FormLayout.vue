<template>
    <div class="flex flex-col h-screen bg-gradient-to-tr from-pink-500 to-purple-600">
        <h1 class="text-2xl mt-2 font-serif text-center text-white ">{{ title }}</h1>
        <div class="flex flex-col items-center justify-center">
            <img :src="logoMain" class="w-32 h-32"/>
            <h1 class="text-md font-serif text-white">Used Marketplace</h1>
        </div>
        <div>
            <div class="flex flex-col items-center justify-center h-full text-white mt-2">
                <form class="mt-3 flex flex-col gap-2 p-4 "
                @submit.prevent="handleSubmit"
                >
                    <slot name="form"></slot>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import logoMain from '../assets/image/logo1.png'
const props=defineProps({
    handleSubmit:Function,
    title:String
})
</script>

