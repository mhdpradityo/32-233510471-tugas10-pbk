<template>
  <div class="page">
    <h2 class="title">Barang Keluar</h2>

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
        placeholder="Jumlah keluar"
        required
      />

      <button type="submit">Keluarkan</button>
    </form>

    <div v-if="keluarList.length === 0" class="empty">Belum ada transaksi keluar.</div>

    <div class="grid">
      <div v-for="item in keluarList" :key="item.id" class="card">
        <h3>{{ getBarangNama(item.barangId) }}</h3>
        <p>Jumlah keluar: {{ item.jumlah }}</p>
        <p><small>Tanggal: {{ item.tanggal }}</small></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBarangKeluarStore } from '../../store/barangKeluar'
import { useBarangStore } from '../../store/barang'

const keluarStore = useBarangKeluarStore()
const barangStore = useBarangStore()

const form = ref({
  barangId: '',
  jumlah: 1
})

onMounted(() => {
  barangStore.fetchBarang()
  keluarStore.fetchBarangKeluar()
})

const barangList = barangStore.barangList
const keluarList = keluarStore.barangKeluarList

const submitForm = async () => {
  if (!form.value.barangId || form.value.jumlah <= 0) {
    alert('Form tidak boleh kosong dan jumlah harus lebih dari 0.')
    return
  }

  const barang = barangList.find(b => b.id === form.value.barangId)
  if (!barang) {
    alert('Barang tidak ditemukan!')
    return
  }

  if (form.value.jumlah > barang.stok) {
    alert('Stok tidak mencukupi untuk barang keluar!')
    return
  }

  await keluarStore.addBarangKeluar({
    ...form.value,
    tanggal: new Date().toISOString().split('T')[0] // Tambahkan tanggal
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
  background-color: #e74c3c;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
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
