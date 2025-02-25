<template>
    <div class="flex flex-col mb-20">
        <div class="p-3 text-white bg-purple-600 flex items-center justify-center">
            <h1 class="text-2xl">My shop</h1>
        </div>
        <div class="flex items-center justify-center mt-2 mb-2">
            <input type="search" 
            placeholder="search all your products...." 
            class="border border-purple-500 outline-none p-2 ">
            <span class="p-2 border border-purple-500 bg-purple-500">
                <font-awesome-icon :icon="['fas','search-plus']" class="text-white"/> 
            </span>
        </div>
        <div class="flex items-start ">
            <PostProduct v-for="(posts ,index) in post"
            :key="index"
            :id="posts.$id"
            :name="posts.name" :amount="posts.amount" :categories="posts.categories"  :img="posts.images[0].url" />
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../appwrite/utils/global'
import { storeToRefs } from "pinia";
import PostProduct from '../components/mini/postProduct.vue'
import { onMounted,computed,watch, watchEffect, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const authStore = useAuthStore()
const { userModel,user } = storeToRefs(authStore)
const post=ref(userModel.value.post)
// console.log(posts.value)
</script>

