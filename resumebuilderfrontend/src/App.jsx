import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Header } from './components/Header/Header'


function App() {

  

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
