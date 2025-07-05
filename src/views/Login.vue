<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="form">
      <input v-model="username" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  const success = await auth.login(username.value, password.value);
  if (success) {
    router.push("/dashboard");
  } else {
    error.value = "Username atau password salah";
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
