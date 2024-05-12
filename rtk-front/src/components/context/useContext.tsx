import { createContext, useState,useEffect } from "react";
import {useAppDispatch,useAppSelector} from '../../store/store'
import {fetchPosts} from '../../store/actions/actions'
import { POSTS,POST } from "../../types/types";

export const Context = createContext<POSTS>({
  posts:[],
});

const ProviderContext = ({children}:{children:React.ReactNode}) => {
  const posts = useAppSelector(state=>state.rootStore.posts.posts)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return <Context.Provider value={{ posts:posts }}>
     {children}
  </Context.Provider>;
};

export default ProviderContext
