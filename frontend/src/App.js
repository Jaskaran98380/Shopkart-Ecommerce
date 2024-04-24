import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
import { useState , useEffect } from 'react';
import Home from "./component/Home/Home"
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import Loader from "./component/layout/Loader/Loader";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UsersList from "./component/Admin/UsersList.js"
import UpdateUser from "./component/Admin/UpdateUser.js"
import ProductReviews from "./component/Admin/ProductReviews.js"
import NotFound from "./component/layout/Not Found/notFound"


function App() {
  const {isAuthenticated , user , loading} = useSelector(state=>state.user);
//  console.log(isAuthenticated,"1");
//  console.log(loading,"1");

const [stripeApiKey , setStripeApiKey] = useState("");
async function getStripeApiKey(){
  const {data} = await axios.get("/api/v1/stripeapikey");
  setStripeApiKey(data.stripeApiKey);
}
useEffect(()=>{
  // console.log(isAuthenticated,"2");
  // console.log(loading,"2");
  WebFont.load({
    google:{
      families:["Roboto" , "Droid Sans" , "Anta"]
    }
    
  })
  // console.log(isAuthenticated,"3");
  // console.log(loading,"3");
  store.dispatch(loadUser());
  getStripeApiKey();
} , []);


  return (<Router>
    {/* {console.log(isAuthenticated,"4")}
    {console.log(loading,"4")} */}
    <Header />
    {isAuthenticated && <UserOptions user={user} />}

    {stripeApiKey && 
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Routes>
      <Route exact path="/payment/process" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
      </Routes> 
    </Elements>}

    <Routes>
    <Route path="/" element={< Home />} />
    <Route exact path="/contact" element={<Contact />} />
    <Route exact path="/about" element={<About />} />
    <Route path="/product/:id" element={< ProductDetails />} />
    <Route path="/products" element={< Products />} />
    <Route path="/products/:keyword" element={< Products />} />
    <Route path="/search" element={< Search />} />
    <Route path="/login" element={< LoginSignUp />} />
    {/* {loading===false && <Route path="/account" element={<Profile />} />} */}
    {/* <ProtectedRoute path="/account" element={<Profile />} />      //older version(no longer supported) */}
    <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
    <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
    <Route path="/forgot/password" element={<ForgotPassword />} />
    <Route path="/password/reset/:token" element={<ResetPassword />} />
    <Route path="/cart" element={<Cart />} />
  
    <Route exact path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}/>
    <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>}/>
    <Route exact path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>
    <Route exact path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>}/>
    <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>}/>
    <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>
    <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>}/>
    <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}/>
    <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}/>
    <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>}/>
    <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>}/>
    <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>}/>
    <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>}/>
    <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>}/>
    {/* <Route
          element={
            window.location.pathname === "/payment/process" ? null : <NotFound />
          }
        /> */}
        console.log(window.location.pathname , "ggf");
    </Routes>

    
    
  



    
    
    <Footer />
  
  </Router>
  )
}

export default App;
