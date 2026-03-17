<template>
  <div>
    <h1>Dashboard - {{ nombreEmpresa }}</h1>
    <h3>Bienvenido(a), {{ nombreUsuario }}</h3>
    
    <hr>

    <h3>Capital actual: {{ store.capital }}</h3>
    <h3>Total ventas: {{ totalVentas }}</h3>
    <h3>Total gastos: {{ totalGastos }}</h3>
    <h3>Ganancia: {{ ganancia }}</h3>
    
    <div class="acciones-capital">
      <input type="number" v-model.number="capitalMovimiento" 
      placeholder="Monto para agregar o retirar">
      <button @click="agregarCapital">Agregar</button>
      <button @click="retirarCapital">Retirar</button>
    </div>

    <h2>Movimientos de Capital</h2>

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, index) in store.movimientosCapital" :key="index">
          <td>{{ m.tipo }}</td>
          <td>{{ m.valor }}</td>
          <td>{{ m.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { store } from "../store"

export default {
  name: "InicioVue",
  data() {
    return {
      store,
      capitalInicial: 0,
      capitalMovimiento: 0,
      nombreEmpresa: '',
      nombreUsuario: '' // Añadimos esta variable para el saludo personal
    }
  },
  mounted() {
    // Leemos los dos datos que guardó el Login en el navegador
    this.nombreEmpresa = localStorage.getItem('empresaActual') || 'Mi Empresa';
    this.nombreUsuario = localStorage.getItem('usuarioActual') || 'Usuario';
  },
  computed: {
    totalVentas() {
      return this.store.ventas.reduce(
        (total, v) => total + v.total, 0
      )
    },
    totalGastos() {
      return this.store.gastos.reduce(
        (total, g) => total + Number(g.valor), 0
      )
    },
    ganancia() {
      return this.totalVentas - this.totalGastos
    },
    capitalActual() {
      return this.capitalInicial + this.ganancia
    }
  },
  methods: {
    agregarCapital() {
      if (this.capitalMovimiento > 0) {
        this.store.capital += this.capitalMovimiento
        this.registrarMovimiento("Ingreso")
      }
    },
    retirarCapital() {
      // Añadí una validación simple para que no retiren más de lo que hay
      if (this.capitalMovimiento > 0 && this.store.capital >= this.capitalMovimiento) {
        this.store.capital -= this.capitalMovimiento
        this.registrarMovimiento("Retiro")
      } else if (this.capitalMovimiento > this.store.capital) {
        alert("No tienes suficiente capital para retirar esa cantidad")
      }
    },
    registrarMovimiento(tipo) {
      this.store.movimientosCapital.push({
        tipo: tipo,
        valor: this.capitalMovimiento,
        fecha: new Date().toLocaleDateString()
      })
      this.store.guardar()
      this.capitalMovimiento = 0
    }
  }
}
</script>

<style scoped>
/* Un poco de espacio para que no se vea todo amontonado */
.acciones-capital {
  margin: 20px 0;
}
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 15px;
  margin-right: 5px;
  cursor: pointer;
}
table {
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  padding: 10px;
}
</style>