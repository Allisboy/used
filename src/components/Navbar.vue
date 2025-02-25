<template>
  <div class="bg-white p-2 flex items-center justify-between">
    <div>
      <img :src="logoMain" width="50" height="20" />
    </div>
    <h1 v-if="user" class="text-2xl text-purple-500">{{ user.name }}</h1>
    <div class="lg:hidden flex items-center space-x-6">
      <RouterLink :to="'/login'" v-if="!user">
        <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="text-purple-500 text-2xl" />
      </RouterLink>
      <div class="" @click="isOpen">
        <font-awesome-icon :icon="['fas', 'bars']" class="text-purple-500 text-2xl" />
      </div>
    </div>
    <div class="hidden lg:flex items-center space-x-6">
      <RouterLink :to="'/login'" v-if="!user">
        <NavList :title="'Login'">
          <template v-slot:icon>
            <font-awesome-icon  :icon="['fas', 'right-to-bracket']" class="text-purple-500 text-2xl" />
          </template>
        </NavList>
      </RouterLink>
      <RouterLink to="/">
        <NavList title="Home">
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'home']" />
          </template>
        </NavList>
      </RouterLink>
      <NavList title="Trends">
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'fire']" />
        </template>
      </NavList>
      <NavList title="Myshop">
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'shop']" />
        </template>
      </NavList>
      <NavList title="Cart">
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </template>
      </NavList>
      <NavList @click="logouts" v-if="user" title="Logout">
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </template>
      </NavList>
    </div>
  </div>
  <Sidebar :open="open" :close="close" :user="user" :logout="logouts" />
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import logoMain from "../assets/image/logo2.png";
import NavList from "./mini/NavList.vue";
import Sidebar from "./Sidebar.vue";
import { ref } from "vue";
import { useAuthStore } from "../appwrite/utils/global";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const open = ref(false);
const isOpen = () => {
  open.value = true;
};

const logouts =async () => {
 await auth.logout();
};
const close = () => {
  open.value = false;
};
</script>
