import {useEffect} from 'react'
import {getPosts,getStatus,fetchPosts,errorPosts} from './postSlice'
import {useAppDispatch,useAppSelector} from './store'


export const useFetchPostsHook =(obj:{id:string})=>{
    const dispatch = useAppDispatch()
    const status = useAppSelector(state =>
      getStatus(state,obj.id)
    )
    const data = useAppSelector(state => getPosts(state,obj.id))
    const error = useAppSelector(state=>errorPosts(state))
    useEffect(() => {
      if (status === undefined ) {
        dispatch(fetchPosts(obj))
      }
    }, [status, dispatch,obj])
  
    const isUninitialized = status === undefined
    const isLoading = status === 'pending' || status === undefined
    const isError = status === 'rejected'
    const isSuccess = status === 'fulfilled'
  
    return { data, isUninitialized, isLoading, isError, isSuccess,error}
}



