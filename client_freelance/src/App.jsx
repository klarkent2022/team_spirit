import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./app.scss";
import React from "react";
import Gigs from "./pages/gigs/Gigs";
import GigDetails from "./pages/gigDetails/GigDetails";
import MyOrders from "./pages/myOrders/MyOrders";
import Message from "./pages/message/Message";
import Purchases from "./pages/purchases/Purchases";
import HomePage from "./pages/homePage/HomePage";
import MyMessages from "./pages/myMessages/MyMessages";
import MyGigs from "./pages/myGigs/MyGigs";
import Topbar from "./components/topbar/Topbar";
import AddGig from "./pages/addGig/AddGig";
import Footer from "./components/footer/Footer";


function App() {
  const Layout = () => {
    return (
      <div>
        <Topbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gigs/:category",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <GigDetails />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <AddGig />,
        },
        {
          path: "/orders",
          element: <MyOrders />,
        },
        {
          path: "/purchases",
          element: <Purchases />,
        },
        {
          path: "/messages",
          element: <MyMessages />,
        },
        {
          path: "/message/:chatId",
          element: <Message />,
        },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
