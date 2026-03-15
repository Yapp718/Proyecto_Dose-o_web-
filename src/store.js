import { reactive } from "vue"

export const store = reactive({

productos: JSON.parse(localStorage.getItem("productos")) || [],
ventas: JSON.parse(localStorage.getItem("ventas")) || [],
gastos: JSON.parse(localStorage.getItem("gastos")) || [],

guardar(){

localStorage.setItem("productos", JSON.stringify(this.productos))
localStorage.setItem("ventas", JSON.stringify(this.ventas))
localStorage.setItem("gastos", JSON.stringify(this.gastos))

}

})