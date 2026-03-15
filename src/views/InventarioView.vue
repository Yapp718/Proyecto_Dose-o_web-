<template>

<div>

<h1>Inventario</h1>

<input v-model="producto" placeholder="Producto">
<input v-model.number="stock" placeholder="Stock">
<input type="date" v-model="fecha">
<button @click="agregarProducto">Agregar</button>

<table border="1">

<tr>
<th>Producto</th>
<th>Stock</th>
<th>Fecha</th>
<th>Acción</th>
</tr>

<tr v-for="(p,index) in store.productos" :key="index">

<td>{{p.nombre}}</td>
<td>{{p.stock}}</td>
<td>{{ p.fecha }}</td>

<td>
<button @click="eliminarProducto(index)">
Eliminar
</button>
</td>

</tr>

</table>

</div>

</template>

<script>

import { store } from "../store"

export default{

data(){

return{

producto:"",
stock:0,
fecha:"",

store

}

},

methods:{

agregarProducto(){

if(this.producto && this.stock){

this.store.productos.push({
nombre:this.producto,
stock:this.stock,
fecha:this.fecha || new Date().toISOString().split('T')[0]
})

this.store.guardar()

this.producto=""
this.stock=0
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