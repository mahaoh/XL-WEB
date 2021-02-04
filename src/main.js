import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
Vue.config.productionTip = false
import 'vant/lib/index.css';
import { Step, Steps ,Field, Cell, CellGroup,Picker,popup,Button } from 'vant';
import { Toast } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
Vue.use(Toast);
Vue.use(Button);
Vue.use(popup);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Step);
Vue.use(Steps);
new Vue({
  render: h => h(App),
}).$mount('#app')
