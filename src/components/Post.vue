<template>
    <div class="container mx-auto px-4">
        <h1 class="text-2xl md:text-3xl lg:text-4xl">Post</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UserProduct v-for="(posts ,index) in post"
            :key="index"
            :id="posts.$id"
            :name="posts.name" :amount="posts.amount" :categories="posts.categories"  :img="posts.images[0].url" />
            <UserProduct name="name" :amount="34455" categories="categories"  />
        </div>
    </div>
</template>

<script setup>
import UserProduct from './mini/userProduct.vue';
import { useAuthStore } from '../appwrite/utils/global'
import { storeToRefs } from "pinia";
import { setUpRealTimePost } from '../appwrite/realtime/UserPostReal';
import { onMounted, onUnmounted, ref } from 'vue';
import Post from '../appwrite/collections/Post';
const authStore = useAuthStore()
const { userModel,user } = storeToRefs(authStore)
const post=ref(userModel.value.post)
const unSubscribe = ref(null)
const postModel=new Post()


onMounted(() => {
   unSubscribe.value = setUpRealTimePost(userModel.value, post)
})
onUnmounted(() => {
    if (unSubscribe.value) {
        unSubscribe.value()
    }
})

// console.log(userModel.value.post)
</script>
