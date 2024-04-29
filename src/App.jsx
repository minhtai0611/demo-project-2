import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import RiseLoader from "react-spinners/RiseLoader"

const Main = lazy(() => import("./MainComponent/Main"));
const Error = lazy(() => import("./ErrorComponent/Error"));
const Root = lazy(() => import("./RootComponent/Root"));
const Discovery = lazy(() => import("./DiscoveryComponent/Discovery"));
const News = lazy(() => import("./NewsComponent/News"));
const Statistic = lazy(() => import("./StatisticComponent/Statistic"));
const Discuss = lazy(() => import("./DiscussComponent/Discuss"));
const Market = lazy(() => import("./MarketComponent/Market"));
const Video = lazy(() => import("./VideoComponent/Video"));
const Information = lazy(() => import("./InformationComponent/Information"));
const Support = lazy(() => import("./SupportComponent/Support"));
const Login = lazy(() => import("./LoginComponent/Login"));
const Register = lazy(() => import("./RegisterComponent/Register"));
const Policy = lazy(() => import("./PolicyComponent/Policy"));
const Agreement = lazy(() => import("./AgreementComponent/Agreement"));
const Refund = lazy(() => import("./RefundComponent/Refund"));
const Recruit = lazy(() => import("./RecruitComponent/Recruit"));
const Social = lazy(() => import("./SocialComponent/Social"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/discovery",
        element: <Discovery />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/statistic",
        element: <Statistic />,
      },
      {
        path: "/discuss",
        element: <Discuss />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/video",
        element: <Video />,
      },
      {
        path: "/information",
        element: <Information />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/policy",
        element: <Policy />,
      },
      {
        path: "/agreement",
        element: <Agreement />,
      },
      {
        path: "/refund",
        element: <Refund />,
      },
      {
        path: "/recruit",
        element: <Recruit />,
      },
      {
        path: "/social",
        element: <Social />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Suspense fallback={<RiseLoader color="#f0ffff" size={80} margin={0} speedMultiplier={0.7} cssOverride={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }} />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense >
    </>
  );
}

export default App;
