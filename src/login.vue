<template>
   <div id="login" style="background-color:#bbe6d6; width:100%; height:100%;">
       <a-layout style="background-color:#bbe6d6;">
           <a-layout-content style="height:650px;">
               <div id="right" >
                    <li style="text-align:center; font-size:18px; list-style:none;">
                        登录
                    </li>
                    <a-input autocomplete="off" v-model="username" placeholder="user" id="username" style="width:230px; margin-left:50px; margin-top:30px;" >
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                    <a-input-password placeholder="password" v-model='password' type="password" id="password" style="width:230px; margin-left:50px; margin-top:30px;">
                        <a-icon slot="prefix" type="lock"/>
                    </a-input-password>
                    <a-input type="submit" @click="button()" style="width:230px; margin-left:50px; margin-top:30px; cursor:pointer; text-align:center;" value="登录">
                    </a-input>
                </div>
           </a-layout-content>
           <a-layout-footer>
               <!-- 这里是尾部栏 -->
           </a-layout-footer>
       </a-layout>
       
    </div>
</template>

 <script>
//  import { apilogin } from "../request/api"
import {apilogin} from "./request/api/api_user";


export default {
    name: 'login',
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{

        emitEmpty(){

        },
        async butt(){
            this.$store.dispatch('token_d');

        },
        async  button(){
            var username=this.username;
            var password=this.password;
            if(username == ''||password==''){
                this.$message.error('用户名或密码为空');
            }
            else{

                var b= await  apilogin({
                        username:username,
                        password:password    
                    }).then(res =>{
                        var a=res.code;
                        
                        this.$store.dispatch('token',res.token);
                        this.$store.dispatch('user_s',res.username);
                        this.$store.dispatch('department_s',res.department);
                        if(a==2){
                            this.$message.warning("密码错误,请重新输入");                     
                        }
                        if(a==0){
                            this.$message.warning("无此用户");       
                        }
                        return a;
                    }).catch(() =>{
                        var c='0';

                        return c;
                    }) 
      
                if(b=='1'){
                    this.$message.success('登录成功,即将跳转');
                    this.$router.push({path:'/index'});
                            
                    }
            }
             
        }


    },
    
}
</script>

<style scoped>

#right {
    width: 337px;
    height: 267px;
    background-color: white;
    float: right;
    margin-right: 300px;
    margin-top: 80px;
}

</style>