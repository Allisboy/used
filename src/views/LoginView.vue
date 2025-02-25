<template>
    <FormLayout title="Login" :handleSubmit="handleSubmit">
        <template v-slot:form>
            <div class="flex flex-col">
                        <Input label="email" placeholder="email" v-model="email" :error="emailError"/>
                    </div>
                    <div class="flex flex-col">
                        <Input label="Password" placeholder="password" type="password" v-model="password" :error="passwordError"/>
                    </div>
                    <div class="flex flex-col mt-2">
                        <button 
                       :disabled="load"
                       class="w-[300px] p-2 text-white bg-purple-500 rounded-3xl">
                        <span v-if="load">loading</span>
                        <span v-else>Sign Up</span>
                       </button>
                        <div>
                            <h1 class="text-sm">Not registered? <RouterLink class="underline" to="signup"> Sign up</RouterLink></h1>
                        </div>
                    </div>
        </template>
    </FormLayout>
</template>

<script setup>
import { ref } from 'vue';
import Input from '../components/mini/Input.vue';
import { RouterLink, useRouter } from 'vue-router';
import FormLayout from '../components/FormLayout.vue';
import { useAuthStore } from '../appwrite/utils/global';
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { isLoadingEvent } from '../appwrite/utils/general'

const {loading,True,False}=isLoadingEvent()
const router = useRouter()
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const load=ref(false);
const validateForm = () => {
    let isValid = true
    
    // email validation
    if (!email.value) {
       emailError.value = 'Email is required'
       isValid = false
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Invalid email format'
       isValid = false
   }else{
    emailError.value = ''
   }

    // Password validation
    if (!password.value) {
        passwordError.value = 'Password is required'
        isValid = false
    } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters'
        isValid = false
    } else {
        passwordError.value = ''
    }

    return isValid
}
const auth = useAuthStore()
const { user, isLoading } = storeToRefs(auth)

watch(user, (newValue) => {
    if (newValue) {
        True()
        setTimeout(()=>{
            router.push('/')
            False()
        },4000)
    }
})
if(user.value){
    router.push('/')
}

const handleSubmit = () => {
    if (validateForm()) {
        load.value=true
        const log= auth.login(email.value,password.value)
        load.value=false
    }
}
</script>
