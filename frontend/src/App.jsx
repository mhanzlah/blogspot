import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import Layout from './layouts/Layout'

import Loader from './components/Loader'

import GuestRoute from './components/GuestRoute'
import ProtectedRoute from './components/ProtectedRoute'

import { useAuth } from './context/AuthContext'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Profile = lazy(() => import('./pages/Profile'))
const Blog = lazy(() => import('./pages/Blog'))
const CreateBlog = lazy(() => import('./pages/CreateBlog'))
const EditBlog = lazy(() => import('./pages/EditBlog'))
const NotFound = lazy(() => import('./pages/NotFound'))


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/blogs/:slug',
                element: <Blog />,
                handle: {
                    title: ({ params }) => params.slug,
                },
            },
            {
                path: '/edit/:slug',
                element: <EditBlog />,
                handle: {
                    title: ({ params }) => `Edit ${params.slug}`,
                },
            },
            {
                path: '/new',
                element: <ProtectedRoute><CreateBlog /></ProtectedRoute>,
                handle: {
                    title: 'Create a new blog',
                },
            },
            {
                path: '/login',
                element: <GuestRoute> <Login /></GuestRoute>,
                handle: {
                    title: 'Login',
                },
            },
            {
                path: '/sign-up',
                element: <GuestRoute><SignUp /></GuestRoute>,
                handle: {
                    title: 'Sign Up',
                },
            },
            {
                path: '/profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
                handle: {
                    title: 'Profile',
                },
            },
            {
                path: '*',
                element: <NotFound />,
                handle: {
                    title: 'Not Found',
                }
            }
        ],
    },
])

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default App
