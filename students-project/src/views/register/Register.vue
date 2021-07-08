<template>
<div>
    <h3>用户注册</h3>
    <input type="text" v-model="user.username" />
    <input type="text" v-model="user.password" />
    <input type="button" value="注册" @click="register" />
    <button @click="tologin">已有账号，去登录</button>
</div>
</template>

<script>
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

        async register() {
            const data = await this.$api.users.register(this.user);
            if (data.success) {
                alert('注册成功');
                this.$router.push('/login')
            }

        },

        tologin() {
            this.$router.push('/login')
        }
    },
}
</script>
