<template>

<div>

<h1>Dashboard</h1>

<h3>Capital actual: {{ capitalActual }}</h3>

<h3>Total ventas: {{ totalVentas }}</h3>

<h3>Total gastos: {{ totalGastos }}</h3>

<h3>Ganancia: {{ ganancia }}</h3>

</div>

</template>

<script>

import { store } from "../store"

export default{

name:"InicioVue",

data(){

return{

store,
capitalInicial: 5000000

}

},

computed:{

totalVentas(){

return this.store.ventas.reduce(
(total,v)=> total + v.total ,0
)

},

totalGastos(){

return this.store.gastos.reduce(
(total,g)=> total + Number(g.valor) ,0
)

},

ganancia(){

return this.totalVentas - this.totalGastos

},

capitalActual(){

return this.capitalInicial + this.ganancia

}

}

}

</script>