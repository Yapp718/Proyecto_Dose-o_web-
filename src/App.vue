<template>
  <div id="app">

    <nav v-if="$route.path !== '/'" class="minimenur">
    <div class="logo">Textil Central</div>

      <div class="links">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

/* Navbar */
.minimenur {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px 30px;
  border-bottom: 2px solid #22c55e;
}

/* Logo */
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #16a34a;
}

/* Links */
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

/* Link ACTIVO  */
.links a.router-link-exact-active {
  background: #22c55e;
  color: white;
  border-bottom: 3px solid #13813c;
}

/* Cerrar Sesión */
.logout {
  color: white !important; /*+sin el !important, el hover no funciona*/
  background: #ef4444 !important;
  border: 2px solid rgb(32, 32, 32);
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

</style>
