<template>
  <div class="page">
    <h2 class="title">Laporan Inventaris</h2>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Stok Saat Ini</th>
          <th>Total Masuk</th>
          <th>Total Keluar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in barangStore.barangList" :key="b.id">
          <td>{{ b.nama }}</td>
          <td>{{ b.stok }}</td>
          <td>{{ totalMasuk(b.id) }}</td>
          <td>{{ totalKeluar(b.id) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBarangStore } from '../store/barang'
import { useBarangMasukStore } from '../store/barangMasuk'
import { useBarangKeluarStore } from '../store/barangKeluar'

const barangStore = useBarangStore()
const masukStore = useBarangMasukStore()
const keluarStore = useBarangKeluarStore()

onMounted(() => {
  barangStore.fetchBarang()
  masukStore.fetchBarangMasuk()
  keluarStore.fetchBarangKeluar()
})

const totalMasuk = (id) =>
  masukStore.barangMasukList
    .filter(t => t.barangId === id)
    .reduce((acc, t) => acc + t.jumlah, 0)

const totalKeluar = (id) =>
  keluarStore.barangKeluarList
    .filter(t => t.barangId === id)
    .reduce((acc, t) => acc + t.jumlah, 0)
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px 12px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
