import axios from 'axios';
import { message } from 'antd';
import { config } from '@/src/config';
import { store } from '@/src/models/store';

enum BluBiuResponseCode{
  SUCCESS = 1000, // 非异常请求
  QUERYERROR = 1001, // 请求参数错误
  APPIDNOUSE = 1002, // APPID错误或者AppID未启用
  LOGINERROR = 1003, // 登录账号或密码错误
  ACCOUNTEXIST= 1004, // 该账号已被注
  NOLOGIN = 1005, // 登录已过期
  NOTFOUNDACCOUNT = 1006 // 没有找到用户信息
}

export const http = axios.create({
  baseURL: `${config.apiHost}/api/desktop`,
  withCredentials: true,
});

http.interceptors.response.use(({ data, status }) => {
  if(status !== 200){
    message.error('网络异常');
    return data;
  }
  const res = data as BluBiuRes<any>;

  if(res.code === BluBiuResponseCode.NOLOGIN || res.code === BluBiuResponseCode.NOTFOUNDACCOUNT){
    store.dispatch.user.setLoading(false);
    message.error(res.message);
    throw Error(res.message);
  }

  if(res.code !== BluBiuResponseCode.SUCCESS){
    message.error(res.message);
    throw Error(res.message);
  }

  return res;
});

export const login = async(params: LoginRegsiterIn): BluBiuResponse<any> => await http.post('/login', params);

export const register = async(params: LoginRegsiterIn): BluBiuResponse<any> => await http.post('/register', params);

export const getUserInfo = async(): BluBiuResponse<UserInfo> => await http.get('/getUserInfo');