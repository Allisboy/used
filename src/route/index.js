import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import Community from '../views/Community.vue'
import { useAuthStore } from '../appwrite/utils/global'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component:()=>import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/post/create',
      name: 'create-post',
      component:()=>import('../views/PostView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/post/view/:postId',
      name: 'view-post',
      component:()=>import('../views/ViewPost.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/post/update/:postId',
      name: 'update-post',
      component:()=>import('../views/UpdateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/myshop',
      name: 'myshop',
      component:()=>import('../views/MyShop.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/community',
      name: 'community',
      component:Community,
    },
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth) {
    await auth.fetchUser()
    if (auth.isAuthenticated) {
      next()
      // console.log(auth.isAuthenticated)
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router