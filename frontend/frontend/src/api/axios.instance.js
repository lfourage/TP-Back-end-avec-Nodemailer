import axios from "axios"
const axiosInstance =axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

axiosInstance.interceptors.response.use((res)=> res,
(err)=>{
    if(err.response?.status === 401){}
    return Promise.reject(err)
})

export default axiosInstance