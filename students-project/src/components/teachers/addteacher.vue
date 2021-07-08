<template>
<div>
    <h3>新增老师</h3>
    <div>
        <label>老师姓名</label>
        <input type="text" v-model="teachername"/>
    </div>
    <div>
        <label>老师年龄</label>
        <input type="text" v-model="teacherage"/>
    </div>
   
    <button @click="thisAddteacher(teachername,teacherage)">确认新增</button>
</div>
</template>
<script>
import axios from "axios";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("teachers");
export default {
  data() {
    return {
      teachername:'',
      teacherage:'',
    };
  },

  methods: {
    ...mapActions(["addTeacherAsync"]),
   
    async thisAddteacher(teachername, teacherage) {
        console.log(teachername,teacherage)
      const data = await this.addTeacherAsync({teachername, teacherage});
      // console.log(data)
      if (data) {
        this.$router.push("/system/teacherlist");
      }
    },
   
  },
};
</script>