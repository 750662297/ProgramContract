import { get } from "../http";
export const apichange = p => get('http://127.0.0.1:7001/change',p);