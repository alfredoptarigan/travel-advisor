import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DestinationDetail } from './pages/DestinationDetail'
import { Blog } from './pages/Blog'

// Create a root route
const rootRoute = createRootRoute({
  component: App,
})

// Create index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const destinationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/destinations/$id',
  component: DestinationDetail,
})

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: Blog,
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  destinationDetailRoute,
  blogRoute,
])

// Create the router
export const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}