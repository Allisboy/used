<template>
   <FormLayout title="Sign up" :handleSubmit="handleSubmit">
       <template v-slot:form>
           <div class="flex flex-col">
                <Input label="Fullname" placeholder="fullname" v-model="fullname" :error="errors.fullname"/>
             </div>
           <div class="flex flex-col">
                <Input label="Email" placeholder="email" v-model="email" type="email" :error="errors.email"/>
             </div>
            <div class="flex flex-col">
               <Input label="Password" placeholder="password" type="password" v-model="password" :error="errors.password"/>
            </div>
               <div class="flex flex-col mt-2">
                       <button 
                       :disabled="loading"
                       class="w-[300px] p-2 bg-white text-purple-600 rounded-3xl">
                        <span v-if="loading">loading</span>
                        <span v-else>Sign Up</span>
                       </button>
                    <div>
                       <h1 class="text-sm">Already registered? <RouterLink class="underline" to="login"> Login</RouterLink></h1>
                   </div>
            </div>
       </template>
   </FormLayout>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { storeToRefs } from 'pinia'
import Input from '../components/mini/Input.vue';
import { RouterLink, useRouter } from 'vue-router';
import FormLayout from '../components/FormLayout.vue';
import { useAuthStore } from '../appwrite/utils/global';



const auth=useAuthStore()
const fullname = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const router=useRouter();
const errors = reactive({
   fullname: '',
   email: '',
   password: '',
})

const validateForm = () => {
   let isValid = true

   // Reset errors
   Object.keys(errors).forEach(key => errors[key] = '')

   if (!fullname.value) {
       errors.fullname = 'fullname is required'
       isValid = false
   } else if (fullname.value.length < 3) {
       errors.fullname = 'fullname must be at least 3 characters'
       isValid = false
   }
   if (!email.value) {
       errors.email = 'Email is required'
       isValid = false
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
       errors.email = 'Invalid email format'
       isValid = false
   }

   if (!password.value) {
       errors.password = 'Password is required'
       isValid = false
   } else if (password.value.length < 8) {
       errors.password = 'Password must be at least 8 characters'
       isValid = false
   } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
       errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
       isValid = false
   }
   return isValid
}
const { user, isLoading } = storeToRefs(auth)
const users=computed(user,(newUser)=>newUser)
watch(user, (newValue) => {
    if (newValue) {
        router.push('/')
    }
})
if(user.value){
    router.push('/')
}
const handleSubmit = () => {
    loading.value=true
   if (validateForm()) {
    const log=  auth.signup(email.value,fullname.value,password.value);
    if(log){
        loading.value=false
        // router.push('/')
    }
   }
}
</script>
