<template lang="">
    <div>
<div class="calculadora">

  <h1>Calculadora de precio</h1>

  <div class="campo">
    <label>Producto</label>
    <select v-model="productoSeleccionado" @change="cargarPrecioBase">
      <option disabled value="">Seleccione producto</option>
      <option v-for="p in store.productos" :key="p.nombre" :value="p">
        {{p.nombre}}
      </option>
    </select>
  </div>

  <div class="campo">
    <label>Precio base</label>
    <input type="number" v-model="precioBase" disabled>
  </div>

  <div class="campo">
    <label>Costos adicionales</label>
    <input type="number" v-model="costos">
  </div>

  <div class="campo">
    <label>Ganancia (%)</label>
    <input type="number" v-model="porcentaje">
  </div>

  <button class="btn-calcular" @click="calcular">
    Calcular
  </button>

  <div class="resultado">
    <p>Precio final</p>
    <h2>${{precioFinal}}</h2>
  </div>

  <button class="btn-guardar" @click="guardarPrecio">
    Guardar en inventario
  </button>

</div>
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
<style scoped>
    
body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  font-family: 'Segoe UI', sans-serif;
}


.calculadora {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  border-radius: 20px;
  background: #0f172a;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6);
  color: white;
  text-align: center;
}

.calculadora h1 {
  margin-bottom: 20px;
  font-size: 22px;
}


.campo {
  text-align: left;
  margin-bottom: 15px;
}

.campo label {
  font-size: 13px;
  color: #94a3b8;
}

.campo input, .campo select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: #1e293b;
  color: white;
  transition: 0.3s;
}

/* EFECTO FOCUS */
.campo input:focus, .campo select:focus {
  background: #334155;
  box-shadow: 0 0 0 2px #3b82f6;
}


.btn-calcular {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  margin-top: 10px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-calcular:hover {
  transform: scale(1.05);
}


.resultado {
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  background: #020617;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
}

.resultado p {
  margin: 0;
  color: #64748b;
}

.resultado h2 {
  margin-top: 5px;
  color: #22c55e;
  font-size: 26px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}


.btn-guardar {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-guardar:hover {
  transform: scale(1.05);
}
</style>