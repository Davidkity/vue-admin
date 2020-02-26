<template>

    <div id="nav-wrap">
        <el-menu default-active="1-4-1" 
        class="el-menu-vertical-demo"
         @open="handleOpen" @close="handleClose"
          :collapse="isCollapse" 
          background-color="transparent" 
          text-color="#fff" 
          active-text-color="#fff"
          router>
            <!-- 使用 template 标签来分离 v-for 、v-if，但for中的 key index 不能写入到 template 标签上-->
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                <!-- 一级菜单 -->
                <template slot="title">
                    <!-- <i :class="item.meta.icon"></i> -->
                    <svg-icon :iconClass="item.meta.icon" className="item.meta.icon"/>
                    <span slot="title">{{ item.meta.name }}</span>
                </template>
                <!-- 子级菜单 -->
                <el-menu-item v-for="(subItem,index) in item.children" :key="subItem.id" :index="subItem.path">
                    <template>
                        <i :class="subItem.meta.icon" ></i>
                        <span>{{ subItem.meta.name }}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
    name: "navMenu",
    setup(props,{ root }){

        /*************************************************************************************
         *  声明数据
         */
        const isCollapse = ref(false);
        // 获取所有路由
        const routers = reactive(root.$router.options.routes);
        
        console.log(routers);

        /******************************************************************************
         * 声明函数
         */
        const handleOpen = (key, keyPath) => {

        };

        const handleClose = (key, keyPath) => {
            
        }
        return {
            isCollapse,
            routers,
            handleOpen,
            handleClose
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenuWidth;
    height: 100vh;
    background-color: #344a5f;
    
}
</style>