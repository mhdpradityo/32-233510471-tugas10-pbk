import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Barang from '../views/Barang.vue'
import MutasiLayout from '../views/mutasi/MutasiLayout.vue'
import BarangMasuk from '../views/mutasi/BarangMasuk.vue'
import BarangKeluar from '../views/mutasi/BarangKeluar.vue'
import Laporan from '../views/Laporan.vue'
import Pengguna from '../views/Pengguna.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/barang', name: 'Barang', component: Barang },
  {
    path: '/mutasi',
    component: MutasiLayout,
    children: [
      { path: 'masuk', name: 'BarangMasuk', component: BarangMasuk },
      { path: 'keluar', name: 'BarangKeluar', component: BarangKeluar }
    ]
  },
  { path: '/laporan', name: 'Laporan', component: Laporan },
  { path: '/pengguna', name: 'Pengguna', component: Pengguna }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
