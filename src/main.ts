import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/global.css';

const pinia = createPinia();
const app = createApp(App);

app.use(VueAxios, axios).use(router).use(pinia);

app.mount('#root');
