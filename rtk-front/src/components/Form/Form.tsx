import React,{useState} from 'react'
import {useAppDispatch,useAppSelector} from '../../store/store'
import {formHandler} from '../../store/actions/actions'
import {validate} from '../../store/reducers/statusSlice'
import {useNavigate,useParams,useLocation} from 'react-router'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { POST } from '../../types/types'



const Form:React.FC<POST> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const [values,setValues]= useState<POST>({
        title:props.title ? props.title : '',
        body:props.body ? props.body : ''
    })    
   const {title:titVld,body:bodyVld} = useAppSelector(state=>state.rootStore.status.validation)


const validation = Object.values(values).some(item=>!item)
console.log(validation,titVld,bodyVld)
    const submitHandler =(e:React.FormEvent)=>{
    e.preventDefault()
   const method = !location.pathname.includes('/edit') ? 'POST' : 'PATCH'

   dispatch(formHandler(values,method,params.id))
    validation ? navigate('/') : navigate('/posts') 
    }
    const changeHandler =(e:React.FormEvent<HTMLInputElement>)=>{
       const {value,name} = e.currentTarget
       dispatch(validate({[name]:false}))
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
        {titVld && <div className='text-danger'> Enter the title</div>}
        </div>
        <div className='d-flex flex-column my-3'>
        <label htmlFor='body'>Body:</label>
        <input value={values.body} className='border rounded py-1 px-2 focus-ring' id='body' name='body' onChange={changeHandler}/>
        {bodyVld && <div className='text-danger'> Enter the body</div>}
        </div>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
