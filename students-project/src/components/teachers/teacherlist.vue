<template>
  <div>
    <h3>老师列表</h3>
    <table>
      <thead>
        <tr>
          <td>老师姓名</td>
          <td>老师年龄</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageData.rows" :key="item._id">
        <td>{{ item._id }}</td>
          <td>{{ item.teachername }}</td>
          <td>{{ item.teacherage }}</td>
          <td>
            <button @click="uppush(item._id)">修改</button>
            <button @click="deleteone(item._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <navagation />
  </div>
</template>
<script>
import navagation from './navagation.vue'
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("teachers");
import axios from "axios";
export default {
  components:{
    navagation
  },
  data() {
    return {};
  },
  created() {
    this.getAllteachersAsync();
    this.getteacherByPageAsync();
   
  },
  computed: {
    ...mapState(["teacherdata","pageData"]),
  },

  methods: {
    ...mapActions(["getAllteachersAsync", "addTeacherAsync","deleteoneAsync","getteacherByPageAsync"]),
    uppush(_id) {
      this.$router.push('/system/upteacher/' + _id);
    },
    async deleteone(_id){
     const data=await this.deleteoneAsync(_id)
     if(data){
           this.$router.push('/system')
     }
    }
  },
};
</script>
