import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Profile = lazy(() => import('./pages/Profile'))
const Blogs = lazy(() => import('./pages/Blogs'))
const Blog = lazy(() => import('./pages/Blog'))
const CreateBlog = lazy(() => import('./pages/CreateBlog'))
const NotFound = lazy(() => import('./pages/NotFound'))


const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/blogs',
                children: [
                    {
                        index: true,
                        element: <Blogs />,
                        handle: {
                            title: 'Blogs'
                        },
                    },
                    {
                        path: ':slug',
                        element: <Blog />,
                        handle: {
                            title: ({ params }) => params.slug,
                        },
                    },
                ],
            },
            {
                path: '/new',
                element: <CreateBlog />,
                handle: {
                    title: 'Create a new blog',
                },
            },
            {
                path: '/login',
                element: <Login />,
                handle: {
                    title: 'Login',
                },
            },
            {
                path: '/sign-up',
                element: <SignUp />,
                handle: {
                    title: 'Sign Up',
                },
            },
            {
                path: '/profile',
                element: <Profile />,
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
