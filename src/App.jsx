import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from 'react';

const Main = lazy(() => import("./MainComponent/Main"));
const Error = lazy(() => import("./ErrorComponent/Error"));
const Root = lazy(() => import("./RootComponent/Root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />
      }
    ]
  }
])
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App;
