import React,{useContext} from 'react'
import {RootStore} from '../../mobX(store)/RootStore'

export const StoreContext =React.createContext<RootStore | null>(null)


export const useStore =()=>{
    const context = useContext(StoreContext)
    if(context === null){
        throw new Error('')
    }
    return context
}