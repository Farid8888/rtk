import React from 'react'
import Layout from '../components/Layout/Layout'
import {Outlet} from 'react-router'
import {Context} from '../components/context/useContext'
import { ToastContainer, toast,Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../createAsyncThunk(store)/store'

const RootLayoutPage = () => {
  const status = React.useContext(Context)
  const errData = useAppSelector(state=>state.posts.errorData)
console.log(status)
  React.useEffect(()=>{
    if (status.isError) toast.error(`${errData ? 'Error decalred': status.error.message}`,{
      position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
    });

  },[status.error])
  return (
    <>
      <Layout/>
      <Outlet/>
      <ToastContainer />
    </>
  )
}

export default RootLayoutPage
