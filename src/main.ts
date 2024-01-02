import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';
import router from './utils/router';

import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-dark-teal/theme.css';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(pinia);
app.use(router);

app.mount('#app');
