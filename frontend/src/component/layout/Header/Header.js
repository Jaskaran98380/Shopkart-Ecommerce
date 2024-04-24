import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.jpg";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";


const Header = () => {
const options={
  burgerColorHover: "red",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  navColor2: "lightpink",
  // navColor2: "#00ABE4",
  logoHoverSize: "10px",
  logoHoverColor:"blue",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.9vmax",
  // link1Color: "rgba(35, 35, 35,0.8)",
  link1Color: "black",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "white",
  link1Margin: "1.5vmax",
  profileIconUrl: "/login",
  // profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColor: "white",
  searchIconColor: "white",
  cartIconColor: "white",
  profileIconColorHover: "rgb(45, 44, 44)",
  searchIconColorHover: "rgb(45, 44, 44)",
  cartIconColorHover: "rgb(45, 44, 44)",
  cartIconMargin: "1vmax",
  ProfileIconElement:MdAccountCircle,
  profileIcon:true,
  CartIconElement:MdAddShoppingCart ,
  cartIcon:true,
  SearchIconElement:MdSearch ,
  searchIcon:true,
}

  return (
    <ReactNavbar  {...options}
   />
  )
}

export default Header