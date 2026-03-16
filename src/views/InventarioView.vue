<template>

    <div>

        <h1>Inventario</h1>

        <input v-model="producto" placeholder="Producto">
        <input v-model.number="stock" placeholder="Stock">
        <input type="number" v-model="precioBase" placeholder="Precio base">

        <button @click="agregarProducto">Agregar</button>

        <table border="1">

            <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio Base</th>
            <th>Precio Venta</th>
            <th>Fecha</th>
            <th>Acción</th>
            </tr>

            <tr v-for="(p,index) in store.productos" :key="index">

            <td>{{p.nombre}}</td>
            <td>{{p.stock}}</td>
            <td>{{p.precioBase}}</td>
            <td>{{p.precioFinal}}</td>
            <td>{{ p.fecha }}</td>

            <td>
            <button @click="eliminarProducto(index)">
            Eliminar
            </button>
            </td>

            </tr>

        </table>
        <h2>Inventario Gastos</h2>

        <table border="1">

            <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Precio Base</th>
                <th>Fecha</th>
            </tr>

            <tr v-for="(p,index) in inventarioGeneral" :key="index">

                <td>{{p.nombre}}</td>
                <td>{{p.stock}}</td>
                <td>{{p.precioBase}}</td>
                <td>{{p.fecha}}</td>

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