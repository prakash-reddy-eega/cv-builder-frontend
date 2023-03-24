import axios from 'axios'

const login=(data)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/login`,data)
}

const register=(data)=>{ 
    return axios.post(`${process.env.REACT_APP_API_URL}/register`,data)
}
export {login,register}