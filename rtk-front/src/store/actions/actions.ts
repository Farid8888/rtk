import { POST } from './../../types/types';
import { Dispatch } from '@reduxjs/toolkit'
import {getPosts,addPost,edit,getOne,deletePost} from '../reducers/postSlice'
import {getStatus,validate} from '../reducers/statusSlice'


export const fetchPosts = ()=>{
 return async (dispatch:Dispatch) =>{
    dispatch(getStatus({status:'SEND',message:'...pending'}))
    try{
        const response = await fetch('/api/posts')
        if(!response.ok){
        const err = await response.json()
        throw new Error(`${err.message.error}`)
    
        }
        const data = await response.json() as POST[] | []
        dispatch(getStatus({status:'SUCCESS',message:'success'}))
        dispatch(getPosts(data))
    }catch(e:any){
      if(e.message === 'Posts not fetched')  dispatch(getStatus({status:'ERROR',message:e.message}))
      else  dispatch(getStatus({status:'ERROR',message:'Something went wrong'}))
    }
 }
}

export const formHandler =(post:POST,method:string,id:any)=>{
    let url = method === 'POST' ? '/api/posts' : 'PATCH' && `/api/posts/${id}`
    return async (dispatch:Dispatch)=>{
       try{
           dispatch(getStatus({status:'',message:''}))
          const response = await fetch(url,{
            method:method,
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(post)
          })
          if(response.ok){
            if(method === 'PATCH'){
              dispatch(edit({id,...post}))
            }else if(method === 'POST'){
              const data = await response.json() as {posts:POST[]}
              dispatch(addPost({...post,id:data.posts[0].id}))
            }
          }else{
            const err = await response.json()
            if(response.status === 500){
             dispatch(validate(err.errors))
            }else{
              if(method === 'PATCH') throw new Error ('Post not edited')
              else throw new Error('Post not added')
            }
          }
      
         
       }catch(e:any){
         console.log(e)
         if(e.message === 'Post not added')  dispatch(getStatus({status:'ERROR',message:e.message}))
         else  dispatch(getStatus({status:'ERROR',message:'Something went wrong'}))
       }
    }
}

export const fetchOne = (id:string)=>{
    return async(dispatch:Dispatch)=>{
        try{
         const response = await fetch(`/api/posts/${id}`)
         const data = await response.json()
         dispatch(getOne(data))
        }catch(e:any){
         console.log(e)
        }
    }
}

// export const editFunc = (id:any,post:POST)=>{
//     return async(dispatch:Dispatch)=>{
//         try{
//           const response = await fetch(`api/edit${id}`,{
//             method:'PATCH',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify(post)
//           })
//           if(!response.ok){
//             throw new Error('not edited')
//           }
//          dispatch(edit(id))
//         }catch(e){
//             console.log(e)
//         }
//     }
// }

export const removePost =(id:any)=>{
  return async (dispatch:Dispatch)=>{
    try{
     const response = await fetch(`/api/posts/${id}`,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
     })
     dispatch(deletePost(id))
     if(!response.ok){
      throw new Error('Post not deleted')
     }
    }catch(e){
      console.log(e)
    }
  }
}