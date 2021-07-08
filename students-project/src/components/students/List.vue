<template>
  <div>
    <h3>学生列表</h3>
    <search />
    <table>
      <thead>
        <tr>
          <td>学生编号</td>
          <td>学生姓名</td>
          <td>学生年龄</td>
          <td>学生性别</td>
          <td>所属班级</td>
          <td>班主任老师</td>
          <td>学生头像</td>
          <td>学生操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageData.rows">
          <td>{{ item._id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.classId.classname }}</td>
          <td>{{ item.classId.teacherId.teachername }}</td>
          <td> 
                                        <img width='50px' :src="`./images/${item.imageName}`"/>
                                    </td>
          <td>
            <button @click="upone(item._id)">修改</button>
            <button @click="dede(item._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagenation />
  </div>
</template>

<script>
import search from "./search.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("students");
import axios from "axios";
import pagenation from "./pagenation.vue";
export default {
  components: {
    pagenation,
    search,
  },
  data() {
    return {
        imgpath:"./images/",
      searchData: {
        type: "name",
        value: "",
      },
    };
  },
  created() {
    this.getStudentsByPageAsync();
    
    
  },
  computed: {
    ...mapState(["pageData"]),
     
    
  },
  methods: {
    ...mapActions(["getStudentsByPageAsync", "dedeAsync"]),
    
    upone(_id) {
      this.$router.push("/system/upstudent/" + _id);
    },
    async dede(_id) {
      const data = await this.dedeAsync(_id);
      if (data.success) {
        alert("删除成功");
        this.$router.push("/system");
      }
    },
  },
};
</script>
