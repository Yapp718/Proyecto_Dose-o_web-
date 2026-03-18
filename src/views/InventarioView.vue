<template>
<div class="inventario">

  <h1>Inventario</h1>

  <div class="formulario">
    <input v-model="producto" placeholder="Producto">
    <input v-model.number="stock" placeholder="Stock">
    <input type="number" v-model="precioBase" placeholder="Precio base">
    <button class="btn-agregar" @click="agregarProducto">Agregar</button>
  </div>

  <div class="tabla-contenedor">
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Stock</th>
          <th>Precio Base</th>
          <th>Precio Venta</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(p,index) in store.productos" :key="index">
          <td>{{p.nombre}}</td>
          <td class="stock">{{p.stock}}</td>
          <td>${{p.precioBase}}</td>
          <td>${{p.precioFinal}}</td>
          <td>{{ p.fecha }}</td>

          <td>
            <button class="btn-eliminar" @click="eliminarProducto(index)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Inventario Gastos</h2>

  <div class="tabla-contenedor">
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Stock</th>
          <th>Precio Base</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(p,index) in inventarioGeneral" :key="index">
          <td>{{p.nombre}}</td>
          <td class="stock">{{p.stock}}</td>
          <td>${{p.precioBase}}</td>
          <td>{{p.fecha}}</td>
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

        producto:"",
        stock:0,
        precioBase:0,
        fecha:"",

        store

        }

    },
    computed:{
    inventarioGeneral(){

        return this.store.gastos
        .filter(g => g.producto) 
        .map(g => ({

        nombre:g.producto,
        stock:g.cantidad,
        precioBase:g.valor,
        precioFinal:0,
        fecha:g.fecha

        }))

        }
    

},

    methods:{

        agregarProducto(){

        if(this.producto && this.stock){

        this.store.productos.push({
        nombre:this.producto,
        precioBase:this.precioBase,
        precioFinal:0,
        stock:this.stock,
        fecha:this.fecha || new Date().toISOString().split('T')[0]
        })

        this.store.guardar()

        this.producto=""
        this.stock=0
        this.precioBase=0
        this.fecha=""

        }

        },

        eliminarProducto(index){

        this.store.productos.splice(index,1)

        this.store.guardar()

        }

    }

}

</script>

<style scoped>
/* ================= BASE ================= */ 
.inventario {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

/* FORMULARIO */
.formulario {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.formulario input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  font-size: 14px;
  transition: 0.3s;
}

.formulario input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34,197,94,0.3);
}


.btn-agregar {
  background: #22c55e;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-agregar:hover {
  background: #16a34a;
  transform: translateY(-2px);
}


.tabla-contenedor {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin-bottom: 25px;
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
  background: #f0fdf4;
}

.stock {
  font-weight: bold;
  color: #3b82f6;
}

.btn-eliminar {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-eliminar:hover {
  background: #b91c1c;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(239,68,68,0.5);
}
</style>