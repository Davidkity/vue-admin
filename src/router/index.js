import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 引入布局组件
import Layout from "@/views/Layout/index.vue";

const routes = [
  /**
   * 主页
   */
  {
    path: "/",
    //component: Home
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  /**
   * 登录
   */
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  /**
   * 主控制台
   */
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "el-icon-menu"
    },
    component: Layout,
    children:[
      // 主控制台首页
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页",
          icon: "el-icon-s-platform"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "el-icon-s-management"
    },
    component: Layout,
    children:[
      // 信息列表
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表",
          icon: "el-icon-s-data"
        },
        component: () => import("../views/Info/index.vue")
      },
      // 信息分类
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类",
          icon: "el-icon-s-claim"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "el-icon-s-custom"
    },
    component: Layout,
    children:[
      // 用户列表
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表",
          icon: "el-icon-s-order"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
