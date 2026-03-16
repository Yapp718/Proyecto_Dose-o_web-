<template lang="">
    <div>
        <h1>Calculadora de precio</h1>

        <label>Seleccionar producto</label>

        <select v-model="productoSeleccionado" @change="cargarPrecioBase">

            <option disabled value="">Seleccione producto</option>

            <option 
                v-for="p in store.productos"
                :key="p.nombre"
                :value="p"
                >

                {{p.nombre}}

            </option>

        </select>

        <br><br>

            <label>Precio base</label>
            <input type="number" v-model="precioBase" disabled>

        <br><br>

            <label>Costos adicionales</label>
            <input type="number" v-model="costos">

        <br><br>

            <label>Porcentaje de ganancia (%)</label>
            <input type="number" v-model="porcentaje">

        <br><br>

        <button @click="calcular">Calcular</button>

        <h2>Precio final: {{precioFinal}}</h2>

        <button @click="guardarPrecio">
        Agregar precio al inventario
        </button>
    </div>
</template>
<script>
import {store} from "../store"

export default{

    data(){
        return{

        store,
        productoSeleccionado:null,
        precioBase:0,
        costos:0,
        porcentaje:0,
        precioFinal:0

        }
    },

    methods:{

        cargarPrecioBase(){

        this.precioBase = this.productoSeleccionado.precioBase

        },

        calcular(){

        let costoTotal = Number(this.precioBase) + Number(this.costos)

        let ganancia = costoTotal * (this.porcentaje/100)

        this.precioFinal = costoTotal + ganancia

        },

        guardarPrecio(){

        this.productoSeleccionado.precioFinal = this.precioFinal

        this.store.guardar()

        alert("Precio actualizado en inventario")

        }

    }

}
</script>
<style lang="">
    
</style>