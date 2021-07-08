<template>
<div>
<button @click="first">首页</button>
    <select v-model="pagesize">
        <option>2</option>
        <option>3</option>
        <option>5</option>
        <option>6</option>
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
} = createNamespacedHelpers('students');
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
            this.getStudentsByPageAsync()
        },
        'pageData.dangqianye'() {
            this.getStudentsByPageAsync()

        }
    },
    methods: {
        ...mapMutations(['changepageSize', 'nextpage', 'uppage','first','last']),
        ...mapActions(['getStudentsByPageAsync'])
    }
}
</script>
