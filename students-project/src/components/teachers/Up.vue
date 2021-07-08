<template>
  <div>
    <h3>修改教师</h3>
    <div>
      <label>修改姓名</label>
      <input type="text"  v-model="upteacherdata.teachername"/>
    </div>
    <div>
      <label>修改年龄</label>
      <input type="text" v-model="upteacherdata.teacherage"/>
    </div>

    <button @click="yesup({...upteacherdata})">确认修改</button>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("teachers");
import axios from "axios";
export default {
  data() {
    return {
      upteacherdata: {
        teachername: "",
        teacherage: "",
        _id:''
           },
     
    }
  },
  created() {
    const _id = this.$route.params._id;
    this.getByid(_id);
   
  },
  computed: {},
  methods: {
    ...mapActions(["getByidAsync","yesupAsync"]),
    
    async getByid(_id) {
      const data = await this.getByidAsync(_id);
     
      if (data) {
        this.upteacherdata= data.data.rows[0];
      }
    },
    async yesup({...upteacherdata}){
       const data=await this.yesupAsync({...upteacherdata})
        if(data){
            this.$router.push('/system/teacherlist')
        }
    }
    
   
    
  },
};
</script>
