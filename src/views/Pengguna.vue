<template>
  <div>
    <h1>Data Pengguna Sistem</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in pengguna" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nama }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const pengguna = reactive([
      { id: 1, nama: 'Admin Utama', username: 'admin', role: 'Admin' },
      { id: 2, nama: 'Operator Gudang', username: 'operator1', role: 'Operator' },
      { id: 3, nama: 'Manajer', username: 'manager', role: 'Manager' }
    ])

    return { pengguna }
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
