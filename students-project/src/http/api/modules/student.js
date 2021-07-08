import axios from '../../axios.js'
const student={
   getStudentsByPage: params => {
    return  axios({
       url:'/students/getstudents',
       method:'get',
       params


     })

  }

}




export default student;