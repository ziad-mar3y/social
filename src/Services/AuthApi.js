import axios from "axios"

const baseUrl = "https://linked-posts.routemisr.com/"


export async function registerApi(formData) {
    // try {
        const { data } = await axios.post(baseUrl + "users/signup" , formData)
        return data
    // } catch (error) {
    //     return error.response.data.error
    // }
}