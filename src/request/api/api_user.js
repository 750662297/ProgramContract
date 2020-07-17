
import {post} from '../http'
export  const apilogin = p => post('http://127.0.0.1:7001/users',p);
export const update_other= p => post ('http://127.0.0.1:7001/users/update_other',p)
