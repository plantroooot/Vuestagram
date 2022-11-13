import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt' //npm install mitt
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
//설치한 라이브러리를 모든 영역에서 사용 가능하게 해줌 - this.emitter

import store from './store.js'
//vuex설치

app.use(store).mount('#app')
