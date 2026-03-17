<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados de control
const esModoLogin = ref(true)
const esModoRecuperar = ref(false)

// Campos del formulario
const email = ref('')
const password = ref('')
const nombreCompleto = ref('')
const identificacion = ref('')
const tipoIdentificacion = ref('')
const nombreEmpresa = ref('')

const procesarFormulario = () => {
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]')

  if (esModoLogin.value) {
    // --- LÓGICA DE LOGIN ---
    const usuarioEncontrado = usuariosGuardados.find(
      u => u.email === email.value && u.password === password.value
    )

    if ((email.value === 'admin@textil.com' && password.value === '1234') || usuarioEncontrado) {
      // Guardamos datos para el Dashboard
      const empresaParaMostrar = usuarioEncontrado ? usuarioEncontrado.empresa : 'Textil Central';
      const usuarioParaMostrar = usuarioEncontrado ? usuarioEncontrado.nombre : 'Administrador';
      
      localStorage.setItem('empresaActual', empresaParaMostrar);
      localStorage.setItem('usuarioActual', usuarioParaMostrar);
      
      router.push({ name: 'home' })
    } else {
      alert("Correo o contraseña incorrectos")
    }
  } else {
    // --- LÓGICA DE REGISTRO ---
    if (usuariosGuardados.some(u => u.email === email.value)) {
      alert("Este correo ya está registrado");
      return;
    }

    const nuevoUsuario = {
      nombre: nombreCompleto.value,
      id: identificacion.value,
      tipoId: tipoIdentificacion.value,
      empresa: nombreEmpresa.value,
      email: email.value,
      password: password.value
    }

    usuariosGuardados.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

    alert("¡Cuenta de empresa creada!");
    esModoLogin.value = true
    limpiarCampos()
  }
}

const recuperarClave = () => {
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]')
  const usuario = usuariosGuardados.find(u => u.email === email.value && u.id === identificacion.value)

  if (usuario) {
    alert(`Hola ${usuario.nombre}. Tu clave es: ${usuario.password}`)
    esModoRecuperar.value = false
  } else {
    alert("Datos no coinciden.")
  }
}

const limpiarCampos = () => {
  nombreCompleto.value = ''; identificacion.value = '';
  tipoIdentificacion.value = ''; nombreEmpresa.value = '';
  email.value = ''; password.value = '';
}
</script>

<template>
  <div class="auth-container">
    <h1 v-if="esModoRecuperar">Recuperar Clave</h1>
    <h1 v-else>{{ esModoLogin ? 'Ingreso al Sistema' : 'Registro de Empresa' }}</h1>

    <form v-if="esModoRecuperar" @submit.prevent="recuperarClave">
      <p style="margin-bottom: 20px; color: #666;">Ingresa tu correo e identificación para mostrar tu clave.</p>
      
      <label>Correo Electrónico:</label>
      <input v-model="email" type="email" placeholder="correo@empresa.com" required>
      
      <label>Número de Identificación:</label>
      <input v-model="identificacion" type="text" placeholder="Número de ID" required>
      
      <button type="submit">Mostrar Contraseña</button>
      <button type="button" @click="esModoRecuperar = false" class="btn-switch">Volver al Inicio</button>
    </form>

    <form v-else @submit.prevent="procesarFormulario">
      
      <div v-if="!esModoLogin">
        <label>Nombre Completo:</label>
        <input v-model="nombreCompleto" type="text" placeholder="Ej: Juan Pérez" required>

        <label>Tipo de Identificación:</label>
        <select v-model="tipoIdentificacion" required>
          <option value="" disabled selected>Seleccione uno...</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="NIT">NIT (Empresa)</option>
          <option value="CE">Cédula de Extranjería</option>
        </select>

        <label>Número de Identificación:</label>
        <input v-model="identificacion" type="text" placeholder="Número de ID" required>

        <label>Nombre de la Empresa:</label>
        <input v-model="nombreEmpresa" type="text" placeholder="Nombre comercial" required>
      </div>

      <label>Correo Electrónico:</label>
      <input v-model="email" type="email" placeholder="correo@empresa.com" required>

      <label>Contraseña:</label>
      <input v-model="password" type="password" placeholder="********" required>

      <button type="submit">
        {{ esModoLogin ? 'Entrar' : 'Registrar Empresa' }}
      </button>

      <p v-if="esModoLogin" style="text-align: center; margin-top: 15px;">
        <a @click.prevent="esModoRecuperar = true" href="#" style="color: #666; font-size: 0.85em;">¿Olvidaste tu contraseña?</a>
      </p>
    </form>

    <div style="text-align: center;">
      <button @click="esModoLogin = !esModoLogin; esModoRecuperar = false" class="btn-switch">
        {{ esModoLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 450px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  background: #ffffff;
  text-align: left;
}
h1 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
label { font-weight: bold; font-size: 0.9em; color: #555; }
input, select {
  width: 100%;
  padding: 12px;
  margin: 8px 0 18px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: block;
  box-sizing: border-box;
  font-size: 1em;
}
button {
  width: 100%;
  padding: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  transition: background 0.3s;
}
button:hover { background-color: #3aa876; }
.btn-switch {
  background: none;
  color: #42b983;
  margin-top: 20px;
  text-decoration: none;
  font-size: 0.9em;
  width: auto;
}
</style>