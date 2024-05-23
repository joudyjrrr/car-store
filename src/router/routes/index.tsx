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
  const Category = lazy(() => import("../../pages/Category/Category"));
  const Customers = lazy(() => import("../../pages/Customers/Customers"));
  const CarModel = lazy(() => import("../../pages/Cars/CarModel/CarModel"));
  const CarHorsepower = lazy(() => import("../../pages/Cars/CarHorsepower/CarHorsepower"));
  const CarYear = lazy(() => import("../../pages/Cars/CarYear/CarYear"));
  const CarCompany = lazy(() => import("../../pages/Cars/CarCompany/CarCompany"));
  const EmployeeType = lazy(() => import("../../pages/EmployeeType/EmployeeType"));
  const PayTypes = lazy(() => import("../../pages/PayTypes/PayTypes"));
  const Brand = lazy(() => import("../../pages/Brand/Brand"));
  const SiginUp = lazy(() => import("../../pages/Auth/SiginUp"));
  const Supplier = lazy(() => import("../../pages/Supplier/Supplier"));
  const OrdersS = lazy(() => import("../../pages/POS/Orders/Orders"));
  const Sells = lazy(() => import("../../pages/Sells/Sells"));











  return createBrowserRouter([
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/signup",
      element: <SiginUp />,
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
          path: "/sell",
          element: <Sells />,
        },
        {
          path: "/pos",
          element: <SellItem />,
        },
      
        {
          path: "/pos/order",
          element: <OrdersS />,
        },
        {
          path: "/pos/order",
          element: <OrdersS />,
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
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/cars/car-model",
          element: <CarModel />,
        },
        {
          path: "/cars/motor",
          element: <CarHorsepower />,
        },
        {
          path: "/cars/carYear",
          element: <CarYear />,
        },
        {
          path: "/cars/car-company",
          element: <CarCompany />,
        },
        {
          path: "/employee-type",
          element: <EmployeeType />,
        },
        {
          path: "/pay-types",
          element: <PayTypes />,
        },
        {
          path: "/brand",
          element: <Brand />,
        },
        {
          path: "/supplier",
          element: <Supplier />,
        },
      
      ],
    },
  ]);
}
