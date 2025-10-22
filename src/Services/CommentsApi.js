import axios from "axios"
const baseUrl = "https://linked-posts.routemisr.com/"



export async function AddCommentApi(commentContent , postId) {

    try {
        const {data} = await axios.post(baseUrl + "comments", {
        content: commentContent,
        post: postId
    },{
        headers:{
            token: localStorage.getItem("token")
        }
    })
    return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }
    

}

export async function DeleteCommentApi(commentId) {
   try {
     const {data} = await axios.delete(baseUrl + "comments/" + commentId , {
        headers:{
            token: localStorage.getItem("token")
        }
    })
    return data 
   } catch (error) {
    return error.response ? error.response.data.error : error.message
   }
}

export async function UpdateCommentApi(commentId , newCommentContent) {
   try {
     const {data} = await axios.put(baseUrl + "comments/" + commentId ,{
        content:newCommentContent
     }, {
        headers:{
            token:localStorage.getItem("token")
        }
    })
    return data 
   } catch (error) {
    return error.response ? error.response.data.error : error.message
   }
}