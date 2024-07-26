import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export const Header = () => {
    const { user, isLoaded, isSignedIn } = useUser();

    

    if (!user && !isSignedIn && isLoaded) {
        return <Navigate to={"auth/sign-in"} />
    }
    return (
        <div className='p-3 mb-5 flex justify-between items-center shadow-lg'>
            <img src='/logo.svg' height={50} width={50} />

            {
                isSignedIn ? (
                    <div className='flex justify-center items-center gap-3'>
                        <Link to={"/Dashboard"} >
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                        
                        <UserButton/>
                    </div>
                ) : (
                    <Link to={"/auth/sign-in"}>
                        <Button>Get Started</Button>
                    </Link>
                )
            }

        </div>
    )
}
