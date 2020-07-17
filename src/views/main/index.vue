<template>
<div class="container">
        <a-layout class="layout">
            <a-layout-header>
                <div class="logo">
                    <!-- 公司logo加全称 -->
                </div>
                <a-menu
                    theme="dark"
                    mode="horizontal"
                    :defaultSelectedKeys="defaultKeys"
                    :style="{lineHeight:'64px'}"
                >
                    <a-menu-item key="1"><router-link to="/Home"><a-icon type="home" style="margin:0 auto;"/></router-link></a-menu-item>
                    <a-menu-item key="2"><router-link to="/desktop"><a-icon type="desktop" style="margin:0 auto;"/></router-link></a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout-content style="height:700px;">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align:center;">
                <!-- 尾部栏 -->
            </a-layout-footer>
        </a-layout>
    </div>
  
</template>

<script>

export default {

    data(){
        return{
            defaultKeys:['1']
        }
    },
    methods:{

    },
    watch:{
    },
    mounted(){

        if(this.$store.state.department!='项目运营部'){
            // //console.log('222222222')
            this.$store.dispatch('disable_change');
            // //console.log(this.$store.state.disable)
        }
    },
   

}
</script>

<style>
  .container .logo {
        margin: 16px, 24px, 16px, 0;
        margin-top: 16px;
        width: 120px;
        height: 31px;
        background: rgba(255,255,255,0.2); 
        float: left;
    }
</style>