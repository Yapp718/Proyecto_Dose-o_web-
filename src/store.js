import { reactive } from "vue"

export const store = reactive({
capital: JSON.parse(localStorage.getItem("capital")) || 0,
productos: JSON.parse(localStorage.getItem("productos")) || [],
ventas: JSON.parse(localStorage.getItem("ventas")) || [],
gastos: JSON.parse(localStorage.getItem("gastos")) || [],
movimientosCapital: JSON.parse(localStorage.getItem("movimientosCapital")) || [],

guardar(){
localStorage.setItem("capital", JSON.stringify(this.capital))
localStorage.setItem("productos", JSON.stringify(this.productos))
localStorage.setItem("ventas", JSON.stringify(this.ventas))
localStorage.setItem("gastos", JSON.stringify(this.gastos))
localStorage.setItem("movimientosCapital", JSON.stringify(this.movimientosCapital))

}

})