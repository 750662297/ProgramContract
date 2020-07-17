import {get,post,DELETE} from '../http.js'
// import axios from 'axios'
export const apiIndex =() => get('http://127.0.0.1:7001/api/HG');
// export const apicreate=p => get('http://127.0.0.1:7001/api/HG',p);
export const apishow = p=>get(`http://127.0.0.1:7001/api/HG/${p}`,{})
export const apisearch =p => post('http://127.0.0.1:7001/api/HG/search',p);
export const apiadd =p => post('http://127.0.0.1:7001/api/HG',p);
export const apiupdate = p=>post(`http://127.0.0.1:7001/api/HG/update_`,p);
export const apidelete = p=>DELETE(`http://127.0.0.1:7001/api/HG/${p}`,{});
export const home_contract = ()=>get('http://127.0.0.1:7001/api/HG/home_contract');
export const down_ = p=>post('http://127.0.0.1:7001/api/HG/download',p);
