import { useState } from 'react'
import { BrowserRouter,Routes, Route ,Navigate } from 'react-router-dom'
import './App.css'
import Login from './Pages/login'
import SignUp from './Pages/signup'
import Notfoundpage from './others/notfoundpage';
import Dashboard from './Pages/dashboard'
import Home from './Pages/homepage'
import ForgotPasswordModal from './Pages/forgetPasswordpage'
import Navbar from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-full'>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/forgot_password' element={<ForgotPasswordModal/>}/>
        <Route path='*' element={<Notfoundpage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
