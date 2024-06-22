import { POST } from "../types/types"



export const getPosts = ()=>fetch('/api/posts').then(res=>res.json())


export const postForm =({method,post,id}:{method:string,post:POST,id?:any})=>{
    let url = method === 'POST' ? '/api/posts' : 'PATCH' && `/api/posts/${id}`
return fetch(url,{
    method:method,
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(post)
}).then(res=>res.json())
}

export const deletePost =(id:any)=>{
    return fetch(`/api/posts/${id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'}
    })
}