<template>
    <div id="main-wrap">
        <!-- router-view 加载当前路由下的第一个子路由 -->
       <router-view /> 
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    position: fixed;
    left: $navMenuWidth;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    background-color: #fff;
    -webkit-box-sizing: border;
}
</style>