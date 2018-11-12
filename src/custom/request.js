import axios from 'axios'
import qs from 'qs'
import c from '@/custom'


const request = axios.create({
    baseURL: 'http://localhost/sale/',
    // baseURL:'/dist/saleApi/',
    timeout: 2000,
    // headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

request.interceptors.request.use(config => {
    if (config.method == 'post')
        config.data = qs.stringify(config.data)
    return config
},/*  */
    error => {
        c(error)
    })

// request.interceptors.response.use(response=>{
//     response.data=JSON.parse(response.data)
//     return response.data
// },error=>{
//     c(error)
//     return Promise.reject(error)
// })
export default request