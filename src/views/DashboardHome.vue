<template>
  <div class="dashboard-home">
    <h2>Selamat Datang, {{ auth.user?.nama }} 👋</h2>

    <div class="grid">
      <div class="card">
        <h3>Total Barang</h3>
        <p>{{ barangStore.barangList.length }}</p>
      </div>
      <div class="card">
        <h3>Total Masuk</h3>
        <p>{{ totalMasuk }}</p>
      </div>
      <div class="card">
        <h3>Total Keluar</h3>
        <p>{{ totalKeluar }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useBarangStore } from '../store/barang'
import { useBarangMasukStore } from '../store/barangMasuk'
import { useBarangKeluarStore } from '../store/barangKeluar'

const auth = useAuthStore()
const barangStore = useBarangStore()
const masukStore = useBarangMasukStore()
const keluarStore = useBarangKeluarStore()

onMounted(() => {
  barangStore.fetchBarang()
  masukStore.fetchBarangMasuk()
  keluarStore.fetchBarangKeluar()
})

const totalMasuk = computed(() =>
  masukStore.barangMasukList.reduce((sum, item) => sum + item.jumlah, 0)
)

const totalKeluar = computed(() =>
  keluarStore.barangKeluarList.reduce((sum, item) => sum + item.jumlah, 0)
)
</script>

<style scoped>
.dashboard-home {
  padding: 2rem;
  font-family: sans-serif;
}

h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.card {
  background: #f4f4f4;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: 0.2s ease;
}

.card:hover {
  transform: scale(1.03);
  background-color: #e8f0ff;
}

.card h3 {
  margin-bottom: 0.5rem;
  color: #34495e;
}

.card p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3498db;
}
</style>
