import React,{useState} from 'react'
import {useNavigate,useParams,useLocation} from 'react-router'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { POST } from '../../types/types'
import {useAppDispatch,useAppSelector} from '../../redux-saga(store)/store'
import {addPostSaga} from '../../redux-saga(store)/reducers/postSlice'
import {validate} from '../../redux-saga(store)/reducers/statusSlice'


const Form:React.FC<POST> = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const dispatch = useAppDispatch()
const errors = useAppSelector(state=>state.status.validation)
const status = useAppSelector(state=>state.status.status?.status)
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    })
    console.log(props.title)    


if(status === 'SEND'){
  return <div className='d-flex align-content-center justify-content-center min-vh-100 flex-wrap'><LoadingSpinner/></div>
}
const validation = Object.values(values).some(item=>!item)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()

  !location.pathname.includes('/edit') ? dispatch(addPostSaga({post:values,method:'POST'})) : dispatch(addPostSaga({id:params.id,post:values,method:'PATCH'}))
    validation ? ()=>{} : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
       setValues(prevst=>{
        return {...prevst,[name]:value}
       })
       dispatch(validate({[name]:false}))
       console.log(name)
    }
   
  return (
    <div className='d-flex flex-column justify-content-center min-vh-100'>
      <form onSubmit={submitHandler} className='border container p-5 rounded-3 shadow w-50' >
      <div className='d-flex flex-column'>
        <label htmlFor='title'>Title:</label>
        <input value={values.title} className='border rounded py-1 px-2 focus-ring' id='title' name='title' onChange={changeHandler}/>
        {errors.title && <div className='text-danger'>{errors.title}</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {errors.body && <div className='text-danger'>{errors.body}</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
