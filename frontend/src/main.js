import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import './styles/styles.scss'
import 'element-plus/dist/index.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(far)
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch()

const app = createApp(App)

app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

app.mount('#app')
