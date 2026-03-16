<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados para controlar el formulario
const esModoLogin = ref(true)
const email = ref('')
const password = ref('')
const nombre = ref('') 

// --- AQUÍ VA LA LÓGICA CON LOCALSTORAGE ---
const procesarFormulario = () => {
  // Obtenemos los usuarios ya registrados en el navegador
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]')

  if (esModoLogin.value) {
    // LÓGICA PARA ENTRAR
    const usuarioEncontrado = usuariosGuardados.find(
      u => u.email === email.value && u.password === password.value
    )

    if ((email.value === 'admin@textil.com' && password.value === '1234') || usuarioEncontrado) {
      router.push({ name: 'home' })
    } else {
      alert("Usuario no encontrado o datos incorrectos")
    }

  } else {
    // LÓGICA PARA REGISTRAR
    if (nombre.value && email.value && password.value) {
      const nuevo = {
        nombre: nombre.value,
        email: email.value,
        password: password.value
      }

      usuariosGuardados.push(nuevo)
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

      alert("¡Usuario creado! Ya puedes iniciar sesión.")
      esModoLogin.value = true // Cambiamos a vista de login automáticamente
      nombre.value = '' // Limpiamos el nombre
    }
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>{{ esModoLogin ? 'Bienvenido' : 'Crea tu cuenta' }}</h1>

    <form @submit.prevent="procesarFormulario">
      <div v-if="!esModoLogin">
        <label>Nombre:</label>
        <input v-model="nombre" type="text" placeholder="Tu nombre" required>
      </div>

      <label>Correo:</label>
      <input v-model="email" type="email" placeholder="correo@ejemplo.com" required>

      <label>Contraseña:</label>
      <input v-model="password" type="password" placeholder="********" required>

      <button type="submit">
        {{ esModoLogin ? 'Ingresar' : 'Registrarse' }}
      </button>
    </form>

    <div class="footer-links">
      <button @click="esModoLogin = !esModoLogin" class="btn-switch">
        {{ esModoLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 350px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background: white;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: block;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.btn-switch {
  background: none;
  color: #42b983;
  margin-top: 15px;
  text-decoration: underline;
}
</style>