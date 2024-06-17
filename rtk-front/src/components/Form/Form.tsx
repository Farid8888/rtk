import React,{useState} from 'react'
import {useNavigate,useParams,useLocation} from 'react-router'
import { POST } from '../../types/types'
import {observer} from 'mobx-react-lite'
import {useStore} from '../context/Context(mobX)'

const Form:React.FC<POST> = observer((props) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const {post:{formHandler,validation:validate,clearValidation}} = useStore()
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    })


const validation = Object.values(values).some(item=>!item)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()

  !location.pathname.includes('/edit') ? formHandler(values,'POST') : formHandler(values,'PATCH',params.id)
    validation ? ()=>{} : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
       setValues(prevst=>{
        return {...prevst,[name]:value}
       })
      clearValidation({[name]:false})
    }
   
  return (
    <div className='d-flex flex-column justify-content-center min-vh-100'>
      <form onSubmit={submitHandler} className='border container p-5 rounded-3 shadow w-50' >
      <div className='d-flex flex-column'>
        <label htmlFor='title'>Title:</label>
        <input value={values.title} className='border rounded py-1 px-2 focus-ring' id='title' name='title' onChange={changeHandler}/>
        {validate.title && <div className='text-danger'>{validate.title}</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {validate.body && <div className='text-danger'>{validate.body}</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
})

export default Form
