import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

import Login from '../views/Login.vue'
import DashboardHome from '../views/DashboardHome.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import Barang from '../views/Barang.vue'
import BarangMasuk from '../views/mutasi/BarangMasuk.vue'
import BarangKeluar from '../views/mutasi/BarangKeluar.vue'
import Laporan from '../views/Laporan.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
 {
  path: '/dashboard',
  component: DashboardLayout,
  children: [
    { path: '', name: 'DashboardHome', component: DashboardHome },
    { path: 'barang', name: 'Barang', component: Barang },
    { path: 'barang-masuk', name: 'BarangMasuk', component: BarangMasuk },
    { path: 'barang-keluar', name: 'BarangKeluar', component: BarangKeluar },
    { path: 'laporan', name: 'Laporan', component: Laporan },
    { path: 'pengguna', name: 'Pengguna', component: () => import('../views/Pengguna.vue') } // ✅
  ]
},

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🛡️ Proteksi Route yang Butuh Login
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !auth.user) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && auth.user) {
    next({ name: 'DashboardHome' }) // kalau udah login, redirect ke dashboard
  } else {
    next()
  }
})

export default router
