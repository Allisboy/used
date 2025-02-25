<template>
    <RouterLink :to="`/user/post/view/${props.id}`">

    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <div class="mb-4">
            <img  class="w-full h-64 object-cover rounded-lg mb-4" :src="props.img ? props.img:'https://via.placeholder.com/600x400'" alt="Product image">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-bold">{{props.name}}</h2>
                <span class="text-2xl font-bold text-green-600">{{props.amount}}</span>
            </div>
            <p class="text-gray-700">{{ props.category }}</p>
        </div>
        <div class="border-t pt-4">
            <div class="flex items-center space-x-4">
                <button class="flex items-center text-gray-500 hover:text-blue-500">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View
                </button>
                <RouterLink :to="`/user/post/update/${props.id}`" class="flex items-center text-gray-500 hover:text-blue-500">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </RouterLink>
                <button class="flex items-center text-gray-500 hover:text-red-500">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
                <button class="flex items-center text-gray-500 hover:text-purple-500">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    Boost
                </button>
            </div>
        </div>
    </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

    const props=defineProps({
        name:String,
        amount:Number,
        id:String,
        category:String,
        img:String,
    })
</script>