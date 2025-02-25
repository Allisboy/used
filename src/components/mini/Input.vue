<template>
    <div class="flex flex-col gap-2 mb-4">
        <label v-if="label" :for="id" class="text-sm font-medium text-white">{{ label }}</label>
        <input
            :id="id"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            :class="{ 'border-red-600': error }"
            class="p-2 text-purple-600 border w-[300px] border-gray-300 rounded-md text-base outline-none transition-colors focus:border-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-10"
        >
        <span v-if="error" class="text-red-600 text-sm">{{ error }}</span>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    error: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
})

defineEmits(['update:modelValue'])
</script>
