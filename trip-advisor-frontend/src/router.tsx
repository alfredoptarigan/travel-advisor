import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DestinationDetail } from './pages/DestinationDetail'
import { Blog } from './pages/Blog'
import DashboardLayout from './components/features/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import PlacesList from './pages/dashboard/PlacesList'
import PublicLayout from './layouts/PublicLayout'

// Create a root route
const rootRoute = createRootRoute({
  component: App,
})

// Create a public layout route (pathless)
const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_public',
  component: PublicLayout,
})

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: Home,
})

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/register',
  component: Register,
})

const destinationDetailRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/destinations/$id',
  component: DestinationDetail,
})

const blogRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/blog',
  component: Blog,
})

// Dashboard Routes (Direct children of rootRoute, bypassing PublicLayout)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: DashboardLayout,
})

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: DashboardHome,
})

const dashboardPlacesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'places',
  component: PlacesList,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    destinationDetailRoute,
    blogRoute,
  ]),
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardPlacesRoute,
  ]),
])

// Create the router
export const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}