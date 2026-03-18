<template>
  <div>
    <h1 class="dashboard">Dashboard - {{ nombreEmpresa }}</h1>
    <h3>Bienvenido(a), {{ nombreUsuario }}</h3>
    
    <hr>
    <div class="dashboard">
      <div class="top-stats">
        <h3 class="stats ventas">Total ventas: {{ totalVentas }}</h3>
        <h3 class="stats gastos">Total gastos: {{ totalGastos }}</h3>
      </div>
      <h2 :class="store.capital >= 0 ? 'positivo' : 'negativo'" class="capital">
          Capital actual: {{ store.capital }}
        </h2> 
      <h3 class="stats ganancia">Ganancia: {{ ganancia }}</h3>
      <div class="acciones-capital">
        <input 
          type="number" 
          v-model.number="capitalMovimiento"
          placeholder="Monto para agregar o retirar"
        >
        <button class="agregar" @click="agregarCapital">Agregar</button>
        <button class="retirar" @click="retirarCapital">Retirar</button>
      </div>

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
           <td :class="m.tipo === 'Ingreso' ? 'ingreso' : 'retiro'">
              {{ m.tipo}}
          </td>
          <td :class="m.tipo === 'Ingreso' ? 'ingreso' : 'retiro'">
            {{ m.valor === 'Ingreso' ? '+' : '-' }}${{ m.valor }}
          </td>
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
/* ================= BASE ================= */
body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f4f6f9;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-top: 50px;
}

h2 {
  text-align: center;
  color: #475569;
}

/* ================= NAVBAR ================= */
nav {
  background: #1e293b;
  padding: 15px;
  text-align: center;
}

nav a {
  color: #e2e8f0;
  margin: 0 12px;
  text-decoration: none;
  font-weight: 500;
}

nav a:hover {
  color: #38bdf8;
}

/* ================= DASHBOARD ================= */
.dashboard {
  max-width: 800px;
  padding-top: 20px;
  margin: auto;
  text-align: center;
}
.top-stats {
  display: flex;
  gap: 20px;
}

.positivo { 
  color: #16a34a;
}
.negativo { 
  color: #dc2626;
}

/* Tarjetas */
.stats {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.ventas { 
  border-left: 6px solid #22c55e; 
}
.gastos { 
  border-left: 6px solid #ef4444; 
}
.ganancia {
  margin-top: 15px;
  border-left: 6px solid #a855f7;
  width: 60%;
  margin-inline: auto;
}

.capital {
  margin: 30px 0;
  font-size: 32px;
  font-weight: bold;
  background: white;
  padding: 20px;
  border-radius: 16px;
  border-left: 8px solid #3b82f6;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

/* ================= ACCIONES ================= */
.acciones-capital {
  margin-top: 25px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.acciones-capital input {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 16px;
  transition: 0.3s;
}

.acciones-capital input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 10px rgba(34,197,94,0.4);
}
button {
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  padding: 14px 18px;
  transition: 0.2s;
}

button:active {
  transform: scale(0.95);
}

/* Agregar */
.agregar {
  background: #22c55e;
  color: white;
}

.agregar:hover {
  background: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34,197,94,0.4);
}

/* Retirar */
.retirar {
  background: #ef4444;
  color: white;
}

.retirar:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(239,68,68,0.4);
}

/* ================= TABLA ================= */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background: #1e293b;
  color: white;
}

th, td {
  padding: 12px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background: #f1f5f9;
}

tbody tr:hover {
  background: #e0f2fe;
}

/* ================= INGRESO RETIRO ================= */
.ingreso {
  color: #16a34a;
  background: #dcfce7;
  padding: 5px 8px;
  border-radius: 6px;
  font-weight: bold;
}

.retiro {
  color: #dc2626;
  background: #fee2e2;
  padding: 5px 8px;
  border-radius: 6px;
  font-weight: bold;
}
</style>