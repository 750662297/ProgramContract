import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { apichange } from "../request/api/api_change";
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/index'},
    {path:'/login',name:'login', component:() => import('../login.vue')},
    
    {path:'/index',name:'index',component:() => import('../views/main/index.vue'),meta:{requireAuth:true},
        children:[
          {path:'/Home',name:'Home',component:()=> import('../views/main/Home.vue'),meta:{requireAuth:true}},
          
          {path:'/desktop',name:'desktop', component:()=>import('../views/main/desktop.vue'),meta:{requireAuth:true},
          
              children:[
                {path: '/company_information',name: 'company_information',component: () => import('../views/desktop/company_information.vue'),meta:{requireAuth:true},
                  children:[
                    {path:'/company_drawer',name:'company_drawer',component:()=>import('../views/drawer/company_drawer.vue'),meta:{requireAuth:true}}
                  ]
                },
                {path: '/HG',name: 'HG',component: () => import('../views/desktop/HG.vue'),meta:{requireAuth:true},
                  children:[
                    {path:'/HT_drawer',name:'HT_drawer',component:()=>import('../views/drawer/HT_drawer.vue'),meta:{requireAuth:true}}
                  ]
                },
                {path: '/XG',name: 'XG',component: () => import('../views/desktop/XG.vue'),meta:{requireAuth:true},
                  children:[
                    {path:'/program_drawer',name:'program_drawer',component:()=>import('../views/drawer/program_drawer.vue'),meta:{requireAuth:true}}
                  ]
                },
                {path: '',name: 'XG',component: () => import('../views/desktop/XG.vue'),meta:{requireAuth:true}},
              ]
          },
          {path:'',name:'Home',component:()=> import('../views/main/Home.vue'),meta:{requireAuth:true}},
        ]
    }, 
  ]
});
//注册全局钩子拦截导航
router.beforeEach((to,from,next) =>{
  //获取store里面的token

  

  let token=store.state.token;

  //判断要去的路由有没有requireAuth
  if(to.meta.requireAuth){
    if(token!='0'){
          apichange({token}).then(function(res){

                return res.code;
            }).catch(function(err){

                return err.code;
            })
        

            next();
    }
    else{
      alert("您未登录，即将跳转登录页面......");
      next({
        path:'/login',
        query:{redirect:to.fullPath}//将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  }
  else{

    next();//如果无需token,随意
  }

  
});
export default router;
