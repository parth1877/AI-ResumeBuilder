import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home/Home.jsx'
import { SignInPage } from './auth/sign-in/SignInPage.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { EditResume } from './dashboard/resume/[resumeID]/edit/EditResume.jsx'
import { ToastContainer } from 'react-toastify'
import View from './my-resume/[resumeID]/View/View.jsx'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: "/dashboard",
        element: <Dashboard />
      },{
        path:"/dashboard/resume/:resumeId/edit",
        element:<EditResume/>
      }
    ]
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />
  },{
    path:"/my-resume/:resumeID/view",
    element:<View/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
      <ToastContainer/>
    </ClerkProvider>
  </React.StrictMode>,
)
