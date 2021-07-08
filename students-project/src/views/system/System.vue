<template>
<div id="container">
    <header></header>
    <main>
        <aside>
            <dl>
                <dt>学生管理</dt>
                <router-link to="/system/studentslist">
                    <dd>学生列表</dd>
                </router-link>
                <router-link to="/system/addstudents">
                    <dd>新增学生</dd>
                </router-link>

            </dl>
            <dl>
                <dt>班级管理</dt>
                <router-link to="/system/classlist">
                    <dd>班级列表</dd>
               </router-link>
               <router-link to="/system/addclass">
                     <dd>新增班级</dd>
                </router-link>
            </dl>
            <dl>
                <dt>教师管理</dt>
                <router-link to="/system/teacherlist">
                     <dd>老师列表</dd>
                </router-link>
                <router-link to="/system/addteacher">
                     <dd>新增老师</dd>
                </router-link>
            </dl>
        </aside>
        <article>
            <router-view></router-view>
        </article>
    </main>
    <footer></footer>
</div>
</template>

<style scoped>
header,
footer {
    height: 80px;
    background-color: #ccc
}

main {
    background-color: #eee;
    flex-grow: 1;
    display: flex;
}

aside {
    background-color: #bbb;
    width: 200px;

}

#container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
