  <template>
    <div class="w-full min-h-screen mb-20">
      <header class="p-4 bg-white shadow-md flex items-center">
        <button class="p-2 text-lg text-gray-700 hover:text-gray-500 border-none bg-transparent cursor-pointer" @click="goBack">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>
        <h1 v-if="props.title" class="text-2xl font-bold">{{props.title}}</h1>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </template>

  <script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const props=defineProps({
    title:String
  })
  const goBack = () => {
    router.back()
  }
  </script>
