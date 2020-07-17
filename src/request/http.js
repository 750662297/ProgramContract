import axios from 'axios';
import QS from 'qs';

// import { getCookie } from "./util";

import store from "../store/index";
import router from '../router';

axios.defaults.timeout = 10000;//请求超时设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//请求头


//请求拦截器
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token 
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token=store.state.token;

    if(token){
        config.headers.Authorization=token;
    }
    

    return config;
},error => {
    return Promise.error(error);
});
//响应拦截器
axios.interceptors.response.use(response => {
    //如果返回状态码为200,说明接口请求成功，可以正常拿到数据
    //否则抛出错误
    if(response.status == 200){
        return Promise.resolve(response);
    }
    else{
        return Promise.reject(response);
    }
},error =>{
    if(error.response.status){
        switch(error.response.status){
            case 401:
                //跳转登录页面,并将要浏览的页面fullpath传过去，登录成功后跳转需要访问的页面
                // setTimeout(() =>{
                    router.replace({
                        path:'/login',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }
                    });
                // },1000);
                break;
            case 403:

                //清除token
                // localStorage.removeItem('userToken');
                // localStorage.removeItem('username');
                store.dispatch('token_d');
                //跳转登录页面,并将要浏览的页面fullpath传过去，登录成功后跳转需要访问的页面
                setTimeout(() =>{
                    router.replace({
                        path:'/login',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }
                    });
                },1000);
                break;
                //404请求不存在
            case 404:

                break;
                //其他错误，直接抛出错误提示
            default:
            }
            return Promise.reject(error.response);
        }
    })


    /** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
    export function get(url,params){
        return new Promise((resolve,reject) =>{
            axios.get(url,{
                params:params
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    }


    /** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
    export function post(url,params){
        return new Promise((resolve,reject) =>{
            axios.post(url,QS.stringify(params)).then(res =>{
                
                resolve(res.data);
            
            }).catch(err =>{
               
                reject(err.data);
            })
        });
    }
    export function put(url,params){
        return new Promise((resolve,reject) =>{
            axios.put(url,QS.stringify(params)).then(res =>{
                
                resolve(res.data);
            
            }).catch(err =>{
               
                reject(err.data);
            })
        });
    }
    export function DELETE(url,params){
        return new Promise((resolve,reject) =>{
            axios.delete(url,QS.stringify(params)).then(res =>{
                
                resolve(res.data);
            
            }).catch(err =>{
               
                reject(err.data);
            })
        });
    }