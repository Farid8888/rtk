import {combineReducers} from "@reduxjs/toolkit"
import PostReducer from '../reducers/postSlice'
import statusSlice from "../reducers/statusSlice"


export const rootReducer =combineReducers({
    posts:PostReducer,
    status:statusSlice
})