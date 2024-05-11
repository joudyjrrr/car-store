import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "../RootLayout";

import React from "react";
import Login from "@/pages/Login/Login";

export default function Routes() {
  const Dashboard = lazy(() => import("../../pages/Dashboard"));
  const SellItem = lazy(() => import("../../pages/POS/SellItem"));
  const Orders = lazy(() => import("../../pages/Orders/Orders"));
  const Products = lazy(() => import("../../pages/Products/Products"));
  const ShowProduct = lazy(() => import("../../pages/Products/ShowProduct"));
  const AddProducts = lazy(() => import("../../pages/Products/AddProducts"));



  return createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/pos",
          element: <SellItem />,
        },
        {
          path: "/order",
          element: <Orders />,
        },
        {
          path: "/product",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <ShowProduct />,
        },
        {
          path: "/product/add",
          element: <AddProducts />,
        },
      ],
    },
  ]);
}
