import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {POST} from '../../types/types'

 const postsApi = createApi({
    reducerPath:'postsApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/posts'}),
    endpoints:(build)=>({
        getAllPosts:build.query<POST,string>({
            query:()=>({
                url:'/',
                method:'GET'
            })
        })
    })
})

export const {useGetAllPostsQuery} = postsApi
export default postsApi