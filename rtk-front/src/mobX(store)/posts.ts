import { makeAutoObservable, runInAction } from "mobx";
import { POST,VAL,STATUS } from '../types/types';

class PostStore {
  posts: POST[] = [];
  post: POST = {};
  statusState:STATUS= {status:'',message:''}
  validation:VAL={
    title:'',
    body:''
} 

  constructor() {
    makeAutoObservable(this);
  }

//   addPost(post: POST) {
//     runInAction(() => {
//       this.posts.unshift(post);
//     });
//   }

formHandler=async(post:POST,method:string,id?:any)=>{
    let url = method === 'POST' ? '/api/posts' : 'PATCH' && `/api/posts/${id}`
    this.statusState! = {status:'SEND',message:'pending'} as STATUS 
       try{
          const response = await fetch(url,{
            method:method,
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(post)
          })
          if(response.ok){
            if(method === 'PATCH'){
                runInAction(()=>{
                    const ind = this.posts.findIndex(post=>post.id === id)
                    const newArr = [...this.posts]
                    const newObj = {...newArr[ind],...post}
                    newArr[ind] = newObj
                    this.posts = newArr
                })
            }else if(method === 'POST'){
              const data = await response.json() as {posts:POST[]}
              runInAction(()=>{
                this.posts.unshift({...post,id:data.posts[0].id})
              })
            }
          }else{
            const err = await response.json()
            if(response.status === 500){
                runInAction(()=>{
                    this.validation= {...err.errors}
                })
            }else{
              if(method === 'PATCH') throw new Error ('Post not edited')
              else throw new Error('Post not added')
            }
          }
      
         
       }catch(e:any){
        runInAction(()=>{
            if(e.message === 'Post not added')  this.statusState = {status:'ERROR',message:e.message}
            else  this.statusState = {status:'ERROR',message:'Something went wrong'}
        })
       }
    
}
clearValidation = (val:VAL)=>{
    this.validation={...this.validation,...val}
}
   getPosts=async()=> {
        this.posts =[]
        this.statusState! = {status:'SEND',message:'pending'} as STATUS 
   
    try{
        const response = await fetch('/api/posts')
        if(!response.ok){
        const err = await response.json()
        throw new Error(`${err.message.error}`)
        }
        const data = await response.json() as POST[] | []
        runInAction(()=>{
            this.posts = [...data]
            this.statusState! = {status:'SUCCESS',message:'success'} as STATUS
        })
      
    }catch(e:any){
        runInAction(()=>{
            if(e.message === 'Posts not fetched') this.statusState! ={status:'ERROR',message:e.message} as STATUS
            else  this.statusState! ={status:'ERROR',message:'Something went wrong'} as STATUS
        })
    
    }
  }
   fetchOne = async (id:string)=>{
    this.post={}
    this.statusState={status:'SEND',message:'pending'}
        try{
         const response = await fetch(`/api/posts/${id}`)
         const data = await response.json()
         runInAction(()=>{
            this.post = data
            this.statusState! = {status:'SUCCESS',message:'success'} as STATUS
         })
        }catch(e:any){
            runInAction(()=>{  
                this.statusState = {status:'ERROR',message:e.message} as STATUS
            })
        }
    
}
 removePost =async (id:any)=>{
    this.statusState! = {status:'SEND',message:'pending'} as STATUS 
      try{
       const response = await fetch(`/api/posts/${id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'}
       })
       runInAction(()=>{
        this.statusState! = {status:'SUCCESS',message:'success'} as STATUS
        this.posts = this.posts.filter(post=>post.id !== id)
       })
       if(!response.ok){
        throw new Error('Post not deleted')
       }
      }catch(e:any){
        this.statusState = {status:'ERROR',message:e.message} as STATUS
      }
    
  }

}

const postStore = new PostStore();
export default postStore;
