<template>
    <div
    :class="current === tab ? 'text-white bg-purple-700':'text-black'"
    class=" p-3 w-20 text-center">
        {{ name }}
    </div>
</template>

<script setup>
const props=defineProps({
    tab:String,
    current:String,
    name:String,
})
</script>
