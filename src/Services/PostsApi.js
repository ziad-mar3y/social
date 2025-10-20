import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";
const token = localStorage.getItem("token");

export async function getAllPostsApi(page = 1) {
  try {
    const { data } = await axios.get(baseUrl + "posts", {
      headers: {
        token: token,
      },
       params:{
            page,
            sort:"-createdAt"

        }
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}
export async function getPostDetailsApi(postId) {
  try {
    const { data } = await axios.get(baseUrl + "posts/" + postId, {
      headers: {
        token: token,
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
          token: token,
        },
       
      }
    );
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}
