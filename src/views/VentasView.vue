<template>
<div class="ventas">

  <h1>Ventas</h1>
  <div class="form-ventas">

    <select v-model="productoSeleccionado" @change="cargarPrecio">
      <option disabled value="">Seleccione producto</option>
      <option
        v-for="p in store.productos"
        :key="p.nombre"
        :value="p">
        {{p.nombre}}
      </option>
    </select>

    <input v-model.number="cantidad" placeholder="Cantidad">
    <input type="number" v-model="precio" disabled>
    <button 
      class="btn-venta"
      @click="registrarVenta" 
      :disabled="!precio">
      Registrar Venta
    </button>

  </div>
  <div class="lista-ventas">
    <h2>Historial</h2>
    <ul>
      <li v-for="(v,index) in store.ventas" :key="index">
        <span class="producto">{{v.producto}}</span>
        <span class="cantidad">{{v.cantidad}}</span>
        <span class="total">${{v.total}}</span>
        <span class="fecha">{{v.fecha}}</span>
      </li>
    </ul>
  </div>

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

<style scoped>
.ventas {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.form-ventas {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.form-ventas select, .form-ventas input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  font-size: 14px;
  transition: 0.3s;
}

.form-ventas select:focus, .form-ventas input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34,197,94,0.3);
}

.form-ventas input:disabled {
  background: #f1f5f9;
  color: #64748b;
}

.btn-venta {
  background: #22c55e;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-venta:hover {
  background: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34,197,94,0.4);
}

.btn-venta:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.lista-ventas {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.lista-ventas ul {
  list-style: none;
  padding: 0;
}

.lista-ventas li {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  transition: 0.2s;
}

.lista-ventas li:hover {
  background: #f0fdf4;
}


.producto {
  font-weight: bold;
}

.cantidad {
  color: #006aff;
}

.total {
  color: #22c55e;
  font-weight: bold;
}

.fecha {
  color: #64748b;
}
</style>


