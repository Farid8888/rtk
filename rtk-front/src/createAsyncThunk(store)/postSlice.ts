import {PayloadAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {POST} from '../types/types'
import {RootState} from './store'



// export const fetchPosts = createAsyncThunk<POST[] | POSTS | EDITPOST ,{id:string,method?:string,post?:POST}>(
//     'posts/fetch',
//     async(obj,{rejectWithValue})=>{
//         const addPostTools =()=>({
//             method:obj.method,
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify(obj.post)
//           })
//       const response = await fetch(`/api/posts/${obj.id}`,
//       obj.method === 'POST' || 'PATCH' ? addPostTools() : {method:'GET'}
//       )
//       const data = await response.json()
//       if(response.status<200 || response.status>=300){
//         return  rejectWithValue(data)
//       }
//       return data
//     },
// )

export const fetchPosts = createAsyncThunk<POST[],{id:string}>(
    'posts/fetch',
    async(obj,thunkApi)=>{
      
      const response = await fetch(`/api/posts/${obj.id}`)
      const data = await response.json()
      if(response.status<200 || response.status>=300){
        return thunkApi.rejectWithValue(data)
      }
     
      return data
    },
)

export const createPost = createAsyncThunk<POST,{id:string,post:POST}>(
    'posts/create',
    async(post,thunkApi)=>{
      const response = await fetch(`/api/posts/${post.id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(post.post)
      })
      const data = await response.json()
      if(response.status<200 || response.status>=300){
        return thunkApi.rejectWithValue(data)
      }
      thunkApi.dispatch(addPost({...post.post,id:data.posts[0].id})) 
      return data
    }
)

export const updatePost = createAsyncThunk<POST,{id:string,post:POST}>(
    'posts/update',
    async(post,thunkApi)=>{
      const response = await fetch(`/api/posts/${post.id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(post.post)
      })
      const data = await response.json()
      if(response.status<200 || response.status>=300){
        return  thunkApi.rejectWithValue(data)
      }
      thunkApi.dispatch(editPost({id:post.id,...post.post}))
      return data
    }
)



export const deletePost = createAsyncThunk<POST[],string>(
    'post/delete',
    async(id,thunkApi)=>{
        const response = await fetch(`/api/posts/${id}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        })
        const data = await response.json()
        if(response.status < 200 || response.status >=300 ){
            return thunkApi.rejectWithValue(data)
        }
        thunkApi.dispatch(removePost(id))
        return data
    }
)




type RequestState = 'pending' | 'fulfilled' | 'rejected'

export const postSlice = createSlice({
    name:'posts',
    initialState:{
        dataStatus:{} as Record<string, RequestState | undefined>,
        postsData :{} as Record<string,POST[]>,
        errorData :{} as Record<string,string | {}>
    },
    reducers:{
        addPost:(state,action:PayloadAction<POST>)=>{
         state.postsData[''].unshift(action.payload)
        },
        editPost:(state,action:PayloadAction<POST>)=>{
            const ind = state.postsData[''].findIndex(item=>item.id === action.payload.id)
          const arr = [...state.postsData['']]
          const obj = {...arr[ind],...action.payload}
          arr[ind] = obj
          state.postsData['']= arr
          state.postsData[action.payload.id] = {...state.postsData[action.payload.id],...action.payload}
        },
        removePost:(state,action:PayloadAction<string>)=>{
           state.postsData[''] = state.postsData[''].filter(item=>item.id !== action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.dataStatus[action.meta.arg.id] = 'pending'
        }),
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.postsData[action.meta.arg.id]  = action.payload 
            state.dataStatus[action.meta.arg.id] = 'fulfilled'
        }),
        builder.addCase(fetchPosts.rejected,(state,action)=>{
            state.dataStatus[action.meta.arg.id] = 'rejected'
            state.errorData['fetchErr'] = 'No posts fetched'
        }),
        builder.addCase(createPost.pending,(state,action)=>{
            state.errorData['post'] = false
            state.dataStatus[action.meta.arg.id] = 'pending'
        }),
        builder.addCase(createPost.fulfilled,(state,action)=>{
            state.dataStatus[action.meta.arg.id] = 'fulfilled'
        }),
        builder.addCase(createPost.rejected,(state,action)=>{
            state.dataStatus[action.meta.arg.id] = 'rejected'
            state.errorData['post'] = action.payload as {errors:{title:string,body:string}}
        }),
        builder.addCase(updatePost.pending,(state)=>{
            state.errorData['patch'] = false
            state.dataStatus['patch'] = 'pending'
        }),
        builder.addCase(updatePost.fulfilled,(state)=>{
            state.dataStatus['patch'] = 'fulfilled'
        }),
        builder.addCase(updatePost.rejected,(state,action)=>{
            state.dataStatus['patch'] = 'rejected'
            state.errorData['patch'] = action.payload as {errors:{title:string,body:string}}
        })
    }
})

export const getStatus = (state:RootState,id:string)=>{
    return state.posts.dataStatus[id]
}

export const getPosts =(state:RootState,name:string)=>{
    return state.posts.postsData[name]
}

export const errorPosts =(state:RootState)=>{
    return state.posts.errorData
}

export const {addPost,removePost,editPost} = postSlice.actions

