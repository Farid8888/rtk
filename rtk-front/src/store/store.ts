import {useDispatch,useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from '../store/rootStore/rootStore'
import postsApi from './services/postService'
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
reducer:{
    rootStore:rootReducer,
    [postsApi.reducerPath]:postsApi.reducer
},
middleware:(getDefaultMiddleware)=>{
   return  getDefaultMiddleware().concat(postsApi.middleware)
}
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
setupListeners(store.dispatch)