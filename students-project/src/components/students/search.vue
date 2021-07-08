<template>
    <div>
        <select v-model="searchData.type">
            <option value="name">姓名</option>
            <option value="age">年龄</option>
            <option value="gender">性别</option>
            <option value="classId">班级</option>
        </select>
        <input type="text" v-model="searchData.value"/>
        <button @click="search(searchData)">搜索</button>
    </div>
</template>
<script>
import axios from 'axios';
import {
    createNamespacedHelpers
} from 'vuex';
const {
    mapMutations,
    mapActions,
    mapState
} = createNamespacedHelpers('students');
export default {
    data(){
        return {
            searchData:{
                type:'name',
                value:'',
           }
        }
    },
    computed:{
        ...mapState(['pageData','seachData'])
    },
    methods: {
        ...mapMutations(['getsearch']),
        ...mapActions(['getStudentsByPageAsync']),
       search(searchData){
           this.getsearch(searchData)
       }
        
    },
     watch: {
     
        'seachData.value'() {
            this.getStudentsByPageAsync()
        },
       
       
    },
}
</script>