<template>
  <div 
  v-if="loading" 
  class="fixed top-0-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center">
    <div class="flex justify-center mt-4">
          <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 class="text-3xl mt-4">Loading</h1>
  </div>
  <AuthPage v-else :title="post.name || 'View Post'">

    <div class="container flex flex-col">
      <div class="relative h-auto overflow-hidden flex flex-col items-center justify-center">
        <div class="flex items-center justify-center h-72 max-w-80 w-full">
          <div ref="imageContainer" class="relative w-full h-full">
            <img v-if="post.images" :src="post.images[currentImageIndex].url" :alt="post.title"
              class="absolute w-full h-full object-cover transition-opacity duration-500" @load="initializeAnimation" />
            <div class="absolute inset-0 bg-black/50"></div>
            <div class="absolute bottom-0 left-0 p-8 text-white">
              <div class="flex space-x-4">
                <button @click="prevImage" class="bg-white/30 p-2 rounded-full hover:bg-white/50">
                  <span class="text-white">
                    <
                  </span>
                </button>
                <button @click="nextImage" class="bg-white/30 p-2 rounded-full hover:bg-white/50">
                  <span class="text-white">></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="p-1  flex flex-col items-center justify-center">
        <div class="w-72 md:w-[400px]">

          <div>
            <h1 v-if="post.name" class="text-2xl text-center font-bold font-serif">
              {{ post.name }}
            </h1>
            <div class="flex items-center justify-between">
              <h1 class="flex items-center space-x-3">
                <span>views</span>
                <span>{{ post.postStatus?.views }}</span>
              </h1>
              <h1 class="flex items-center space-x-3">
                <span>trend</span>
                <span>{{ post.postStatus?.trends }}</span>
              </h1>
            </div>
          </div>
          <div class="mt-4">
            <h1 class="text-green-500 text-2xl font-bold">
              <font-awesome-icon :icon="['fas', 'naira-sign']" />
              {{ post.amount }}
            </h1>
            <p class="p-2 font-bold">categories:  {{ post?.categories }}</p>
            <p class="text-sm p-2">{{ post?.note }}</p>
          </div>
        </div>
      </section>
      <section class="flex items-center justify-center mb-20">
        <div class="flex items-center space-x-4">
          <RouterLink :to="`/user/post/update/${post?.$id}`">
            <button class="flex items-center text-white p-2 rounded-lg hover:text-purple-500 bg-purple-600 hover:bg-white">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                </path>
              </svg>
              Edit
            </button>
          </RouterLink>
          <button class="flex items-center text-white p-2 rounded-lg hover:text-purple-500 bg-purple-600 hover:bg-white">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6">
              </path>
            </svg>
            Boost
          </button>
        </div>
      </section>
    </div>
  </AuthPage>
</template>

<script setup>
import { useRoute, RouterLink } from "vue-router";
import Post from "../appwrite/collections/Post";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AuthPage from "../Layout/AuthPage.vue";



const post = ref({});
const loading=ref(false)
const route = useRoute();
const id = route.params.postId;
const posts = new Post();
const imageContainer = ref(null);
const currentImageIndex = ref(0);

const nextImage = () => {
  if (post.value.images && post.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % post.value.images.length;
    initializeAnimation();
  }
};

const prevImage = () => {
  if (post.value.images && post.value.images.length > 0) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? post.value.images.length - 1
        : currentImageIndex.value - 1;
    initializeAnimation();
  }
};

const initializeAnimation = () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    imageContainer.value,
    { scale: 1.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5 }
  );
};

onMounted(() => {
  loading.value = true;
  posts.find(id).then((res) => {
    post.value = res.value;
    // console.log(post.value)
    loading.value = false;
  });
  if (post.value.images) {
    initializeAnimation();
  }
});

</script>
