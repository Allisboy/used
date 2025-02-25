<template>
    <div>
        <Navbar/>
        <div class="h-40 bg-white flex flex-col">
            <div class="flex items-center justify-center flex-col p-2">
                <Avatar :img="logo" classes="w-20 "/>
                <span>Allwell</span>
            </div>
            <div class="flex items-center justify-center ">
                <TabsHead tab="post" name="Post" :current="current" @click="changeTabs('post')"/>
                <TabsHead tab="chat" name="Chat" :current="current" @click="changeTabs('chat')"/>
                <TabsHead tab="account" name="Account" :current="current" @click="changeTabs('account')"/>
                <TabsHead tab="message" name="Message" :current="current" @click="changeTabs('message')"/>
            </div>
        </div>
        <TabsBody :current="current" :tabsName="tabsName"/>
    </div>
    <FloatButton v-if="user">
            <font-awesome-icon :icon="['fas','pen-to-square']"/> 
    </FloatButton>
</template>

<script setup>
import Avatar from '../components/mini/Avatar.vue';
import Navbar from '../components/Navbar.vue';
import logo from '../assets/image/logoMain.png'
import TabsHead from '../components/mini/TabsHead.vue';
import { ref, watch, } from 'vue';
import TabsBody from '../components/mini/TabsBody.vue';
import { useAuthStore } from '../appwrite/utils/global';
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router';
import FloatButton from '../components/mini/FloatButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const router=useRouter()
const auth=useAuthStore()
const tabsName=['post','chat','account','message']
const current=ref('post')
const changeTabs=(tab)=>{
    current.value=tab
}
const { user, isLoading } = storeToRefs(auth)
watch(user, (newValue) => {
    if (newValue === null) {
        router.push('/')
    }
})
if(!user.value){
    router.push('/')
}
</script>