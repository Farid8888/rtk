import { createContext,useEffect } from "react";
import {useAppDispatch,useAppSelector} from '../../redux-saga(store)/store'
import { POSTS} from "../../types/types";
import {getPostsSaga} from '../../redux-saga(store)/reducers/postSlice'

export const Context = createContext<POSTS>({
  posts:null,
  status:''
});

const ProviderContext = ({children}:{children:React.ReactNode}) => {
  const posts = useAppSelector(state=>state.posts.posts)
  const status = useAppSelector(state=>state.status.status?.status)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPostsSaga());
  }, [dispatch]);
  return <Context.Provider value={{ posts:posts,status:status! }}>
     {children}
  </Context.Provider>;
};

export default ProviderContext
