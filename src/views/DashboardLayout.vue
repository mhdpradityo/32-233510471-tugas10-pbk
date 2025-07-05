<template>
  <div class="layout">
    <header class="navbar">
      <h2>📦 Inventaris App</h2>
      <div class="user-info">
        <span>👋 {{ auth.user?.nama }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <nav class="sidebar">
      <router-link to="/dashboard" exact-active-class="active">🏠 Dashboard</router-link>
      <router-link to="/dashboard/barang" exact-active-class="active">📁 Barang</router-link>
      <router-link to="/dashboard/barang-masuk" exact-active-class="active">⬇️ Barang Masuk</router-link>
      <router-link to="/dashboard/barang-keluar" exact-active-class="active">⬆️ Barang Keluar</router-link>
      <router-link to="/dashboard/laporan" exact-active-class="active">📊 Laporan</router-link>
      <router-link to="/dashboard/pengguna" exact-active-class="active">👤 Pengguna</router-link>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "navbar navbar"
    "sidebar main";
  min-height: 100vh;
}

.navbar {
  grid-area: navbar;
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-info button {
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.user-info button:hover {
  background: #c0392b;
}

.sidebar {
  grid-area: sidebar;
  background: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  padding: 8px;
  border-radius: 6px;
  transition: 0.2s;
}

.sidebar a:hover,
.sidebar a.active {
  background-color: #3498db;
  color: white;
}

.main-content {
  grid-area: main;
  padding: 2rem;
  background: #fcfcfc;
}
</style>
