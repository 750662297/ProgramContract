import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('userToken') ?localStorage.getItem('userToken'):'',
    username:localStorage.getItem('username') ?localStorage.getItem('username'):'',
    department:localStorage.getItem('department')?localStorage.getItem('department'):'',

    a:'',//全局变量
    form_variable:{},//合同添加表单提交变量
    disable:false,//用户操作权限变量

  },

  mutations: {
    disable_change(state){
      state.disable=true;
    },
    form_variable_s(state,a){
      state.form_variable=a;
      
    },
    form_variable_d(state){
      state.form_variable={};

    },
    a_s(state,a){
        state.a=a;


    },
    a_d(state){
      state.a='';
    },
    department_s(state,department){
      state.department=department;
      localStorage.setItem('department',department);
    },
    token_save(state,token){
      state.token=token;
      localStorage.setItem('userToken',token);
    },
    token_destory(state){

      // localStorage.removeItem('userToken');
      // localStorage.removeItem('username');
      state.username='0';
      state.token='0';
      state.department='0';
      localStorage.setItem('userToken','0');
      localStorage.setItem('username','0');
      localStorage.setItem('department','0');
    },
    user_s(state,username){
      state.username = username;
      localStorage.setItem('username',username);  
    },

  },
  actions: {
    disable_change(context){
      context.commit('disable_change');
    },
    token(context,n){
      context.commit('token_save',n);
    },
    token_d(context){
      context.commit('token_destory');
    },
    user_s(context,m){
      context.commit('user_s',m);
    },
    department_s(context,m){
      context.commit('department_s',m);
    },
    a_s(context,n){
      context.commit('a_s',n);
    },
    a_d(context){
      context.commit('a_d');
    },
    form_variable_s(context,n){
      context.commit('form_variable_s',n);
    },
    form_variable_d(context){
      context.commit('form_variable_d');
    }
  },
  
  modules: {

  }
})
