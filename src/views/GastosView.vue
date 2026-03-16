<template>

    <div>

        <h1>Gastos</h1>

        <input v-model="producto" placeholder="Producto">
        <input v-if="producto" v-model.number="cantidad" placeholder="Cantidad">
        <input v-model="descripcion" placeholder="Descripción">
        <input v-model.number="valor" placeholder="Valor">
       

        <button @click="agregarGasto">
        Agregar
        </button>

        <ul>

            <li v-for="(g,index) in store.gastos" :key="index">

             {{g.producto}} - {{g.cantidad}} - {{g.descripcion}} - {{g.valor}} - {{g.fecha }}

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
        descripcion:"",
        valor:0,
        cantidad:0,
        fecha:"",
        store

        }

    },

    methods:{

        agregarGasto(){

        this.store.gastos.push({
            producto:this.producto,
            cantidad:this.cantidad,
            descripcion:this.descripcion,
            valor:this.valor,
            fecha:this.fecha || new Date().toISOString().split('T')[0]

        })
        
        this.store.capital -= this.valor

        this.store.guardar()

        this.producto=""
        this.cantidad=0
        this.descripcion=""
        this.valor=0

        }

    }

}

</script>