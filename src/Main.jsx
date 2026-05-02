import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signin from "./components/Signin.jsx"
import Signup from "./components/Signup.jsx"
import Success from"./components/Success.jsx"
import Home from "./components/Home.jsx"
import NotFound from "./components/NotFound.jsx";
import Sell from "./components/Sell.jsx"
import ItemDashboard from './components/ItemDashboard.jsx'
import "./main.css"
import BuyerDash from './components/Buyerdash.jsx'
import SellerDash from './components/Sellersdash.jsx'

import { checkLogin,allowEntery } from './js/extraFxn.js'
import { logOut } from './js/homeFxn.js'

const router=createBrowserRouter([
  {path:"/",element:<Signin/>,loader:checkLogin},
  {path:"/signup",element:<Signup/>},
  {path:"/success",element:<Success/>},
  {path:"/home/:username",element:<Home/>,loader:allowEntery},
  {path:"/sell",element:<Sell/>,loader:allowEntery},
  {path:"/dashboard/:id",element:<ItemDashboard/>,loader:allowEntery},
  {path:"/buyerdash/:username",element:<BuyerDash/>,loader:allowEntery,action:logOut},
  {path:"/sellerdash",element:<SellerDash/>,loader:allowEntery},
  { path: "*", element: <NotFound /> }
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
     
  ,
)
