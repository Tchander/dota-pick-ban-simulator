import { RouteRecordRaw } from 'vue-router';

const _home = () => import('@/views/Home.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: _home,
  },
];

export default routes;
