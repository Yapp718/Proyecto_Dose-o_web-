<template>

<div>

<h1>Gastos</h1>

<input v-model="descripcion" placeholder="Descripción">
<input v-model.number="valor" placeholder="Valor">
<input type="date" v-model="fecha">

<button @click="agregarGasto">
Agregar
</button>

<ul>

<li v-for="(g,index) in store.gastos" :key="index">

{{g.descripcion}} - {{g.valor}} - {{g.fecha }}

</li>

</ul>

</div>

</template>

<script>

import { store } from "../store"

export default{

data(){

return{

descripcion:"",
valor:0,
fecha:"",
store

}

},

methods:{

agregarGasto(){

this.store.gastos.push({

descripcion:this.descripcion,
valor:this.valor,
fecha:this.fecha || new Date().toISOString().split('T')[0]

})

this.store.guardar()

this.descripcion=""
this.valor=0

}

}

}

</script>