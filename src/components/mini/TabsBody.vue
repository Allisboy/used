<template>
    <div>
        <Post v-if="tabsName[0] === current"/>
        <Chat v-if="tabsName[1] === current"/>
        <Profile v-if="tabsName[2] === current"/>
        <Messages v-if="tabsName[3] === current"/>
    </div>
</template>

<script setup>
import Chat from '../Chat.vue';
import Messages from '../Messages.vue';
import Post from '../Post.vue';
import Profile from '../Profile.vue';


const props=defineProps({
    tabsName:Array,
    current:String
})
</script>