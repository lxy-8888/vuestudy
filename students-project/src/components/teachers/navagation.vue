<template>
<div>
<button @click="first">首页</button>
    <select v-model="pagesize">
        <option>3</option>
        <option>6</option>
        <option>9</option>
        <option>12</option>
    </select>
    <button @click="uppage">上一页</button>
    <button @click="nextpage">下一页</button>
    <button @click="last">尾页</button>
    <span> 共  {{pageData.totals}} 条/{{pageData.totalpages}}页</span>
</div>
</template>
<script>
import {
    createNamespacedHelpers
} from 'vuex';
const {
    mapActions,
    mapState,
    mapMutations
} = createNamespacedHelpers('teachers');
export default {
    computed: {
        ...mapState(['pageData']),
        pagesize: {
            get() {
                return this.pageData.pagesize
            },
            set(value) {
                this.changepageSize(value)

            }

        }
    },
    watch: {
        'pageData.pagesize'() {
            this.getteacherByPageAsync()
        },
        'pageData.dangqianye'() {
            this.getteacherByPageAsync()

        }
    },
    methods: {
        ...mapMutations(['changepageSize', 'nextpage', 'uppage','first','last']),
        ...mapActions(['getteacherByPageAsync'])
    }
}
</script>