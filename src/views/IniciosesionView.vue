<template>
  <div>
    <h1>{{ esRegistro ? 'Crear Cuenta Textil' : 'Iniciar Sesión' }}</h1>

    <form @submit.prevent="procesarFormulario">
      <div>
        <label>Correo:</label>
        <input v-model="email" type="email" required>
      </div>

      <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password" required>
      </div>

      <button type="submit">
        {{ esRegistro ? 'Registrar Usuario' : 'Entrar al Sistema' }}
      </button>
    </form>

    <p>
      {{ esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes usuario?' }}
      <button @click="esRegistro = !esRegistro" type="button">
        {{ esRegistro ? 'Inicia Sesión' : 'Regístrate aquí' }}
      </button>
    </p>

    <p v-if="mensaje" style="color: blue;">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// VARIABLES DE ESTADO
const email = ref('')
const password = ref('')
const esRegistro = ref(false) // Controla si mostramos Login o Registro
const mensaje = ref('')

// "Base de datos" de mentira para probar
const usuariosGuardados = ref([
  { email: 'admin@textil.com', password: '123' }
])

const procesarFormulario = () => {
  if (esRegistro.value) {
    // LÓGICA PARA CREAR USUARIO
    usuariosGuardados.value.push({
      email: email.value,
      password: password.value
    })
    mensaje.value = "¡Usuario creado con éxito! Ahora puedes iniciar sesión."
    esRegistro.value = false // Lo mandamos al login
  } else {
    // LÓGICA PARA ENTRAR
    const existe = usuariosGuardados.value.find(
      u => u.email === email.value && u.password === password.value
    )

    if (existe) {
      router.push({ name: 'inicio' })
    } else {
      mensaje.value = "Error: Usuario no encontrado."
    }
  }
}
</script>