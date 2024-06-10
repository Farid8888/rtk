import { PayloadAction } from '@reduxjs/toolkit';
import { POST } from './../types/types';
import {getPosts,addPost,edit,getOne,deletePost} from './reducers/postSlice'
import {getStatus,validate} from './reducers/statusSlice'
import {call,put} from 'redux-saga/effects'



export function* fetchPosts(){
    yield put(getStatus({status:'SEND',message:'...pending'}))
    try{
        const response:{[key:string]:any} = yield call(()=>fetch('/api/posts'))
        if(!response.ok){
        const err:{[key:string]:any} = yield response.json()
        throw new Error(`${err.message.error}`)
        }
        const data:POST[] = yield response.json() 
        yield put(getStatus({status:'SUCCESS',message:'success'}))
        yield put(getPosts(data))
    }catch(e:any){
      if(e.message === 'Posts not fetched')  yield put((getStatus({status:'ERROR',message:e.message})))
      else  yield put((getStatus({status:'ERROR',message:'Something went wrong'})))
    }
 
}

export function* formHandler(action:PayloadAction<{post:POST,method:string,id?:any}>){
    const {id,method,post} = action.payload
    let url = method === 'POST' ? '/api/posts' : 'PATCH' && `/api/posts/${id}`
    yield put(getStatus({status:'SEND',message:'...pending'}))
       try{
          const response:Response = yield call(()=>fetch(url,{
            method:method,
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(post)
          }))
          yield put(getStatus({status:'SUCCESS',message:'success'}))
          if(response.ok){
            if(method === 'PATCH'){
              yield put(edit({id,...post}))
            }else if(method === 'POST'){
              const data:{posts:POST[]} = yield response.json() 
              yield put(addPost({...post,id:data.posts[0].id}))
            }
          }else{
            const err:{[key:string]:any} = yield response.json()
            if(response.status === 500){
             yield put(validate(err.errors))
            }else{
              if(method === 'PATCH') throw new Error ('Post not edited')
              else throw new Error('Post not added')
            }
          }
      
         
       }catch(e:any){
         if(e.message === 'Post not added')  yield put(getStatus({status:'ERROR',message:e.message}))
         else  yield put(getStatus({status:'ERROR',message:'Something went wrong'}))
       }
}

export function* fetchOne (action:PayloadAction<any>){
    yield put(getStatus({status:'SEND',message:'...pending'}))
        try{
         const response:Response = yield call(()=>fetch(`/api/posts/${action.payload}`))
         const data:POST = yield response.json()
         yield put(getStatus({status:'SUCCESS',message:'success'}))
         yield put(getOne(data))
        }catch(e:any){
         console.log(e)
        }
}


export function* removePost (action:PayloadAction<any>){
    try{
     const response:Response = yield call(()=>fetch(`/api/posts/${action.payload}`,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
     }))
     yield put(deletePost(action.payload))
     if(!response.ok){
      throw new Error('Post not deleted')
     }
    }catch(e){
        yield put((getStatus({status:'ERROR',message:'Something went wrong'})))
      console.log(e)
    }
}