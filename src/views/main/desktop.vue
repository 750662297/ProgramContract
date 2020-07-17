<template>
    <div class="desktop" style="background-color:whitesmoke; height:100%; " >
        <a-layout style="height:100%;">
            <a-layout-sider  style="background-color:white; height:100%;">
                <a-menu style="padding-top:10px; " :defaultSelectedKeys="['1']" mode="inline">
                    <a-menu-item key="1"><router-link to="/XG">{{menu_one_itone}}</router-link></a-menu-item>
                    <a-menu-item key="2"><router-link to="/HG">{{menu_one_ittwo}}</router-link></a-menu-item>
                    <a-menu-item key="3"><router-link to="/company_information">{{menu_one_itthree}}</router-link></a-menu-item>
                </a-menu>
            </a-layout-sider>

            <a-layout-content style="padding-left:25px; background-color:whitesmoke;">
                <router-view />
            </a-layout-content>
            
            <a-layout-sider  style="height:100%; background-color:#e4f5ef;">
                <div style="padding-left:50px; padding-top:20px;">
                    <a-button-group>
                        <a-dropdown :trigger="['click']">
                            <a-menu slot="overlay" @click="handmenu">
                                <a-menu-item key="5" @click="user_other()" :disabled="disable">新建用户</a-menu-item>
                                <a-menu-item key="6" @click="logout()">退出</a-menu-item>
                            </a-menu>
                            <a-button >{{rightsider}}</a-button>
                        </a-dropdown>
                    </a-button-group>
                    <a-modal
                        title="新建用户"
                        :visible="other_visible"
                        @ok="handleok"
                        @cancel="handlecancel"
                        okText="新建"
                        cancelText="取消"
                        :closable="false"
                    >
                        <a-form :form="form" @submit="hand" ref="form_other">
                          <a-form-item label="用户名" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                              <a-input   style="width:230px;" autocomplete="off" v-decorator="['username',{rules:[{required:true,message:'请输入用户名'}]}]"/>  
                          </a-form-item>
                          <a-form-item label="密码" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                              <a-input-password style="width:230px;" autocomplete="off" v-decorator="['password',{rules:[{required:true,message:'请输入密码'}]}]"/>  
                          </a-form-item>
                          <a-form-item label="所属用户" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                              <a-input   style="width:230px;" autocomplete="off" v-decorator="['users_op',{rules:[{required:true,message:'所属用户不可为空'}]}]"/>  
                          </a-form-item>
                          <a-form-item label="所属部门" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                              <a-select labelInValue v-decorator="['department',{rules:[{required:true}]}]" style="width:230px;">
                                <a-select-option value="1">软件系统部</a-select-option>
                                <a-select-option value="2">智能设备部</a-select-option>
                                <a-select-option value="3">项目运营部</a-select-option>
                              </a-select>
                          </a-form-item>
                        </a-form>
                    </a-modal>   
                </div>
            </a-layout-sider >
        </a-layout>
    </div>
            
</template>
<script>
import {mapActions } from "vuex";

import { update_other } from "../../request/api/api_user";
export default {

     data(){
        return{
          header:'导航栏',
          rightsider:this.$store.state.username,
          menu_one_itone:'项目信息',
          menu_one_ittwo:'合同信息',
          menu_one_itthree:'单位信息',
          other_visible:false,
          disable:this.$store.state.disable,
          form: this.$form.createForm(this),
        }
    },
    methods:{
      ...mapActions,
        handmenu(){
         
        },
        logout(){
            // //console.log('登出事件：');
            // localStorage.removeItem('userToken');
            this.$store.dispatch('token_d');
            // //console.log('登出username验证:'+this.$store.state.username);

            this.$router.push({path:'/login'});
        },
        user_other(){
          this.other_visible=true;
        },
        handleok(){
          var self=this;
          const form=self.$refs.form_other.form;
          form.validateFields(function(err,values){
            if(!err){
              values.department=values.department.label;
              delete values.comfirm_pwd;
              update_other(values).then(res=>{
                if(res=='1'){
                  self.$message.success('已新建该用户')
                  self.other_visible=false;
                  self.$refs.form_other.form.resetFields();
                }
              }).catch(()=>{

              })
            }
          })
        },
        handlecancel(){
          this.other_visible=false;
        },
    },
    mounted(){
      
    },

}
</script>
<style>
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>