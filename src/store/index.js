import Vue           from "vue";
import Vuex          from "vuex";
import notifications from "./modules/notifications";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        notifications,
    }
});
