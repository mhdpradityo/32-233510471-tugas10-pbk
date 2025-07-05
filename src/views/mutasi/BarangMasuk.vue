<template>
  <div class="page">
    <h2 class="title">Barang Masuk</h2>

    <form @submit.prevent="submitForm" class="form">
      <select v-model="form.barangId" required>
        <option disabled value="">Pilih Barang</option>
        <option v-for="b in barangList" :key="b.id" :value="b.id">
          {{ b.nama }} (Stok: {{ b.stok }})
        </option>
      </select>

      <input
        type="number"
        v-model.number="form.jumlah"
        min="1"
        placeholder="Jumlah masuk"
        required
      />

      <button type="submit">Tambah Masuk</button>
    </form>

    <div v-if="masukList.length === 0" class="empty">Belum ada transaksi masuk.</div>

    <div class="grid">
      <div v-for="item in masukList" :key="item.id" class="card">
        <h3>{{ getBarangNama(item.barangId) }}</h3>
        <p>Jumlah masuk: {{ item.jumlah }}</p>
        <p><small>Tanggal: {{ item.tanggal }}</small></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBarangMasukStore } from '../../store/barangMasuk'
import { useBarangStore } from '../../store/barang'

const masukStore = useBarangMasukStore()
const barangStore = useBarangStore()

const form = ref({
  barangId: '',
  jumlah: 1
})

onMounted(() => {
  barangStore.fetchBarang()
  masukStore.fetchBarangMasuk()
})

const barangList = barangStore.barangList
const masukList = masukStore.barangMasukList

const submitForm = async () => {
  if (!form.value.barangId || form.value.jumlah <= 0) {
    alert('Form tidak boleh kosong dan jumlah harus positif.')
    return
  }

  await masukStore.addBarangMasuk({
    ...form.value,
    tanggal: new Date().toISOString().split('T')[0] // ⬅️ tambahkan tanggal
  })

  form.value.barangId = ''
  form.value.jumlah = 1
}

const getBarangNama = (id) => {
  const b = barangList.find(x => x.id === id)
  return b ? b.nama : 'Barang tidak ditemukan'
}
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

select,
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1 1 200px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: #fdfdfd;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
}
</style>
