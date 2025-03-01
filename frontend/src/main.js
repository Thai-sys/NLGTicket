import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Đảm bảo đường dẫn đúng
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './style.css'; // Nếu có

const app = createApp(App);
app.use(router);
app.mount('#app'); // Mount sau khi use(router)
