<template>
<div>
    <h3>班级列表</h3>
    <table>
        <thead>
            <tr>
                <td>班级Id</td>
                <td>班级名称</td>
                <td>主管老师</td>
                <td>班级操作</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in pageData.rows">
                <td>{{item._id}}</td>
                <td>{{item.classname}}</td>
                <td>{{item.teacherId.teachername}}</td>

                <td>
                    <button @click="upclass(item._id)">修改班级</button>
                    <button @click="deleteclass(item._id)">删除班级</button>
                </td>
            </tr>
        </tbody>

    </table>
    <nation/>
</div>
</template>
<script>
import nation from './nation.vue'
import {
    createNamespacedHelpers
} from 'vuex';
const {
    mapActions,
    mapState,mapMutations,
} = createNamespacedHelpers('classes');
import axios from 'axios';

export default {
     components: {
        nation
    },
      data() {
        return {
           
        }
    },
    created() {
       this.getAsync()
       this.getclassByPageAsync()
    },
    computed: {
        ...mapState(['classdata','pageData']),
     
    },
    
    methods: {
        ...mapActions(['getAsync','dedeclassAsync','getclassByPageAsync']),
      upclass(_id){
          this.$router.push('/system/upclass/' + _id)
      },
       //删除班级
        async deleteclass(_id){   
           const data=await this.dedeclassAsync(_id)
           if(data){
               // alert("删除成功")
                this.$router.push('/system')
           }
        }

    },

}
</script>