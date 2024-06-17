import React from 'react'
import Posts from '../components/Posts/Posts'
import {observer} from 'mobx-react-lite'
import {toJS} from 'mobx'
import {useStore} from '../components/context/Context(mobX)'


const ListsPage = observer(() => {
  const {post:{posts,getPosts,statusState,removePost}} = useStore()
  React.useEffect(()=>{
    getPosts()
  },[])
  return (
    <div>
      <Posts posts={toJS(posts)} status={toJS(statusState!)} remove={removePost}/>
    </div>
  )
})

export default ListsPage
