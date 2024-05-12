import {useDispatch,useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from '../store/rootStore/rootStore'

export const store = configureStore({
reducer:{
    rootStore:rootReducer
},
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()