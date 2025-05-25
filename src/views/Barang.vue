<template>
  <div>
    <h1>Data Barang</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Barang</th>
          <th>Stok</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in barang" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.stok }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const barang = reactive([
      { id: 1, nama: 'Kursi', stok: 50 },
      { id: 2, nama: 'Meja', stok: 20 },
      { id: 3, nama: 'Laptop', stok: 15 }
    ])

    return { barang }
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
