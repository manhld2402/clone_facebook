
import { Route, Routes } from 'react-router-dom'
import HomePage from '../page/HomePage'
import Login from '../page/Login'
import RecreatePass from '../page/ForgetPassword'

function App() {

  return (
    <div /* style={{height:"923px"}} */>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forget-password/:id' element={<RecreatePass/>}/>
        
      </Routes>

    </div>
  )
}

export default App
