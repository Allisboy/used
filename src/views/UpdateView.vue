<template>
    <AuthPage :title="`Update Post `">
        <section class="flex ">
            <section :class="step === 1 ? 'flex' : 'hidden'" class=" items-center justify-center flex-col">
                <h1 class="text-blue-700 text-2xl">Step 1: Update image. If necessary go to the next</h1>
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Images (Max 2)</label>
                    <div v-if="imageUrl.length < 2" class="flex items-center justify-center w-full">
                        <label
                            class="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span>
                                    or
                                    drag and drop</p>
                                <p class="text-xs text-gray-500">PNG, JPG or GIF (Remaining slots: {{ 2 -
                                    imageUrl.length
                                    }})</p>
                            </div>
                            <input type="file" @change="handleImageUpload" accept="image/*"
                                :multiple="imageUrl.length === 0" ref="fileInput" class="hidden" />
                        </label>
                    </div>

                    <!-- Preview section -->
                    <div class="flex gap-3 mt-4" v-if="imagePreview.length">
                        <div v-for="(preview, index) in imagePreview" :key="index" class="relative group">
                            <img :src="preview" class="w-24 h-24 rounded-lg object-cover border border-gray-200">
                            <button @click="removeImage(index)"
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md hover:bg-red-600 transition-colors">
                                ×
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-4" v-if="imageUrl.length">
                        <div v-for="(url, index) in imageUrl" :key="index" class="relative group">
                            <img :src="url.url" class="w-24 h-24 rounded-lg object-cover border border-gray-200">
                            <button @click="removeUrl(index)"
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md hover:bg-red-600 transition-colors">
                                ×
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="deleteImage.length !== 0" class="flex items-center justify-center">
                    <button @click="handleImageUpdate"
                        class="p-2 bg-purple-500 text-center text-white rounded-md">Update image</button>
                </div>
            </section>
            <section :class="step === 2 ? 'flex-1' : 'hidden'">
                <h1 class="text-blue-700 text-2xl mb-4">Step 2: Update product details</h1>
                <form @submit.prevent class="max-w-[600px] mx-auto ">
                    <div class="mb-5">
                        <label>Name</label>
                        <input type="text" v-model="formData.name" class="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Product Name">
                    </div>

                    <div class="mb-5">
                        <label>Amount</label>
                        <input type="number" v-model="formData.amount"
                            class="w-full p-2 border border-gray-300 rounded-md" placeholder="4000" required>
                        <span v-if="validationErrors.amount" class="text-red-500 text-sm">{{ validationErrors.amount
                            }}</span>
                    </div>

                    <div class="mb-5">
                        <label>Categories</label>
                        <input type="text" v-model="formData.categories"
                            class="w-full p-2 border border-gray-300 rounded-md" placeholder="cloth,short,fashion"
                            required>
                        <span v-if="validationErrors.categories" class="text-red-500 text-sm">{{
                            validationErrors.categories }}</span>
                    </div>

                    <div class="mb-5">
                        <label>Note</label>
                        <textarea v-model="formData.note" class="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"></textarea>
                        <span v-if="validationErrors.note" class="text-red-500 text-sm">{{ validationErrors.note
                            }}</span>
                    </div>
                    <div class="mb-5 flex items-center justify-center">
                        <button @click="updatePosts" v-if="step === 2" :disabled="!isValidToSubmit || !isFormValid"
                            :class="[
                                'px-4 py-2 text-white rounded',
                                isValidToSubmit && isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                            ]">
                            Update
                        </button>
                    </div>
                </form>
            </section>
        </section>
        <div class="flex items-center justify-center mt-1 ">
            <div class="mb-20">
                <button v-if="step !== 1" @click="handlePrevious"
                    class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Previous
                </button>
                <button v-if="step !== 2" @click="handleNext" :disabled="!isValidToSubmit" :class="[
                    'px-4 py-2 text-white rounded',
                    isValidToSubmit ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                ]">
                    {{ step === 2 ? 'Submit' : 'Next' }}
                </button>

            </div>
        </div>
        <div v-if="complete" class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50">
            <div class="relative h-screen w-screen">
                <div class="absolute bottom-0 h-52 flex flex-col">
                    <div class="p-2 flex ">
                        <button
                            class="w-full flex items-center text-white p-4 rounded-lg hover:text-purple-500 bg-purple-600 hover:bg-white">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6">
                                </path>
                            </svg>
                            Boost
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </AuthPage>
</template>

