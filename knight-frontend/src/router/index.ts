import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '@/components/knight/Home.vue';
import EditComponent from '@/components/knight/Edit.vue';
import CreateComponent from '@/components/knight/Create.vue';
import KnightComponent from '@/components/knight/Knight.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'home' } },
  { path: '/home', name: 'home', component: HomeComponent },
  { path: '/create', name: 'Create', component: CreateComponent },
  { path: '/edit/:id', name: 'Edit', component: EditComponent },
  { path: '/knight/:id', name: 'Knight', component: KnightComponent }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
