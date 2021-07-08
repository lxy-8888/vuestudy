<template>
  <div>
    <h3>新增学生</h3>
    <div>
      <label>学生姓名</label>
      <input type="text" v-model="student.name" />
    </div>
    <div>
      <label>学生年龄</label>
      <input type="text" v-model="student.age" />
    </div>
    <div>
      <label>学生性别</label>
      <input type="radio" name="gender" value="男" v-model="student.gender" />男
      <input type="radio" name="gender" value="女" v-model="student.gender" />女
    </div>

    <div>
      <label>所属班级</label>
      <select v-model="student.classId">
        <option v-for="item in classrows" :key="item.classname" :value="item._id">
          {{ item.classname }}
        </option>
      </select>
    </div>
    <div>
      <input type="file" multple @change="getimgname($event)" />
    </div>
    <div id="imgwrap">
      <img :src="pathimg" />
    </div>
    <button @click="thisAddstudent(student)">新增</button>
  </div>
</template>
<style>
#imgwrap {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
}
#imgwrap img {
  width: 100%;
  height: 100%;
}
</style>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("students");
export default {
  data() {
    return {
      student: {
        name: "",
        age: "",
        gender: "",
        classId: "",
        imageName: "",
      },
      pathimg: "",
      classrows: "",
    };
  },
  created() {
    this.getallclass();
  },
  methods: {
    ...mapActions(["addStudentsAsync", "getallclassAsync"]),
    //上传图片并渲染到页面预览
    async getimgname($event) {
      // console.log($event.target.files[0].name);
      const node = $event.target;
      //通过node 节点获取图片信息
      const files = node.files;
      //创建表单对象
      const formData = new FormData();
      //将图片信息放入表单对象中
      for (let item of files) {
        formData.append("file", item);
      }
      //将图片上传到服务器
      const rrr = await axios({
        url: "http://localhost:3000/image/upload",
        method: "post",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
      });

      if (rrr.status == 200) {
        const pathname = rrr.data.filename;
        this.student.imageName =rrr.data.filename[0];
       // console.log('BAOCUN',rrr.data)
        this.pathimg = `./temp/${pathname}`;
      }
    },
    async thisAddstudent(student) {
      const data = await this.addStudentsAsync(student);

      if (data.success) {
        //console.log('学生新增成功')
        this.$router.push("/system");
      }
    },
    async getallclass() {
      const data = await this.getallclassAsync();
      if (data) {
        this.classrows = data.data.rows;
      }
    },
  },
  //   beforeRouteLeave(to, from, next) {
  //       if (this.name) {
  //           const isleave = confirm("未提交任何数据，是否离开？")
  //           if (isleave) {
  //               next()
  //           } else {
  //               next()
  //            }
  //       }
  //  },
};
</script>
<style>
#imgwrap {
  width: 100px;
  height: 100px;
  border: 1px solid orange;
}
</style>
