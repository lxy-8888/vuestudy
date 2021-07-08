import Vue from 'vue'
import Vuex from 'vuex'
import students from './students.js'
import teachers from './teachers.js'
import classes from './classes.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters:{

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    students,classes,teachers
  }
})
