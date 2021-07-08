//import $api from '../http/api/api'
import axios from "axios"

export default {
    namespaced: true,

    state: {
        teacherdata: {
        },
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
           //首页
           first(state){
            state.pageData.dangqianye=1;
      },
      //尾页
      last(state){
       state.pageData.dangqianye=state.pageData.totalpages;
   },
        getteacherByPage(state,pagedata){
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
        //保存仓库中的老师信息
        getw(state, teacherdata) {
            state.teacherdata = teacherdata;
           
        },



    },
    actions: {
          //分页获取数据
          async getteacherByPageAsync({state,commit}) {
            const{pagesize,dangqianye} = state.pageData;
            const data =await axios({
                url:'/teacher/getnateacher',
                method:'get',
                params:{pagesize,dangqianye}
            })
         //   console.log('状态机',data.data.data)
               if(data){
                 
                   commit('getteacherByPage',data.data.data);
               }

        },
        //获取所有老师
        async getAllteachersAsync({ commit }) {

            const data = await axios({
                url: '/teacher/getTeacher',
                method: 'get'
            });
            if (data) {
               //  console.log(data.data)
                commit('getw', data.data.rows)
            }
        },
        //新增老师
        async addTeacherAsync(context,{teachername,teacherage}){
            const data = await axios({
                url:'/teacher/addTeacher',
                method:'post',
                data:{teachername,teacherage}
              });
             
             return data
          },
        //通过id获取要修改的老师信息
        async getByidAsync(context,_id){
            const data =await axios({
                url:'/teacher/upgetTeacher',
                method:'get',
                params: {_id},
            });
           // console.log('zhuang',data)
            return data
        },
        //确认修改老师
        async yesupAsync(context,{...upteacherdata}){
            const data=await axios({
                url:'/teacher/upteacher',
                method:"post",
                data:{...upteacherdata}
            });
            return data
        },
        //删除老师
        async deleteoneAsync(context,_id){
            const data=await axios({
                url:'/teacher/deleteone',
                method:'post',
                data:{_id}
              });
              return data
        }
        
    },
    modules: {
    }


}