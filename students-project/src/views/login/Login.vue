<template>
<div>
    <h3>用户登录</h3>
    <input type="text" v-model="user.username" />
    <input type="text" v-model="user.password" />
    <input type="button" value="登录" @click="login" />
    <router-link to='/register'>没有账号，去注册？</router-link>
</div>
</template>

<script>
import axios from '../../http/axios.js'

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            const
                data = await this.$api.users.login(this.user)
            if (data.success) {
                alert('登录成功');
                localStorage.token = data.token;
                this.$router.push('/system')

            };
            console.log(data)
        },

    }
}
</script>
