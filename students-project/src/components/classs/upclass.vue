<template>
  <div>
    <h3>修改班级</h3>
    <div>
      <label>修改班级</label>
      <input type="text" v-model="updata.classname" />
    </div>
    <div>
      <label>更换老师</label>
      <select v-model="updata.teacherId" @change="changeone($event)">
        <option v-for="item in trows" :key="item._id" :value="item._id">
          {{ item.teachername }}
        </option>
      </select>
    </div>

    <button @click="upSure({...updata})">确认修改</button>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("classes");
import axios from "axios";
export default {
  data() {
    return {
      updata: {
        classname: "",
        teacherId: "",
        _id: "",
      },
      trows: "",
    };
  },
  created() {
    const _id = this.$route.params._id;
    this.getoneclass(_id);
    this.getteacher();
  },
  computed: {},
  methods: {
    ...mapActions(["getoneclassAsync", "upSureAsync", "getTeachersAsync"]),
    changeone(event) {
      console.log(event.target.value)
      this.teacherId = event.target.value; //获取option对应的value值
    },
    async getoneclass(_id) {
      const data = await this.getoneclassAsync(_id);

      if (data) {
        this.updata = data.rows[0];
      }
    },
    async getteacher() {
      const data = await this.getTeachersAsync();
      if (data) {
        this.trows = data.data.rows;
        //console.log(this.trows);
      }
    },
    async upSure({...updata}){
        const data=await this.upSureAsync({...updata})
        if(data){
            this.$router.push('/system/classlist')
        }

    }
    
  },
};
</script>
