<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars, faSearch, faUser, faMessage,
  faArrowUp, faShop, faFire, faGear,
  faShirt, faMobile, faTv, faSpoon,
  faHome,faRightFromBracket,faPenToSquare,
  faGauge,faRightToBracket,faNairaSign,
  faArrowLeft,faShoppingCart,faUsers,
  faSearchPlus,faTrash
} from '@fortawesome/free-solid-svg-icons'
import logoMain from "./assets/image/logo1.png";
import { RouterView } from 'vue-router'
import { useAuthStore } from './appwrite/utils/global'
import { storeToRefs } from "pinia";
import { onMounted,computed,watch, watchEffect, ref } from 'vue'
import AlertMessage from './components/AlertMessage.vue'
import Footer from './components/Footer.vue'
import { isLoadingEvent, messageEvent } from './appwrite/utils/general'

// Use storeToRefs to maintain reactivity
const authStore = useAuthStore()
const loader=isLoadingEvent()
const { user } = storeToRefs(authStore)
const {isLoading, fetchUser} = authStore
const {loading,localLoad}=storeToRefs(loader)
const {True,False}=loader

// Add all icons to the library
library.add(
  faBars, faSearch, faUser, faMessage,
  faArrowUp, faShop, faFire, faGear,
  faShirt, faMobile, faTv, faSpoon,
  faHome,faRightFromBracket,faPenToSquare,
  faGauge,faRightToBracket,faNairaSign,
  faArrowLeft,faShoppingCart,faUsers,faSearchPlus,faTrash
)
// message
const {message,messageType,hasMessage}=storeToRefs(messageEvent())

const users=ref({})
const load=ref(false)
onMounted(async () => {
  //True()
  await fetchUser()
  setTimeout(()=>{
    False()
  },3000)
})


</script>

<template>
  <main class="h-screen ">
    <Transition
      name="scale"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
      v-if="hasMessage"
       class="fixed top-0 left-0 w-screen">
        <div class="relative flex ">
          <div class="absolute right-4 p-4">
            <h1 
            class="text-white p-6 text-center rounded-md"
            :class="messageType === 'success'?'bg-green-600':'bg-red-600'">{{ message }} </h1>
          </div>
        </div>
      </div>
    </Transition>   
     <div 
    v-if="localLoad"
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 p-3 flex items-center justify-center">
      <div class="h-20 rounded-md bg-white w-[250px] mt-4 flex items-center justify-center">
        <div class="flex justify-center ">
          <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
    <AlertMessage />
    <Transition
      name="fade"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div 
    v-if="loading"
    class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50 flex-col">
    <div class="bg-white rounded-full w-32 h-32 overflow-hidden">
            <img
              :src="logoMain"
              class="w-full h-full object-cover rounded-full"
            />
          </div>
      <div class="text-center">
        <h1 v-if="user" class="text-4xl text-purple-500"><span>Welcome back,</span></h1>
        <h1 v-if="user" class="text-md">{{ user.name }}</h1>
        
        <div class="flex justify-center mt-4">
          <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 class="text-3xl mt-4">Loading</h1>
      </div>
    </div>
    </Transition>
    <RouterView />
    <Footer />
  </main>
</template>
