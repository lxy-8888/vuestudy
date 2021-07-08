import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/Login.vue'
import register from '../views/register/Register.vue'
import system from '../views/system/System.vue'
import studentslist from '../components/students/List.vue'
import addstudents from '../components/students/Add.vue'
import upstudent from '../components/students/up.vue'
import $api from '../http/api/api'
//解决：VUE项目Avoided redundant navigation to current location: “/XXX“.问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//
Vue.use(VueRouter)
//将路径和组件对应起来
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: register,
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/system',
    component: () => import('../views/system/System.vue'),
    beforeEnter: async (to, from, next) => {
      const data = await $api.users.isLogin();
      if (data.success) {
        next();
      } else {
        alert('你还未登录，请先登录');
        next('/login');
      }
    },
    children: [
      {
        path: 'studentslist',
        component: () => import('../components/students/List.vue')
      },
      {
        path: 'addstudents',
        component: () => import('../components/students/Add.vue')
      },
      {
        path: 'upstudent/:_id',
        component: () => import('../components/students/up.vue')
      },
      {
        path: 'upclass/:_id',
        component: () => import('../components/classs/upclass.vue')
      },
      {
        path: 'classlist',
        component: () => import('../components/classs/classlist.vue')
      },
      {
        path: 'addclass',
        component: () => import('../components/classs/addclass.vue')
      },
      {
        path: 'teacherlist',
        component: () => import('../components/teachers/teacherlist.vue')
      },
      {
        path: 'addteacher',
        component: () => import('../components/teachers/addteacher.vue')
      },
      {
        path: 'upteacher/:_id',
        component: () => import('../components/teachers/Up.vue')
      },
     

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
