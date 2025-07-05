<template>
  <div class="page">
    <h2 class="title">Data Barang</h2>

    <form @submit.prevent="submitForm" class="form">
      <input v-model="form.nama" placeholder="Nama Barang" required />
      <input v-model.number="form.stok" type="number" min="0" placeholder="Stok Awal" required />
      <input v-model="form.gambar" placeholder="URL Gambar" required />
      <button type="submit">{{ isEdit ? 'Simpan Perubahan' : 'Tambah Barang' }}</button>
      <button v-if="isEdit" type="button" @click="resetForm">Batal</button>
    </form>

    <div v-if="barangList.length === 0" class="empty">Belum ada data barang.</div>

    <div class="grid">
      <div v-for="item in barangList" :key="item.id" class="card">
        <img :src="item.gambar" alt="gambar" class="gambar" />
        <div class="card-header">
          <h3>{{ item.nama }}</h3>
          <span>Stok: {{ item.stok }}</span>
        </div>
        <div class="card-actions">
          <button @click="editBarang(item)">Edit</button>
          <button @click="hapusBarang(item.id)">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBarangStore } from '../store/barang'

const store = useBarangStore()
const barangList = store.barangList

onMounted(() => {
  store.fetchBarang()
})

const form = ref({
  id: null,
  nama: '',
  stok: 0,
  gambar: ''
})

const isEdit = ref(false)

const submitForm = async () => {
  if (form.value.nama.trim() === '' || form.value.stok < 0 || form.value.gambar.trim() === '') {
    alert('Data tidak valid! Semua kolom wajib diisi.')
    return
  }

  const data = {
    nama: form.value.nama,
    stok: form.value.stok,
    gambar: form.value.gambar
  }

  if (isEdit.value) {
    await store.updateBarang(form.value.id, data)
  } else {
    await store.addBarang(data)
  }

  resetForm()
}

const editBarang = (item) => {
  form.value = { ...item }
  isEdit.value = true
}

const hapusBarang = async (id) => {
  if (confirm('Hapus barang ini?')) {
    await store.deleteBarang(id)
  }
}

const resetForm = () => {
  form.value = { id: null, nama: '', stok: 0, gambar: '' }
  isEdit.value = false
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
  text-align: center;
}

.card:hover {
  transform: scale(1.02);
}

.gambar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
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
