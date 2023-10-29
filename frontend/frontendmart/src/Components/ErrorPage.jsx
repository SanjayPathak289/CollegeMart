import { Button } from '@radix-ui/themes'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>404 Page Not Found</div>
            <Button onClick={() => navigate("/")} >Go Home</Button>
        </>
    )
}

export default ErrorPage