import {configureStore} from '@reduxjs/toolkit'
import {postSlice} from './postSlice'
import {useDispatch,useSelector} from 'react-redux'

export const store = configureStore({
    reducer:{
       posts:postSlice.reducer
    }
})

type AppDispatch = typeof store.dispatch
export type RootState =ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
