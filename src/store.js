import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: false,
    },
    getters: {  // 相当于computed
        // count: state => state.count + 10
    },
    mutations: {    // 同步函数 使用  root.$store.commit("SET_COUNT",100) 调用
        SET_COLLAPSE(state){
            state.isCollapse = !state.isCollapse;
            console.log(state.isCollapse);
        }
    },
    actions: {}
});
  