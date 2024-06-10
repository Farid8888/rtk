import {NavLink} from 'react-router-dom'


const Navigation = () => {
  return (
    <header className='navigation'>
      <nav>
        <h1>React Form</h1>
        <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to='/posts'>Posts</NavLink></li>
            <li><NavLink to='login'>Log in</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
