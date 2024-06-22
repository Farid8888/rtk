import React,{useState} from 'react'
import {useNavigate,useParams,useLocation} from 'react-router'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { POST } from '../../types/types'
import {useQueryClient,useMutation} from '@tanstack/react-query'
import {postForm} from '../../store(ReactQuery)/api'


const Form:React.FC<POST> = (props) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:postForm,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['posts']})
    }
  })
  const {data}:{data?:{errors:{title:string,body:string}},isPending:any}  = mutation 
 
  let err
  if(data?.errors){
    err = data.errors
  }
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    })    

const validation =  Object.values(values).some(item=>!item)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()
   const method = !location.pathname.includes('/edit') ? 'POST' : 'PATCH'

   mutation.mutate({post:values,method:method,id:params.id})
    validation ? navigate('/') : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
      if(err!) err[name] = false

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
        {err?.title && <div className='text-danger'>{data?.errors.title}</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {err?.body && <div className='text-danger'>{data?.errors.body}</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
