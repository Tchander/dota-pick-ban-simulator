import { RouteRecordRaw } from 'vue-router';

const _home = () => import('@/views/Home.vue');
const _socketTest = () => import('@/views/SocketTest.vue');
console.log(_socketTest);

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: _home,
  },
  {
    path: '/sockets',
    name: 'Sockets',
    component: _socketTest,
  },
];

export default routes;
