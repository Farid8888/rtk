import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { POST } from "../../types/types";

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: "/api/posts",
  })(args, api, extraOptions);
  const status = baseResult.meta?.response?.status;
  if (status === 500) {
  }

  return baseResult;
};

const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["post"],
  endpoints: (build) => ({
    getAllPosts: build.query<POST[], string>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getOnePost: build.query<POST, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags:['post']
    }),
    addPosts: build.mutation<POST, POST>({
      query: (posts) => ({
        url: "/",
        method: "POST",
        body: posts
      }),
      invalidatesTags:['post']
    }),
    deletePosts: build.mutation<POST, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['post']
    }),
    editPost:build.mutation<POST,{id:any,post:POST}>({
        query:({id,post})=>({
            url:`/${id}`,
            method:'PATCH',
            body:post
        }),
        invalidatesTags:['post']
    })
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useAddPostsMutation,
  useDeletePostsMutation,
  useEditPostMutation
} = postsApi;
export default postsApi;
