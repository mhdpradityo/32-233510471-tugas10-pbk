<template>
  <div>
    <h1>Barang Masuk</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Barang</th>
          <th>Jumlah Masuk</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in barangMasuk" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ item.tanggal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const barangMasuk = reactive([
      { id: 1, nama: 'Kursi', jumlah: 10, tanggal: '2025-05-20' },
      { id: 2, nama: 'Meja', jumlah: 5, tanggal: '2025-05-21' },
      { id: 3, nama: 'Laptop', jumlah: 2, tanggal: '2025-05-22' }
    ])

    return { barangMasuk }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
}
th {
  background-color: #eee;
}
</style>
