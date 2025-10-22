import { createContext, useState } from "react";
import { getAllPostsApi } from "../Services/PostsApi";

export const callBackContext = createContext();

export default function callBackContextProvider({ children }) {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const data = await getAllPostsApi();
    console.log(data);
    if (data.message == "success") {
      setPosts(data.posts);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <callBackContext.Provider value={{getAllPosts}}>
      {children}
    </callBackContext.Provider>
  );
}
