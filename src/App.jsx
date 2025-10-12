import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Layouts/AuthLayout'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import MainLayout from './Layouts/MainLayout'
import FeedPage from './Pages/FeedPage/FeedPage'
import PostDetailsPage from './Pages/PostDetailsPage/PostDetailsPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'


const router = createBrowserRouter([
  {path:"" , element: <AuthLayout/>, children:[
    {path:"login" , element: <LoginPage/>},
    {path:"register" , element: <RegisterPage/>},
  ]},

  {
    path: "" , element: <MainLayout/>, children: [
      {index:true , element:<FeedPage/>},
      {path: "post-details" , element:<PostDetailsPage/>},
      {path: "profile" , element:<ProfilePage/>},
      {path: "*" , element:<NotFoundPage/>},
    ]
  }
  
])



function App() {


  return (
<>

<RouterProvider router={router}></RouterProvider>

</>
  )
}

export default App
