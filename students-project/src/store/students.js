//import $api from '../http/api/api'
import axios from "axios"
export default {
    namespaced:true,
    
    state: {
        pageData: {
            dangqianye: 1,
            pagesize: 3,
            totals: 0,
            totalpages: 0,
            rows: []
        },
        seachData:{
            type:'name',
            value:''
        }
       
    },
    getters:{
        
    },
    mutations: {
           //首页
           first(state){
            state.pageData.dangqianye=1;
      },
      //尾页
      last(state){
       state.pageData.dangqianye=state.pageData.totalpages;
   },
        getStudentsByPage(state,pagedata){
            state.pageData= pagedata
        },
        changepageSize(state,pagesize){
            state.pageData.pagesize=pagesize;
            
        },
        nextpage(state){
            state.pageData.dangqianye++;
        },
        uppage(state){
            state.pageData.dangqianye--;
        },
        //拿到组件的搜索条件
        getsearch(state,newdata){
            state.seachData=newdata;
        }
         
       
       
      
    },
    actions: {
        async getallclassAsync(){
            const data =await axios({
                url:'/class/getClass',
                method:'get',
            });
            return data
        },
        async getStudentsByPageAsync({state,commit}) {
            const{pagesize,dangqianye} = state.pageData;
            const{type,value} = state.seachData;
            const data =await axios({
                url:'/students/getstudents',
                method:'get',
                params:{pagesize,dangqianye,type,value}
            });
               if(data){ 
                   commit('getStudentsByPage',data.data.data);
               }

        },
        async addStudentsAsync(context,student){
            const {data} = await axios({
                url:'/students/addStudents',
                method:'post',
                data:{  ...student}
              });
             
             return data
          },
          async getoneAsync(context,_id) {
              
              const {data} = await axios({
                  url: '/students/upgetstudents/',
                  method: 'get',
                 params: {_id},
               
              });
             return data
    
          },
          async upYesAsync(context,updata) {
              const {data} = await axios({
                  url: '/students/upConfirm',
                  method: 'post',
                  data: {...updata},
              });
             return data
    
          },
          async dedeAsync(context,_id){
              const {data}=await axios({
                  url:'/students/deleteStudentsById',
                  method:'post',
                  data:{_id},
              });
              return data
          },
         
    },
    modules: {
    }
    

}