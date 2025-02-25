<template>
    <div v-if="isMobile && route.path !== '/login' && route.path !== '/signup' "
     class="fixed bottom-0 left-0 w-full bg-white p-1 shadow-2xl border-t border-t-purple-400 ">
        <div class="flex flex-row items-center justify-between">
        <RouterLink to="/">
        <NavList title="Home" className="flex-col items-center" >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'home']" />
          </template>
        </NavList>
      </RouterLink>
        <RouterLink to="/">
        <NavList title="Cart" className="flex-col items-center">
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          </template>
        </NavList>
      </RouterLink>
        <RouterLink to="/community">
        <NavList title="Commiunity" className="flex-col items-center">
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'users']" />
          </template>
        </NavList>
      </RouterLink>
        <RouterLink to="/">
        <NavList title="Account" className="flex-col items-center">
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'user']" />
          </template>
        </NavList>
      </RouterLink>
        </div>
    </div>
</template>

<script setup>
import NavList from "./mini/NavList.vue";
import { RouterLink,useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMediaQuery } from '@vueuse/core';

const isMobile=useMediaQuery('(max-width: 768px)')
const route=useRoute()

</script>

