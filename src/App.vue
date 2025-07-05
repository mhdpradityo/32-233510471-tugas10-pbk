<script setup>
import { useAuthStore } from './store/auth'
const auth = useAuthStore()
</script>

<template>
   <router-view />
  <header v-if="auth.user">
    Selamat datang, {{ auth.user.nama }}!
    <button @click="auth.logout()">Logout</button>
  </header>
</template>
