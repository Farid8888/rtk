import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {STATUS,VAL} from '../../types/types'




const initialState:{status:STATUS | null,validation:VAL} ={
    status:null,
    validation:{
        title:'',
        body:''
    } 
}

const statusSlice = createSlice({
    name:'status',
    initialState,
    reducers:{
        getStatus:(state,action:PayloadAction<STATUS>)=>{
            state.status = {...action.payload}
        },
        validate:(state,action:PayloadAction<VAL>)=>{
            for(let key in state.validation){
                state.validation ={...state.validation,[key]:action.payload[key]}
            }
        }
    }
})

export const {getStatus,validate} = statusSlice.actions
export default statusSlice.reducer