<template>
  <div>
    <h3>新增班级</h3>
    <div>
      <label>班级名称</label>
      <input type="text" v-model="classname" />
    </div>
    <div>
      <label>主管老师</label>
      <select v-model="teacherId" @change="changeone($event)">
        <option v-for="item in rows" :key="item._id" :value="item._id">
          {{ item.teachername }}
        </option>
      </select>
    </div>

    <button @click="thisAddclass(classname, teacherId)">确认新增</button>
  </div>
</template>
<script>
import axios from "axios";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("classes");
export default {
  data() {
    return {
      classname: "",
      teacherId: "",
      rows: "",
    };
  },
  created() {
    this.getteacher();
  },
  computed: {},
  methods: {
    ...mapActions(["addClassAsync","getTeachersAsync"]),
    changeone(event) {
      this.teacherId = event.target.value; //获取option对应的value值
    },
    async thisAddclass(classname, teacherId) {
      const data = await this.addClassAsync({ classname, teacherId });

      if (data.success) {
        this.$router.push("/system/classlist");
      }
    },
    async getteacher() {
     const data = await this.getTeachersAsync()
      if (data) {
        // console.log("获取老师数据", data.data);
        this.rows = data.data.rows;
      }
    },
  },
};
</script>
