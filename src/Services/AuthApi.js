import axios from "axios"

const baseUrl = "https://linked-posts.routemisr.com/"
const token = localStorage.getItem("token");



export async function registerApi(formData) {
    try {
        const { data } = await axios.post(baseUrl + "users/signup" , formData)
        return data
    } catch (error) {
        return error.response.data
    }
}
export async function loginApi(formData) {
    try {
        const { data } = await axios.post(baseUrl + "users/signin" , formData)
        return data
    } catch (error) {
        return  error.response ?  error.response.data.error : error.message
    }
}

export async function getUserDataApi() {
    try {
        const {data} = await axios.get(baseUrl + "users/profile-data" ,{
            headers:{
                token: token 
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }
    
}