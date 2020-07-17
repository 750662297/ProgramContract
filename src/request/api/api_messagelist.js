import {get,post,put,DELETE} from '../http.js'
export const messagelist_create =p=>post('http://127.0.0.1:7001/api/messagelist',p);
export const messagelist_showall =p => get(`http://127.0.0.1:7001/api/messagelist/${p}`,{});
export const messagelist_delete =p=> DELETE(`http://127.0.0.1:7001/api/messagelist/${p}`,{})