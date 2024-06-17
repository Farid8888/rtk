import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import RootLayoutPage from './pages/RootLayoutPage'
import HomePage from './pages/HomePage'
import {Provider} from "react-redux"
import store from './redux-saga(store)/store'
import "./components/styles/app.less";
import "./components/styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ListsPage from './pages/ListsPage'
import PostPage from './pages/PostPage'
import EditPage from './pages/EditPage'
import ProviderContext from './components/context/useContext'
import {StoreContext} from './components/context/Context(mobX)'
import {RootStore} from './mobX(store)/RootStore'


const router =createBrowserRouter([
  {
    path:'/',
    errorElement:<div>Error</div>,
    children:[
      {
        path:'',
        element:<RootLayoutPage/>,
        children:[
          {
            index:true,
            element:<HomePage/>
          },
          {
            path:'posts',
            element:<ListsPage/>
          }
        ]
      },
      {
        path:`post/:id`,
        element:<PostPage/>
      },
      {
        path:`edit/:id`,
        element:<EditPage/>
      }
    ]
  },
])


const reactRoot = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
reactRoot.render(
 <StoreContext.Provider value={new RootStore()}>
       <RouterProvider router={router}/>
 </StoreContext.Provider>
)







