<template>

    <div>

        <h1>Dashboard</h1>
        <h3>Capital actual: {{ store.capital }}</h3>
        <h3>Total ventas: {{ totalVentas }}</h3>
        <h3>Total gastos: {{ totalGastos }}</h3>
        <h3>Ganancia: {{ ganancia }}</h3>
        
        <input type="number" v-model.number="capitalMovimiento" 
        placeholder="Agregar o retirar capital">
        <button @click="agregarCapital">Agregar</button>
        <button @click="retirarCapital">Retirar</button>

        <h2>Movimientos de Capital</h2>

        <table border="1">

            <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Fecha</th>
            </tr>

            <tr v-for="(m,index) in store.movimientosCapital" :key="index">

                <td>{{ m.tipo }}</td>
                <td>{{ m.valor }}</td>
                <td>{{ m.fecha }}</td>

        </tr>

        </table>
    </div>

</template>

<script>

import { store } from "../store"

export default{

    name:"InicioVue",

        data(){

            return{

            store,
            capitalInicial: 0

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

        },
        methods:{

        agregarCapital(){
        if(this.capitalMovimiento > 0){

            this.store.capital += this.capitalMovimiento
            this.store.movimientosCapital.push({

            tipo:"Ingreso",
            valor:this.capitalMovimiento,
            fecha:new Date().toISOString().split('T')[0]

            })

            this.store.guardar()
            this.capitalMovimiento = 0

            }

            },

        retirarCapital(){

        if(this.capitalMovimiento > 0){

            this.store.capital -= this.capitalMovimiento

            this.store.movimientosCapital.push({

            tipo:"Retiro",
            valor:this.capitalMovimiento,
            fecha:new Date().toISOString().split('T')[0]

            })

            this.store.guardar()
            this.capitalMovimiento = 0

            }

            

        }

    }

}

</script>