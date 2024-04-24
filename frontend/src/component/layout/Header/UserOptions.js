import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import "./header.css"
import Profile from "../../../images/profile.webp"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
const UserOptions = ({user}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state)=>state.cart)
    const alert = useAlert();
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <AddShoppingCartIcon style={{color:cartItems.length>0?"tomato" : "unset"}}/>, name: `Cart (${cartItems.length})`, func: cart },
        { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
      ];
      if(user.role==="admin"){
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        })
      }
      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }
     console.log(user);
  return (
    <Fragment>
      <Backdrop open={open}  style={{zIndex:10}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{zIndex:"11"}}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : Profile}       
            alt="Profile"
          />
        }
      >
        console.log(user.avatar.url , "gja")
        {options.map((item)=>(
            <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <=600?true:false} />
  ))}
      </SpeedDial>
      
    </Fragment>
  )
}

export default UserOptions