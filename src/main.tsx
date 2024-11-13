import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import ApplicationPage from './pages/application-page';
import ApplicationDashboard from './pages/application-dashboard';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationDashboard />
  },
  {
    path: "/application/:id",
    element: <ApplicationPage />

  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
