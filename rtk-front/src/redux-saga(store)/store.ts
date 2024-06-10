import {configureStore} from '@reduxjs/toolkit'
import {useDispatch,useSelector} from 'react-redux'
import postSlice from './reducers/postSlice'
import statusSlice from './reducers/statusSlice'
import createSagaMiddleware from 'redux-saga'
import {mySaga} from './saga'

const saga =createSagaMiddleware()

const store = configureStore({
    reducer:{
     posts:postSlice,
     status:statusSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(saga)
})

saga.run(mySaga)

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()



export default store