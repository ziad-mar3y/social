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
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoute from './ProtectedRoute/ProtectedAuthRoute'


const router = createBrowserRouter([
  {path:"" , element: <AuthLayout/>, children:[
    {path:"login" , element: <ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute> },
    {path:"register" , element: <ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute> },
  ]},

  {
    path: "" , element: <MainLayout/>, children: [
      {index:true , element: <ProtectedRoute> <FeedPage/> </ProtectedRoute> },
      {path: "post-details/:id" , element: <ProtectedRoute>  <PostDetailsPage/> </ProtectedRoute>},
      {path: "profile" , element:<ProtectedRoute> <ProfilePage/> </ProtectedRoute>},
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
