import IRoutes from '../interfaces/routes'
import BlogPage from '../pages/blog'
import EditPage from '../pages/edit'
import HomePage from '../pages/home'
import LoginPage from '../pages/login'

const authRoutes: IRoutes[] = [
    {
        path: '/login',
        auth: false,
        component: LoginPage 
    },
    {
        path: '/register',
        auth: false,
        component: LoginPage 
    }
]
const blogRoutes: IRoutes[] = [
    {
        path: '/edit',
        auth: true,
        component: EditPage 
    },
    {
        path: '/edit/:blogID',
        auth: true,
        component: EditPage 
    },
    {
        path: '/blog/:blogID',
        auth: false,
        component: BlogPage 
    }
]
const mainRoutes: IRoutes[] = [
    {
        path: '/',
        auth: false,
        component: HomePage 
    }
]

const routes: IRoutes[] = [
    ...authRoutes,
    ...blogRoutes,
    ...mainRoutes
]

export default routes