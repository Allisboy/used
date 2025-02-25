<template>
  <div
    v-if="props.open"
    @click.self="props.close"
    class="fixed top-0 left-0 bg-gray-500 w-screen h-screen bg-opacity-40 z-40"
  >
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-if="props.open"
        ref="sideRef"
        class="relative w-[300px] bg-purple-700 h-screen flex flex-col"
      >
        <div class="flex flex-col items-center bg-white p-2 h-1/4">
          <div class="bg-white rounded-full w-32 h-32 overflow-hidden">
            <img
              :src="logoMain"
              class="w-full h-full object-cover rounded-full"
            />
          </div>
          <span v-if="props.user">{{ props.user.name }}</span>
        </div>
        <div class="flex flex-col p-3 h-[75%]">
          <div class="h-3/5">
            <RouterLink to="/login" v-if="!user">
              <NavList :title="'Login'" className="text-white">
                <template v-slot:icon>
                  <font-awesome-icon
                    v-if="user"
                    :icon="['fas', 'gauge']"
                    class="text-white text-2xl"
                  />
                  <font-awesome-icon
                    v-else
                    :icon="['fas', 'right-to-bracket']"
                    class="text-white text-2xl"
                  />
                </template>
              </NavList>
            </RouterLink>
            <NavList title="Trends" className="text-white">
              <template v-slot:icon>
                <font-awesome-icon :icon="['fas', 'fire']" />
              </template>
            </NavList>
            <RouterLink to="/myshop">
            <NavList title="My Shop" className="text-white">
              <template v-slot:icon>
                <font-awesome-icon :icon="['fas', 'shop']" />
              </template>
            </NavList>
          </RouterLink>
            <NavList title="Setting" className="text-white">
              <template v-slot:icon>
                <font-awesome-icon :icon="['fas', 'gear']" />
              </template>
            </NavList>
            <NavList v-if="props.user" @click="props.logout" title="Logout" className="text-white">
              <template v-slot:icon>
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              </template>
            </NavList>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import logoMain from "../assets/image/logo2.png";
import NavList from "./mini/NavList.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  open: Boolean,
  close: Function,
  user: {
    type: Object,
    default: null,
  },
  logout: Function,
});
const sideRef = ref(null);
</script>
