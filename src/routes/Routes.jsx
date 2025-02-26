import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import TransactionContainer from "../pages/home/TransectionContainer";
import Dashboard from "../pages/dashboard/Dashboard";
import SendMoney from "../pages/transaction/SendMoney";
import Cashin from "../pages/transaction/Cashin";
import Cashout from "../pages/transaction/Cashout";
import UserTransactions from "../pages/dashboard/UserTransactions";
import Agents from "../pages/dashboard/Agents";
import RequestMoney from "../pages/dashboard/RequestMoney";
import ReqForMoney from "../pages/transaction/ReqForMoney";
import AddMoney from "../pages/transaction/AddMoney";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <Home></Home>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/send",
        element: (
          <PrivateRoutes>
            <SendMoney></SendMoney>
          </PrivateRoutes>
        ),
      },
      {
        path: "/cashin",
        element: (
          <PrivateRoutes>
            <Cashin></Cashin>
          </PrivateRoutes>
        ),
      },
      {
        path: "/cashout",
        element: (
          <PrivateRoutes>
            <Cashout></Cashout>
          </PrivateRoutes>
        ),
      },
      {
        path: "/transactions",
        element: (
          <PrivateRoutes>
            <TransactionContainer></TransactionContainer>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: "/agents",
        element: (
          <PrivateRoutes>
            <Agents></Agents>
          </PrivateRoutes>
        ),
      },
      {
        path: "/request-money",
        element: (
          <PrivateRoutes>
            <RequestMoney></RequestMoney>
          </PrivateRoutes>
        ),
      },
      {
        path: "/request",
        element: (
          <PrivateRoutes>
            <ReqForMoney></ReqForMoney>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-money",
        element: (
          <PrivateRoutes>
            <AddMoney></AddMoney>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/transaction/user/:phone",
        element: (
          <PrivateRoutes>
            <UserTransactions></UserTransactions>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
