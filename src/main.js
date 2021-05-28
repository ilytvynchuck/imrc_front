import Vue                              from 'vue';
import App                              from './App.vue';
import router                           from './router';
import {store}                          from './store';
import {initializeResponseInterceptors} from "@/api/utils/interceptors";
import './plugins/bootstrap-vue';
import './plugins/autocomplete';

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        initializeResponseInterceptors(this);
    }
}).$mount('#app');
