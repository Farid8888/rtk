import { createContext} from "react";
import { POSTS} from "../../types/types";
import {useFetchPostsHook} from '../../createAsyncThunk(store)/hooks'

export const Context = createContext<POSTS>({
  posts:[],
  isLoading:false,
  isSuccess:false,
  isError:false,
  error:{}
});

const ProviderContext = ({children}:{children:React.ReactNode}) => {

  const {data,isLoading,isSuccess,error,isError} = useFetchPostsHook({id:''})
  return <Context.Provider value={{ posts:data,isLoading:isLoading,isSuccess:isSuccess,error:error,isError:isError}}>
     {children}
  </Context.Provider>;
};

export default ProviderContext
