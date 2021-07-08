import axios from '../../axios.js'
const users={
      login: function(data){
          return  axios({
                url: '/users/login',
                method: 'post',
                data
            })
      },
      isLogin:()=>{
          return axios({
              url:'/users/islogin',
              method:'post'
          })
      },
      register:(data)=>{
        return axios({
             url:'/users/register',
             method:'post',
             data
        })

      },
     
}


export default users