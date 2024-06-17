import React from 'react'
import Layout from '../components/Layout/Layout'
import {Outlet} from 'react-router'
import { ToastContainer, toast,Bounce } from "react-toastify";
import {useStore} from '../components/context/Context(mobX)'
import {observer} from 'mobx-react-lite'
import 'react-toastify/dist/ReactToastify.css';

const RootLayoutPage = observer(() => {
  const {post:{statusState}} = useStore()
  React.useEffect(()=>{
    if (statusState?.status === "ERROR") toast.error(`${statusState.message}`,{
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

  },[statusState?.status])
  return (
    <>
      <Layout/>
      <Outlet/>
      <ToastContainer />
    </>
  )
})

export default RootLayoutPage
