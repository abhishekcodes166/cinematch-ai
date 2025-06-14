import React from 'react'
import Login from './Login'
import Browse from './Browse'
import GPTsearch from './GPTsearch'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utiles/Userslice'
import { useEffect } from 'react'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        },
        {
            path: "/gptsearch",
            element: <GPTsearch/>
        },
    ]);


    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body