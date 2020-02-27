import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // html5 本地存储
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
        // cookie 存储数据
        // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
        // count
    },
    getters: {  // 相当于computed
        // count: state => state.count + 10
    },
    mutations: {    // 同步函数 使用  root.$store.commit("SET_COUNT",100) 调用
        SET_COLLAPSE(state){
            state.isCollapse = !state.isCollapse;
            // html5本地存储
            sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse));
            //cookie存储
            // Cookie.set("isCollapse",JSON.stringify(state.isCollapse));
        }
    },
    actions: {
        // content 指向 state、getters、commit、rootGetters, data是传进来的数据
        setMenuStatus(content, data){
            content.commit("SET_COLLAPSE");
            console.log(3232);
        }
    }
});
  