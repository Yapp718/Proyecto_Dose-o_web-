<template>
  <nav>
    <router-link to="/inicio de sesion">Inicio de Sesion</router-link> | 
    <router-link to="/">Inicio</router-link> |
    <router-link to="/inventario">Inventario</router-link> |
    <router-link to="/ventas">Ventas</router-link> |
    <router-link to="/gastos">Gastos</router-link> |
    <router-link to="/reportes">Reportes</router-link>
    
  </nav>
  <router-view/>
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
