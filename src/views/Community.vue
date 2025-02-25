  <template>
    <div class="min-h-screen bg-gray-100">
      <!-- Chat Container -->
      <div class="max-w-6xl mx-auto p-4">
        <div class="bg-white rounded-lg flex flex-col h-[800px]">
          <!-- Chat Header -->
          <div class="border-b px-6 py-4">
            <h1 class="text-2xl font-semibold text-gray-800">USED Community Chat</h1>
          </div>

          <!-- Chat Messages Area -->
          <div class="flex-1 overflow-y-auto px-6 py-4" >
            <!-- Message Items -->
            <div class="space-y-4">
              <!-- Received Message -->
              <div 
              class="flex items-start gap-4" 
              v-for="(item , index) in items" :class="[item.users.$id === user?.$id && 'justify-end']"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <p class="font-medium text-gray-900">{{ item.users.$id === user?.$id? 'you':item.users.fullname }}</p>
                    <span class="text-xs text-gray-500">{{ dayjs(item.$createdAt).fromNow() }}</span>
                  </div>
                  <div class="mt-1  rounded-lg p-3" 
                  :class="[item.users.$id === user?.$id ? 'bg-purple-500' :'bg-gray-100']">
                    <div class="w-full h-[200px]" v-if="item.images">
                      <img :src="item.images" class="w-full h-full object-cover"/>
                    </div>
                    <p 
                    :class="[item.users.$id === user?.$id ?'text-white':'text-gray-800']"
                     v-if="item.message">{{ item.message }}</p>
                    
                  </div>
                </div>
                <div class="flex items-center " v-if="item.users.$id === user.$id">
                  <button class="border p-2" @click="deletes(item.$id)">
                    <font-awesome-icon :icon="['fas','trash']" class="text-black text-sm"/>
                  </button>
                </div>
              </div>
              <div ref="list"></div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="border-t px-6 py-4 mb-24" v-if="user" ref="scroll">
            <div class="flex gap-2">
              <input
                type="file"
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handleImageUpload"
              />
              <button class="text-gray-500 hover:text-gray-700" @click="$refs.fileInput.click()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="Type your message..."
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="text"
                />
              </div>
              <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              :disabled="isLoading"
              @click="sendMessage"
              >
                <span v-if="isLoading">loading...</span>
                <span v-else>Send</span>
              </button>
            </div>
            <!-- Image Preview -->
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" class="max-w-xs rounded-lg" />
              <button @click="clearImage" class="mt-2 text-red-500">Remove Image</button>
            </div>
          </div>
        </div>
        <div class="absolute top-7 right-3" v-if="fail">
          <p class="p-4 bg-red-500 text-white text-sm ">message failed</p>
        </div>
      </div>
    </div>
  </template>

  <script setup>
import Community from '../appwrite/collections/Community';
import {ref,onUnmounted,onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../appwrite/utils/global';
import {CommunityRealTime} from '../appwrite/realtime/CommunityReal'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { bucket } from '../appwrite/bucket';
import Images from '../appwrite/collections/Image';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const image=new Images()
dayjs.extend(relativeTime)
const auth=useAuthStore()
const {user}=storeToRefs(auth)
  const community=new Community()
  const items=ref(null)
  const fail=ref(false)
  const isLoading=ref(false)
  const text=ref('')
  const scroll=ref(null)
  const list=ref(null)
  const imageFile = ref(null)
  const imagePreview = ref(null)
  let realTime=null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      imageFile.value = file
      imagePreview.value = URL.createObjectURL(file)
    }
  }
  const scrollTOEnd=()=>{
    list.value.scrollIntoView({behavior:'smooth',block:'start'})
  }
  const clearImage = () => {
    imageFile.value = null
    imagePreview.value = null
  }
  const sendMessage = async () => {
    isLoading.value=true
    if (text.value.trim() === '' && !imageFile.value) {
      return
    }

    community.users = user.value.$id
    community.message = text.value

    if (imageFile.value) {
      // Upload image to storage and get URL
      const genImage=bucket.createImage(imageFile.value);  
      community.images = bucket.reviewToUrl(genImage)
      community.imageId=genImage
      console.log(genImage)
      }
      community.Save().then(res => {
        if (res) {
          text.value = ""
          clearImage()
        }
        
      }).catch( error =>{
        fail.value=true
        setTimeout(()=>{
          fail.value=false
        },4000)
      })
    }

  

  community.AllLatest().then(res =>{
    items.value=res
  })

  const deletes=(id)=>{
  const current=  items.value.filter((i)=> i.$id === id)
   if (current[0].imageId) {
       bucket.deleteImage(current[0].imageId)
   }
    community.delete(id)
  }
  onMounted(()=>{
    realTime=CommunityRealTime(items,isLoading,scrollTOEnd)
    
    if(scroll.value && list.value){
      scroll.value.scrollIntoView({behavior:'smooth',block:'start'})
      list.value.scrollIntoView({behavior:'smooth',block:'start'})
    }
    
  })
  onUnmounted(()=>{
    realTime()
  })

  </script>
