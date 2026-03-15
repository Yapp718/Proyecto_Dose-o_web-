<template lang="">
    <div>
        <h1>Reportes</h1>
        <h2>Resumen financiero</h2>

        <p><strong>Total de ventas del mes:</strong> {{ totalVentas }}</p>
        <p><strong>Total de gastos:</strong> {{ totalGastos }}</p>
        <p><strong>Ganancias:</strong> {{ ganancias }}</p>
        

        <h2>Reporte de Ventas</h2>

        <table border="1">

        <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Total</th>
        <th>Fecha</th>
        </tr>

        <tr v-for="(v,index) in store.ventas" :key="index">
        <td>{{v.producto}}</td>
        <td>{{v.cantidad}}</td>
        <td>{{v.total}}</td>
        <td>{{v.fecha}}</td>
        </tr>

        </table>


        <h2>Reporte de Gastos</h2>

        <table border="1">

        <tr>
        <th>Descripción</th>
        <th>Valor</th>
        <th>Fecha</th>
        </tr>

        <tr v-for="(g,index) in store.gastos" :key="index">
        <td>{{g.descripcion}}</td>
        <td>{{g.valor}}</td>
        <td>{{g.fecha}}</td>
        </tr>

        </table>

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
<style lang="">
    
</style>