<script setup>
import AuthPage from '../Layout/AuthPage.vue';
import { ref, onMounted, computed, reactive } from 'vue'
import Post from "../appwrite/collections/Post";
import { useRoute } from 'vue-router';
import { updatePost } from '../appwrite/general';
import { bucket } from '../appwrite/bucket';
import Images from '../appwrite/collections/Image';
import { isLoadingEvent, messageEvent } from '../appwrite/utils/general';

const { setLocalTrue, setLocalFalse } = isLoadingEvent()
const id = useRoute().params.postId
const imageFiles = ref([])
const step = ref(1)
const complete = ref(false)
const post = ref({})
const imagePreview = ref([])
const fileInput = ref(null)
const imageUrl = ref([])
const deleteImage = ref([])
const posts = new Post();
const image = new Images();
const { setMessage } = messageEvent()

const validationErrors = reactive({
    amount: '',
    categories: '',
    note: ''
})

const validateForm = () => {
    let isValid = true
    validationErrors.amount = ''
    validationErrors.categories = ''
    validationErrors.note = ''

    if (!formData.amount || formData.amount <= 0) {
        validationErrors.amount = 'Amount must be greater than 0'
        isValid = false
    }

    if (!formData.categories) {
        validationErrors.categories = 'Categories are required'
        isValid = false
    } else if (!formData.categories.includes(',')) {
        validationErrors.categories = 'Categories must be comma-separated'
        isValid = false
    }

    if (!formData.note || formData.note.length < 10) {
        validationErrors.note = 'Note must be at least 10 characters long'
        isValid = false
    }

    return isValid
}

const isFormValid = computed(() => {
    return validateForm()
})

const handleImageUpdate = () => {
    setLocalTrue()
    deleteImage.value.forEach((img) => {
        bucket.deleteImage(img.$id).then((res) => {
            image.delete(img.$id)
        })
    })
    const imageID = []
    imageFiles.value.forEach((img) => {
        const genImage = bucket.createImage(img);
        if (genImage) {
            imageID.push({
                id: genImage,
                url: bucket.reviewToUrl(genImage)
            })
        }
    })
    imageID.forEach((img) => {
        image.url = img.url;
        image.post = id;
        image.Save(img.id)
    })
    deleteImage.value = []
    setTimeout(() => {
        getPost()
        setLocalFalse()
    }, 4000)
    if (image.value) {
        setMessage("Image Uploaded Successfully", 'success')
    } else {
        setMessage("Image Upload failed!")
    }
}

const formData = reactive({
    name: '',
    amount: null,
    categories: '',
    note: ''
})

const updatePosts = () => {
    if (validateForm()) {
        updatePost(formData, id)
    } else {
        setMessage("Please fix the validation errors!", 'error')
    }
}

const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const remainingSlots = 2 - imageUrl.value.length

    if (files.length + imageFiles.value.length > remainingSlots) {
        setMessage(`You can only upload ${remainingSlots} more image${remainingSlots === 1 ? '' : 's'}`)
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

const removeUrl = (index) => {
    const removedImage = imageUrl.value[index]
    deleteImage.value.push(removedImage)
    imageUrl.value.splice(index, 1)
}

const getPost = async () => {
    await posts.find(id).then((res) => {
        post.value = res.value;
        imageUrl.value = post.value.images
        formData.name = posts.name
        formData.categories = posts.categories
        formData.note = posts.note
        formData.amount = posts.amount
    });
}

onMounted(() => {
    getPost()
})

const isValidToSubmit = computed(() => {
    const totalImages = imageUrl.value.length + imageFiles.value.length
    return totalImages > 0 && totalImages <= 2
})

const handleNext = () => {
    if (isValidToSubmit.value) {
        if (step.value < 2) {
            step.value++
        } else {
            // Submit form logic here
        }
    }
}

const handlePrevious = () => {
    if (step.value > 1) {
        step.value--
    }
}
</script>
