<template>
  <div class="page">
    <h2 class="title">👥 Data Pengguna Sistem</h2>

    <table class="user-table">
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

<script setup>
import { reactive } from 'vue'

const pengguna = reactive([
  { id: 1, nama: 'Admin Utama', username: 'admin', role: 'Admin' },
  { id: 2, nama: 'Operator Gudang', username: 'operator1', role: 'Operator' },
  { id: 3, nama: 'Manajer', username: 'manager', role: 'Manager' }
])
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
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.user-table th {
  background-color: #3498db;
  color: white;
  padding: 12px;
  text-align: left;
}

.user-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
