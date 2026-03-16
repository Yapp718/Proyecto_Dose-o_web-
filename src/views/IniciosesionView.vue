<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Importamos el navegador

const router = useRouter() // Creamos la variable para navegar
const email = ref('')
const password = ref('')

// AQUÍ VA LA FUNCIÓN:
const entrar = () => {
  if (email.value === 'admin@textil.com' && password.value === '1234') {
    // Te manda a la ruta que en tu router/index.js se llama 'home'
    router.push({ name: 'home' })  
  } else {
    alert("Datos incorrectos")
  }
}
</script>

<template>
  <div>
    <h2>Inicio de Sesión</h2>
    
    <form @submit.prevent="entrar">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Correo electrónico" 
        required
      >
      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña" 
        required
      >
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>