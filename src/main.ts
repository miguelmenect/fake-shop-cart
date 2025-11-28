// src/main.ts

import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 1. Importa a função do Pinia
import App from './App.vue';
import router from './router'; // 2. Importa a configuração do seu Router
import './assets/base.css';

// instância o Pinia
const pinia = createPinia();

// cria a instância principal do Vue, ou seja 
const app = createApp(App);

// 4. Diz ao Vue para usar o Pinia (Gerenciamento de Estado)
app.use(pinia);

// 5. Diz ao Vue para usar o Router (Navegação/Rotas)
app.use(router);

// Monta o aplicativo no elemento DOM com ID 'app'
app.mount('#app');