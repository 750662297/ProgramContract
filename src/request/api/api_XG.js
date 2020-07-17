
import {post,get,DELETE} from '../http'
export  const apiXG = p => post('http://127.0.0.1:7001/api/XG/search',p);
export  const apiXGSHOWALL= ()=> get(`http://127.0.0.1:7001/api/XG`);
export const apiXGadd =p =>post('http://127.0.0.1:7001/api/XG',p);
export const apiupdate_ = p=>post('http://127.0.0.1:7001/api/XG/update_',p);
export const apidelete = p=>DELETE(`http://127.0.0.1:7001/api/XG/${p}`,{})
export const apisearch = p=>get(`http://127.0.0.1:7001/api/XG/${p}`,{});
export const home_program = ()=>get('http://127.0.0.1:7001/api/XG/home_program');