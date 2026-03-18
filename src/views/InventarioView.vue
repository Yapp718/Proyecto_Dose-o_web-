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
input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 5px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #16a34a;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 600px;
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

.stock {
  font-weight: bold;
  color: #3b82f6;
}

.btn-eliminar {
  background: #ef4444;
  color: white;
}
@media (max-width: 700px) {

  thead{
    display: none;
  }

  input {
    width: 70%;
    margin-bottom: 10px;
    font-size: 16px;
    padding: 12px;
  }

  button {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}

  table {
    border-radius: 12px;
    background: white;
    min-width: 600px;
  }

  thead {
    font-size: 14px;
  }

  td, th {
    padding: 10px;
  }
}

@media (max-width: 600px) {

  h1, h2 {
    text-align: center;
  }

  .formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 90%;
    font-size: 16px;
  }

  button {
    width: 90%;
  }

  .tabla-contenedor {
    width: 100%;
  }

  table {
    min-width: 100%;
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
    align-items: center;
    text-align: center;
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

  .btn-eliminar {
    width: 100%;
  }
}
  </style>