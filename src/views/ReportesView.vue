<template lang="">
<div class="reportes">

  <h1>Reportes</h1>

  <div class="resumen">
    <div class="card ventas">
      <p>Total ventas</p>
      <h2>${{ totalVentas }}</h2>
    </div>

    <div class="card gastos">
      <p>Total gastos</p>
      <h2>${{ totalGastos }}</h2>
    </div>

    <div class="card ganancias">
      <p>Ganancia</p>
      <h2 :class="ganancias >= 0 ? 'positivo' : 'negativo'">
    ${{ ganancias }}
        </h2>
    </div>
  </div>

  <h2>Reporte de Ventas</h2>

  <div class="tabla-contenedor">
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(v,index) in store.ventas" :key="index">
          <td>{{v.producto}}</td>
          <td>{{v.cantidad}}</td>
          <td class="venta">${{v.total}}</td>
          <td>{{v.fecha}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Reporte de Gastos</h2>

  <div class="tabla-contenedor">
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Valor</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(g,index) in store.gastos" :key="index">
          <td>{{g.descripcion}}</td>
          <td class="gasto">-${{g.valor}}</td>
          <td>{{g.fecha}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import { store } from "../store"

export default{

    data(){
        return{
        store
        }
    },

    computed:{

        totalVentas(){
        return this.store.ventas.reduce(
        (total,v)=> total + v.total,0
        )
        },

        totalGastos(){
        return this.store.gastos.reduce(
        (total,g)=> total + Number(g.valor),0
        )
        },

        ganancias(){
        return this.totalVentas - this.totalGastos
        }

    }

}

</script>
<style scoped >

.reportes {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.resumen {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.card p {
  margin: 0;
  color: #64748b;
}

.card h2 {
  margin-top: 10px;
}

.ventas {
  border-left: 6px solid #22c55e;
}

.gastos {
  border-left: 6px solid #ef4444;
}

.ganancias {
  border-left: 6px solid #3b82f6;
}

.positivo { 
    color: #16a34a; 
}
.negativo { 
    color: #dc2626; 
}

.tabla-contenedor {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #1e293b;
  color: white;
}

th {
  padding: 12px;
  text-align: center;
}

td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:hover {
  background: #f8fafc;
}

.venta {
  color: #16a34a;
  font-weight: bold;
}

.gasto {
  color: #dc2626;
  font-weight: bold;
}
@media (max-width: 600px) {

  h1, h2 {
    text-align: center;
  }

  .resumen {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }

  table {
    min-width: 100%;
  }

  thead {
    display: none;
  }

  tr {
    display: block;
    background: white;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    margin-bottom: 8px;
    font-size: 14px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 5px;
  }

  td:last-child {
    border-bottom: none;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #64748b;
  }

}
</style>