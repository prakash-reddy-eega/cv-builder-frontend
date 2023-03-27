import axios from 'axios'
import { addCommonHeader } from './cv'

const login=(data)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/login`,data)
}

const register=(data)=>{ 
    return axios.post(`${process.env.REACT_APP_API_URL}/register`,data)
}

const getProfile = () => {
    addCommonHeader()
    return axios.get(`${process.env.REACT_APP_API_URL}/profile`,)
}

const uploadProfile = (data, id) => {
    addCommonHeader()
    return axios.post(`${process.env.REACT_APP_API_URL}/upload-profile/${id}`,data)
}
const removeProfile = (data, id) => {
    addCommonHeader()
    return axios.post(`${process.env.REACT_APP_API_URL}/remove-profile/${id}`,data)
}
export {login,register, getProfile, uploadProfile, removeProfile}