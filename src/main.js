import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
// 引用插件
import "lib-flexible/flexible"


const app = createApp(App)

// const bus = mitt();
// app.config.globalProperties.$bus = bus;
// app.config.globalProperties.$axios = axios
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')