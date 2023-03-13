import { createRouter, createWebHistory } from 'vue-router'
import Registration from "@/pages/Registration"
import LoginPage from "@/pages/LoginPage"
import Loading from "@/pages/Loading"
import TimeSelect from "@/pages/TimeSelect"
import CheckOut from "@/pages/CheckOut"

const routes = [
  {
    path: '/',
    name: 'loading-page',
    component: Loading
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/login-page',
    component: LoginPage
  },
  {
    path: '/time-select',
    component: TimeSelect
  },
  {
    path: '/check-out',
    component: CheckOut
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
