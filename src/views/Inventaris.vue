<template>
  <div class="page">
    <h2 class="title">Inventaris Barang</h2>

    <form @submit.prevent="tambah" class="form">
      <input v-model="form.nama" placeholder="Nama Barang" required />
      <input
        v-model.number="form.stok"
        type="number"
        min="0"
        placeholder="Stok Awal"
        required
      />
      <button type="submit">Tambah</button>
    </form>

    <div v-if="barang.length === 0" class="empty">Belum ada data barang.</div>

    <div class="grid">
      <div v-for="item in barang" :key="item.id" class="card">
        <div v-if="editId === item.id">
          <input v-model="editForm.nama" />
          <input type="number" v-model.number="editForm.stok" min="0" />
          <button @click="simpan(item.id)">Simpan</button>
          <button @click="editId = null">Batal</button>
        </div>
        <div v-else>
          <div class="card-header">
            <h3>{{ item.nama }}</h3>
            <span>Stok: {{ item.stok }}</span>
          </div>
          <div class="card-actions">
            <button @click="tambahStok(item.id)">+1</button>
            <button @click="kurangiStok(item.id, item.stok)" :disabled="item.stok === 0">-1</button>
            <button @click="edit(item)">Edit</button>
            <button @click="hapus(item.id)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useInventarisStore } from '../store/inventaris'

const store = useInventarisStore()
const barang = store.barang

onMounted(() => {
  store.fetchBarang()
})

const form = ref({ nama: '', stok: 0 })

const tambah = async () => {
  if (form.value.stok < 0) {
    alert('Stok tidak boleh negatif!')
    return
  }
  await store.tambahBarang({ ...form.value })
  form.value.nama = ''
  form.value.stok = 0
}

const tambahStok = async (id) => {
  await store.tambahStok(id)
}

const kurangiStok = async (id, stokSaatIni) => {
  if (stokSaatIni <= 0) {
    alert('Stok tidak boleh kurang dari 0!')
    return
  }
  await store.kurangiStok(id)
}

const editId = ref(null)
const editForm = ref({ nama: '', stok: 0 })

const edit = (item) => {
  editId.value = item.id
  editForm.value = { ...item }
}

const simpan = async (id) => {
  if (editForm.value.stok < 0) {
    alert('Stok tidak boleh negatif!')
    return
  }
  await store.updateBarang(id, { ...editForm.value })
  editId.value = null
}

const hapus = async (id) => {
  if (confirm('Hapus barang ini?')) {
    await store.hapusBarang(id)
  }
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
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1 1 200px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #36976f;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-actions button {
  margin-right: 0.5rem;
}
</style>
