<template>
  <div id="app">
    <nav v-if="$route.path !== '/'">
      <router-link to="/inicio">Inicio</router-link> |
      <router-link to="/inventario">Inventario</router-link> |
      <router-link to="/ventas">Ventas</router-link> |
      <router-link to="/gastos">Gastos</router-link> |
      <router-link to="/reportes">Reportes</router-link> |
      <router-link to="/calcular">Calculadora</router-link> |
      <router-link to="/">Cerrar Sesión</router-link>
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
