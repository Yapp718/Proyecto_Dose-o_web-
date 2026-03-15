<template>

<div>

<h1>Ventas</h1>

<select v-model="producto">

<option disabled value="">Seleccione producto</option>

<option
v-for="p in store.productos"
:key="p.nombre"
:value="p.nombre"
>
{{p.nombre}}
</option>

</select>

<input v-model.number="cantidad" placeholder="Cantidad">
<input v-model.number="precio" placeholder="Precio">
<input type="date" v-model="fecha">

<button @click="registrarVenta">
Registrar Venta
</button>

<ul>

<li v-for="(v,index) in store.ventas" :key="index">

{{v.producto}} - {{v.total}} - {{v.fecha }}

</li>

</ul>

</div>

</template>

<script>

import { store } from "../store"

export default{

data(){

return{

producto:"",
cantidad:0,
precio:0,
fecha:"",
store

}

},

methods:{

registrarVenta(){

let total = this.cantidad * this.precio

this.store.ventas.push({

producto:this.producto,
cantidad:this.cantidad,
precio:this.precio,
total:total,
fecha:this.fecha || new Date().toISOString().split('T')[0]

})

let item = this.store.productos.find(
p => p.nombre === this.producto
)

if(item){

item.stock -= this.cantidad

}

this.store.guardar()

}

}

}

</script>