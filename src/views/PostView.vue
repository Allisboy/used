  <template>
    <AuthPage title="Create Post">

      <div class=" mx-auto p-5 bg-purple-700 h-auto w-full ">
        <div>
          <h1 class="text-3xl text-center text-white">Post Product</h1>
        </div>
        <form @submit.prevent class="max-w-[600px] mx-auto mb-20">
          <div class="mb-5">
            <label>Name</label>
            <input 
            type="text" 
            v-model="formData.name" 
            class="w-full p-2 border border-gray-300 rounded-md" 
            placeholder="Product Name"
            >
          </div>
  
          <div class="mb-5">
            <label>Amount</label>
            <input type="number" 
            v-model="formData.amount" 
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="4000"
             required>
          </div>
  
          <div class="mb-5">
            <label>Categories</label>
            <input type="text" 
            v-model="formData.categories" class="w-full p-2 border border-gray-300 rounded-md" 
            placeholder="cloth,short,fashion" required>
          </div>
  
          <div class="mb-5">
            <label>Note</label>
            <textarea v-model="formData.note" class="w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
          </div>
  
           <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900">Images (Max 2)</label>
      <div class="flex items-center justify-center w-full">
        <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2 files)</p>
          </div>
          <input 
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            multiple
            ref="fileInput"
            class="hidden"
          />
        </label>
      </div>
      
      <!-- Preview section -->
      <div class="flex gap-3 mt-4" v-if="imagePreview.length">
        <div v-for="(preview, index) in imagePreview" :key="index" class="relative group">
          <img :src="preview" class="w-24 h-24 rounded-lg object-cover border border-gray-200">
          <button 
            @click="removeImage(index)" 
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md hover:bg-red-600 transition-colors">
            ×
          </button>
        </div>
      </div>
    </div>
  
          <button 
          @click="submit"
          class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
            Submit Product
          </button>
        </form>
      </div>
    </AuthPage>
  </template>

  <script setup>
  import { ref, reactive } from 'vue'
import { useAuthStore } from '../appwrite/utils/global';
import { storeToRefs } from 'pinia';
import { createPost } from '../appwrite/general';
import AuthPage from "../Layout/AuthPage.vue";


 const submit=async()=>{
  createPost(formData,imageFiles)
 }
  const formData = reactive({
    name: '',
    amount: null,
    categories: '',
    note: ''
  })

  const imageFiles = ref([])
  const imagePreview = ref([])
  const fileInput = ref(null)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length + imageFiles.value.length > 2) {
      alert('Maximum 2 images allowed')
      fileInput.value.value = ''
      return
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        imageFiles.value.push(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index) => {
    imageFiles.value.splice(index, 1)
    imagePreview.value.splice(index, 1)
    fileInput.value.value = ''
  }
  </script>
