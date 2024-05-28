import React,{useState} from 'react'
import {useNavigate,useParams,useLocation} from 'react-router'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { POST } from '../../types/types'
import {useAddPostsMutation,useEditPostMutation} from '../../store/services/postService'



const Form:React.FC<POST> = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    console.log(props.title)
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    })    
    const [addPost,{error,isLoading}] = useAddPostsMutation()
    const [editPost,{error:editErr,isLoading:loading}] =useEditPostMutation()
let err
if(error){ 
  if('status' in error){
    const {errors} = error.data as {errors:{title:string,body:string}}
    err=errors
    }
}

if(editErr){ 
  if('status' in editErr){
    const {errors} = editErr.data as {errors:{title:string,body:string}}
    err=errors
    }
}

if(isLoading || loading){
  return <div className='d-flex align-content-center justify-content-center min-vh-100 flex-wrap'><LoadingSpinner/></div>
}

const validation = Object.values(values).some(item=>!item)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()

  !location.pathname.includes('/edit') ? addPost(values) : editPost({id:params.id,post:values})
    validation ? navigate(`${location.pathname}`) : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
      err ={[name]:false}
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
        {err?.title && <div className='text-danger'> Enter the title</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {err?.body && <div className='text-danger'> Enter the body</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
