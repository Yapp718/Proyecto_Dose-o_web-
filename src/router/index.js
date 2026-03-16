import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue';
import InventarioView from '@/views/InventarioView.vue';
import VentasView from '@/views/VentasView.vue';
import GastosView from '@/views/GastosView.vue';
import ReportesView from '@/views/ReportesView.vue';
import IniciosesionView from '@/views/IniciosesionView.vue';
import CalcularView from '@/views/CalcularView.vue';

const routes = [
  {
    path: '/', 
    name: 'login',
    component: IniciosesionView
  },
  {
    path: '/inicio',
    name: 'home',
    component: InicioView
  },
  {
    path: '/inventario', 
    name: 'inventario',
    component: InventarioView
  },
  {
    path: '/ventas', 
    name: 'ventas' ,
    component: VentasView
  },
  {
    path: '/gastos', 
    name: 'gastos',
    component: GastosView
  },
  {
    path: '/reportes', 
    name: 'reportes',
    component: ReportesView
  },
  {
    path: '/calcular',
    name: 'calular',
    component: CalcularView 
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
