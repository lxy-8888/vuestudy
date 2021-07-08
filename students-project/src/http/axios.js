import axios from "axios"
const instance =axios.create({
    baseURL:'http://localhost:3000',
    timeout: 500000000000000    //超时断开连接
});

//设置请求拦截器：给所有请求统一设置请求头 添加token
instance.interceptors.request.use(
    config => {
      const token  = localStorage.token;//获取本地存贮中的token
      config.headers.Authorization='Bearer '+ token;
      return config;
    },
    err =>  {
        return err;
    });
    
//设置响应拦截器
instance.interceptors.response.use(

    res => {
        return res.data;
      },
      err =>  {
         if(err.response.status === 401){
             return {
                 msg:'身份认证失败',
                 success:false
             }
         }
         return err;
      });

      
export default instance;