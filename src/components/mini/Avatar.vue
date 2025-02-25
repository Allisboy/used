<template>
    <div class="bg-white rounded-full overflow-hidden" :class="classes">
          <img :src="img" class="w-full h-full object-cover rounded-full" />
    </div>
</template>

<script setup>
const props=defineProps({
    img:String,
    classes:{
        type:String,
        default:'w-32 h-32'
    }
})
</script>

