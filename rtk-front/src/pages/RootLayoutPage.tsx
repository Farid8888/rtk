import React from 'react'
import Layout from '../components/Layout/Layout'
import {Outlet} from 'react-router'
import {useAppSelector} from '../redux-saga(store)/store'
import { ToastContainer, toast,Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RootLayoutPage = () => {
  const status = useAppSelector((state) => state.status.status);
  React.useEffect(()=>{
    if (status?.status === "ERROR") toast.error(`${status.message}`,{
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

  },[status?.status])
  return (
    <>
      <Layout/>
      <Outlet/>
      <ToastContainer />
    </>
  )
}

export default RootLayoutPage
