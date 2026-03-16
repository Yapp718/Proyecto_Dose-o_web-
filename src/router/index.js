import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue';
import InventarioView from '@/views/InventarioView.vue';
import VentasView from '@/views/VentasView.vue';
import GastosView from '@/views/GastosView.vue';
import ReportesView from '@/views/ReportesView.vue';
import IniciosesionView from '@/views/IniciosesionView.vue';

const routes = [
  {
    path: '/',
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
    path: '/inicio de sesion', 
    name: 'inicio de sesion',
    component: IniciosesionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
