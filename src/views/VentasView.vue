<template>

    <div>

        <h1>Ventas</h1>

        <select v-model="productoSeleccionado" @change="cargarPrecio">

        <option disabled value="">Seleccione producto</option>

        <option
        v-for="p in store.productos"
        :key="p.nombre"
        :value="p"
        >
        {{p.nombre}}
        </option>

        </select>

        <input v-model.number="cantidad" placeholder="Cantidad">
        <input type="number" v-model="precio" disabled>
        

        <button @click="registrarVenta" :disabled="!precio">
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

            store,
            productoSeleccionado:"",
            cantidad:0,
            precio:0,
            fecha:""

        }

    },

    methods:{

            cargarPrecio(){
                console.log(this.productoSeleccionado)


                this.precio = this.productoSeleccionado.precioFinal

            },
            registrarVenta(){

                let item = this.store.productos.find(
                p => p.nombre === this.productoSeleccionado.nombre
                )

                if(!item){
                    alert("Producto no encontrado")
                    return
                }


                if(item.stock <= 0){
                    alert("Producto agotado")
                    return
                }

                if(this.cantidad <= 0){
                    alert("Ingrese una cantidad válida")
                    return
                }

                if(this.cantidad > item.stock){
                    alert("No hay suficiente stock")
                    return
                }


                let total = this.cantidad * this.precio

                this.store.ventas.push({

                producto:this.productoSeleccionado.nombre,
                cantidad:this.cantidad,
                precio:this.precio,
                total:total,
                fecha:this.fecha || new Date().toISOString().split('T')[0]

                })

                
                

                if(item){

                item.stock -= this.cantidad

                }

                this.store.guardar()

            }

    }

}

</script>