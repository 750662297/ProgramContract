import { post,get,DELETE } from "../http";
export const getall= () =>get('http://127.0.0.1:7001/api/company');
export const search=p =>post(`http://127.0.0.1:7001/api/company/search`,p);
export const delete_i=p =>DELETE(`http://127.0.0.1:7001/api/company/${p}`,{});
export const update_ =p =>post('http://127.0.0.1:7001/api/company/update_',p);
export const com_search=p => post(`http://127.0.0.1:7001/api/company/com_search`,p);
export const com_add =p =>post('http://127.0.0.1:7001/api/company',p);