import {POST} from '../../types/types'
import {PayloadAction, createSlice} from "@reduxjs/toolkit"


type POSTS ={
posts:POST[],
post:null | POST
}

const initialState:POSTS ={
    posts:[],
    post:null
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        addPost:(state,action:PayloadAction<POST>)=>{
            state.posts!.unshift(action.payload)
        },
        getPosts:(state,action:PayloadAction<POST[]>)=>{
         state.posts = [...action.payload]
        },
        getOne:(state,action:PayloadAction<POST>)=>{
          state.post = {...action.payload}
        },
        edit:(state,action:PayloadAction<POST>)=>{
         const ind = state.posts?.findIndex(post=>post.id == action.payload.id)
        //  console.log(action.payload,ind,'act')
        //  const newArr =[...state.posts!]
        //  const obj = state.posts![ind!]
        //  const newObj = {...obj,body:action.payload.body,title:action.payload.title}
        //  newArr[ind!] = newObj
        //  state.posts = newArr
         state.posts![ind!] = {...state.posts![ind!],body:action.payload.body,title:action.payload.title}
        },
        deletePost:(state,action:PayloadAction<any>)=>{
            state.posts = state.posts!.filter(item=>item.id != action.payload)
        }
    }
})

export const {addPost,getPosts,getOne,edit,deletePost} = postSlice.actions
export default postSlice.reducer