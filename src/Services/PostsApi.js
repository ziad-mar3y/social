import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export async function getAllPostsApi() {
try {
  const {data} = await axios.get(baseUrl +"posts",{
  headers:{
    token:localStorage.getItem("token")
  },
  params:{
    sort:"-createdAt"
  }
} )
return data
} catch (error) {
  return error.response ? error.response.data.error : error.message;
}

    

}
export async function getPostDetailsApi(postId) {
  try {
    const { data } = await axios.get(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token")
      },
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function addPostApi(formData) {
  try {
    const { data } = await axios.post(
      baseUrl + "posts",
     formData,
      {
        headers: {
          token: localStorage.getItem("token")
        },
       
      }
    );
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function deletePostApi(postId) {
  try {
     const {data} = await axios.delete(baseUrl + "posts/" + postId ,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  return data
  } catch (error) {
    return error.response ? error.response.data.error : error.message
  }
 
}


export async function getUserProfile(userId ) {
  // try {
  //   const {data} =await axios.get(baseUrl + "users/" + userId + "/posts",{
  //   headers:{
  //     token: localStorage.getItem("token")
  //   },
    
  // })
  // return data
  // } catch (error) {
  //   return error.response ? error.response.data.error : error.message
  // }


  return axios.get( baseUrl + "users/" + userId + "/posts",{
    headers:{
      token:localStorage.getItem("token")
    },
   
  })
    
}