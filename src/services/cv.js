import axios from 'axios'
import { TOKEN } from '../utils/constants'

export const addCommonHeader = () => {
    const jwtToken = localStorage.getItem(TOKEN)
    const parsed = JSON.parse(jwtToken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
}


const saveCv = (data) => {
    addCommonHeader()
    return axios.post(`${process.env.REACT_APP_API_URL}cv/save-cv`,data)
}
const getCvs = () => {
    addCommonHeader()
    return axios.get(`${process.env.REACT_APP_API_URL}cv/cvs`)
}
const updateCv = (data, id) => {
    addCommonHeader()
    return axios.put(`${process.env.REACT_APP_API_URL}cv/edit-cv/${id}`,data)
}

const deleteCv = (id) => {
    addCommonHeader()
    return axios.delete(`${process.env.REACT_APP_API_URL}cv/delete/${id}`)
}

export {saveCv, getCvs, updateCv, deleteCv}