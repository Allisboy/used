<template>
    <main>
        <Navbar/>
        <div class="flex flex-col p-2">
            <Carousel/>
        </div>
        <main class="flex items-center">
            <div :class="[lg ? 'w-[60%]':'w-[100%]']"></div>
            <div :class="[lg ? 'w-[40%]':'w-[0]']" v-if="lg">
                <Chat/>
            </div>
        </main>
        <FloatButton v-if="user">
            <font-awesome-icon :icon="['fas','pen-to-square']"/> 
        </FloatButton>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../appwrite/utils/global';
import FloatButton from '../components/mini/FloatButton.vue';
import Navbar from '../components/Navbar.vue';
import Chat from '../components/Chat.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Carousel from '../components/Carousel.vue';
import { useMediaQuery } from '@vueuse/core';

const lg=useMediaQuery('(min-width:1024px)')
console.log(lg)
const auth=useAuthStore()
const {user}=storeToRefs(auth)

</script>