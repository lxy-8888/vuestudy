<template>
<div>
    <h3>修改学生</h3>
    <div>
        <label>学生姓名：</label>
        <input type="text" id="xsname" v-model="updata.name" />
    </div>
    <div>
        <label>学生年龄：</label>
        <input type="text" id="xsage" v-model="updata.age" />
    </div>
    <div>
        <label>学生性别：</label>
        <input type="radio" name="xsgender" value="男" v-model="updata.gender" />男
        <input type="radio" name="xsgender" value="女" v-model="updata.gender" />女
    </div>
    <button @click="upYes(updata)">确认修改</button>

</div>
</template>

<script>
import {
    createNamespacedHelpers
} from 'vuex';
const {
    mapActions
} = createNamespacedHelpers('students');
import axios from 'axios'
export default {
    data() {
        return {
            updata: {
                name: '',
                age: '',
                gender: ''
            }
        }
    },
    created() {
        const _id = this.$route.params._id
        this.getone(_id)
    },
    methods: {
        ...mapActions(['getoneAsync', 'upYesAsync']),
        async getone(_id) {
            const data = await this.getoneAsync(_id);
            
            if (data.success) {
                this.updata = data.rows[0]
            }

        },
        async upYes(updata) {
            const data = await this.upYesAsync(this.updata);
            if (data.success) {
                alert("修改成功");
                this.$router.push('/system/studentslist')
            }
        },

    },
}
</script>
