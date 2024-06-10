import {POST} from '../../types/types'
import {PayloadAction, createSlice} from "@reduxjs/toolkit"


type POSTS ={
posts:POST[] | null,
post:null | POST
}

const initialState:POSTS ={
    posts:null,
    post:null
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        addPost:(state,action:PayloadAction<POST>)=>{
            state.posts!.unshift(action.payload)
        },
        addPostSaga:(state,action:PayloadAction<{post:POST,method:string,id?:any}>)=>{},
        getPostsSaga:()=>{},
        getPosts:(state,action:PayloadAction<POST[]>)=>{
         state.posts = [...action.payload]
        },
        getOne:(state,action:PayloadAction<POST>)=>{
          state.post = {...action.payload}
        },
        getPostSaga:(state,action:PayloadAction<any>)=>{},
        edit:(state,action:PayloadAction<POST>)=>{
         const ind = state.posts?.findIndex(post=>post.id == action.payload.id)
         state.posts![ind!] = {...state.posts![ind!],body:action.payload.body,title:action.payload.title}
        },
        deletePost:(state,action:PayloadAction<any>)=>{
            state.posts = state.posts!.filter(item=>item.id != action.payload)
        },
        deletePostSaga:(state,action:PayloadAction<any>)=>{}
    }
})

export const {addPost,getPosts,getOne,edit,deletePost,getPostsSaga,getPostSaga,addPostSaga,deletePostSaga} = postSlice.actions
export default postSlice.reducer