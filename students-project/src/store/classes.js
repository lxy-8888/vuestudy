//import $api from '../http/api/api'
import axios from "axios"

export default {
    namespaced: true,

    state: {
        classdata: {},
        pageData: {
            dangqianye: 1,
            pagesize: 3,
            totals: 0,
            totalpages: 0,
            rows: []
        },
    },
    getters: {

    },
    mutations: {
        getclassByPage(state,pagedata){
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
        //首页
        first(state){
             state.pageData.dangqianye=1;
       },
       //尾页
       last(state){
        state.pageData.dangqianye=state.pageData.totalpages;
    },
        //保存仓库中的班级信息
        getall(state, classdata) {
            state.classdata = classdata;
            //  console.log(state.classdata)
        },
       



    },
    actions: {
        //分页获取数据
        async getclassByPageAsync({state,commit}) {
            const{pagesize,dangqianye} = state.pageData;
            const data =await axios({
                url:'/class/getnaclass',
                method:'get',
                params:{pagesize,dangqianye}
            })
           // console.log('状态机',data.data.data)
               if(data){
                 
                   commit('getclassByPage',data.data.data);
               }

        },
        //获取所有班级
        async getAsync({ commit }) {

            const data = await axios({
                url: '/class/getClass',
                method: 'get'
            });
            if (data) {
                // console.log(data.data.rows)
                commit('getall', data.data.rows)
            }
        },
        //新增班级
        async addClassAsync(context,{classname,teacherId}){
            const {data} = await axios({
                url:'/class/addClass',
                method:'post',
                data:{classname,teacherId}
              });
             
             return data
          },
        //通过id获取要修改的班级信息
        async getoneclassAsync(context,_id){
            const {data} = await axios({
                url: '/class/upgetoneclass/',
                method: 'get',
                params: {_id},
             
            });
           return data
        },
        //获取所有老师
        async getTeachersAsync(){
            const data =await axios({
                url:'/teacher/getTeacher',
                method:'get'
            });
            return data
        },
        //确认修改班级的请求
        async upSureAsync(commit,{...updata}){
            const data=await axios({
                url:'class/upClass',
                method:'post',
                data:{...updata}
            });
           return data
        },
        //根据ID删除班级
        async dedeclassAsync(context,_id){
            const data=await axios({
                url:'/class/deleteClass',
                method:'post',
                data:{_id}
            });
            return data
        }
      
        
    },
    modules: {
    }


}