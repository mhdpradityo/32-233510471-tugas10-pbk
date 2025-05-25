<template>
  <div>
    <h1>Laporan Stok Barang</h1>
    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Stok Awal</th>
          <th>Barang Masuk</th>
          <th>Barang Keluar</th>
          <th>Stok Akhir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in laporan" :key="item.nama">
          <td>{{ item.nama }}</td>
          <td>{{ item.stokAwal }}</td>
          <td>{{ item.masuk }}</td>
          <td>{{ item.keluar }}</td>
          <td>{{ item.stokAkhir }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const laporan = reactive([
      { nama: 'Kursi', stokAwal: 40, masuk: 10, keluar: 3, stokAkhir: 47 },
      { nama: 'Meja', stokAwal: 15, masuk: 5, keluar: 2, stokAkhir: 18 },
      { nama: 'Laptop', stokAwal: 13, masuk: 2, keluar: 1, stokAkhir: 14 }
    ])

    return { laporan }
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
