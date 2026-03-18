<template>
  <div id="app">

    <nav v-if="$route.path !== '/'" class="minimenur">

  <div class="logo">Tulibreta.com</div>

  <!-- BOTÓN HAMBURGUESA -->
  <div class="menu-cambio" @click="menuAbierto = !menuAbierto">
    ☰
  </div>

  <!-- LINKS -->
  <div :class="['links', { activo: menuAbierto }]">
    <router-link to="/inicio">Inicio</router-link>
    <router-link to="/inventario">Inventario</router-link>
    <router-link to="/ventas">Ventas</router-link>
    <router-link to="/gastos">Gastos</router-link>
    <router-link to="/reportes">Reportes</router-link>
    <router-link to="/calcular">Calculadora</router-link>
    <router-link to="/" class="logout">Cerrar Sesión</router-link>
  </div>

</nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuAbierto: false
    }
  }
}
</script>


<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.minimenur {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px 30px;
  border-bottom: 2px solid #22c55e;
  position: relative; /* IMPORTANTE */
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #16a34a;
}

/* BOTÓN HAMBURGUESA (oculto en PC) */
.menu-cambio {
  display: none;
  font-size: 26px;
  color: rgb(3, 57, 206);
  cursor: pointer;
  font-weight: bold;
}

/* LINKS (modo normal PC) */
.links {
  display: flex;
  align-items: center;
}

/* LINKS INDIVIDUALES */
.links a {
  margin-left: 20px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: 0.2s;
  background-color: #3f3f3f;
}

.links a:hover {
  background: #dcfce7;
  color: #16a34a;
}

/* LINK ACTIVO */
.links a.router-link-exact-active {
  background: #22c55e;
  color: white;
  border-bottom: 3px solid #13813c;
}

/* BOTÓN LOGOUT */
.logout {
  color: white !important;
  background: #ef4444 !important;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.logout:hover {
  background: black;
  color: #ffffff !important;
  border: 2px solid #ef4444;
  box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444;
  transform: scale(1.08) rotate(-1deg);
}

@media (max-width: 700px) {

  .menu-cambio {
    display: block;
  }

  .links {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #2c3e50;

    display: flex;
    flex-direction: column;
    align-items: center;

    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  /* Cuando se abre */
  .links.activo {
    max-height: 500px;
    padding: 15px 0;
  }

  /* Links en vertical */
  .links a {
    margin: 10px 0;
    width: 80%;
    text-align: center;
  }

}

</style>
