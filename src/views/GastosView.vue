<template>
<div class="gastos">

  <h1>Gastos</h1>

  <div class="form-gastos">
    <input v-model="producto" placeholder="Producto">
    <input v-if="producto" v-model.number="cantidad" placeholder="Cantidad">
    <input v-model="descripcion" placeholder="Descripción">
    <input v-model.number="valor" placeholder="Valor">
    <button class="btn-gasto" @click="agregarGasto">
      Agregar
    </button>
  </div>
  <div class="lista-gastos">
    <h2>Historial</h2>
    <ul>
      <li v-for="(g,index) in store.gastos" :key="index">
        <span class="producto">{{g.producto}}</span>
        <span class="cantidad">x{{g.cantidad}}</span>
        <span class="descripcion">{{g.descripcion}}</span>
        <span class="valor">-${{g.valor}}</span>
        <span class="fecha">{{g.fecha}}</span>
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

<style scoped>  

.gastos {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.form-gastos {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.form-gastos input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  font-size: 14px;
  transition: 0.3s;
}

.form-gastos input:focus {
  border-color: #ef4444;
  box-shadow: 0 0 8px rgba(239,68,68,0.3);
}

.btn-gasto {
  background: #ef4444;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-gasto:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(239,68,68,0.4);
}

.lista-gastos {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.lista-gastos ul {
  list-style: none;
  padding: 0;
}

.lista-gastos li {
  display: grid;
  grid-template-columns: 1.5fr 0.5fr 2fr 1fr 1fr;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
  transition: 0.2s;
}

.lista-gastos li:hover {
  background: #fef2f2;
}

/* TEXTO */
.producto {
  font-weight: bold;
}

.cantidad {
  color: #3b82f6;
}

.descripcion {
  color: #64748b;
}

.valor {
  color: #dc2626;
  font-weight: bold;
}

.fecha {
  color: #9ca3af;
}
</style>