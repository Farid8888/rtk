import React,{useState} from 'react'
import {useNavigate,useParams,useLocation} from 'react-router'
import { POST } from '../../types/types'
import {useAppDispatch,useAppSelector} from '../../createAsyncThunk(store)/store'
import {createPost,errorPosts,updatePost} from '../../createAsyncThunk(store)/postSlice'


const Form:React.FC<POST> = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const dispatch = useAppDispatch()
 const {post:postEr} = useAppSelector(state=>errorPosts(state)) as {post:{errors:{title:string,body:string}}}
 const {patch:patchEr} = useAppSelector(state=>errorPosts(state)) as {patch:{errors:{title:string,body:string}}}

console.log(patchEr)
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    }) 
    
    let err
  if(patchEr){
  err = patchEr.errors
  } else if(postEr){
    err= postEr.errors
  }
    




const addPost = ()=> createPost({id:'',post:values})
const editPost =()=>  updatePost({id:`${params.id}`,post:values})

const validation = Object.values(values).some(item=>!item)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()
   !location.pathname.includes('/edit') ? dispatch(addPost()) : dispatch(editPost())
    validation ? navigate(`${location.pathname}`) : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
       err =false
       setValues(prevst=>{
        return {...prevst,[name]:value}
       })
    }
   
  return (
    <div className='d-flex flex-column justify-content-center min-vh-100'>
      <form onSubmit={submitHandler} className='border container p-5 rounded-3 shadow w-50' >
      <div className='d-flex flex-column'>
        <label htmlFor='title'>Title:</label>
        <input value={values.title} className='border rounded py-1 px-2 focus-ring' id='title' name='title' onChange={changeHandler}/>
        {err?.title && <div className='text-danger'>{err.title}</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {err?.body && <div className='text-danger'>{err.body}</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
