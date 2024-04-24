import React , {useEffect, useRef, useState , Fragment} from 'react'
import { Link } from 'react-router-dom';
import "./loginSignUp.css"
import Loader from '../layout/Loader/Loader';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Profile from "../../images/profile.webp"
import { login  , signUp , clearErrors} from '../../actions/userAction';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {useNavigate} from "react-router-dom"
import { useLocation } from 'react-router-dom';

const LoginSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading , error , isAuthenticated} = useSelector(state=>state.user);
    const switcherTab=useRef(null);
    const signUpTab=useRef(null);
    const loginTab=useRef(null);
    const [loginEmail , setLoginEmail]=useState("");
    const [loginPassword , setLoginPassword]=useState("");
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
      const [avatar, setAvatar] = useState(Profile);
      const [avatarPreview, setAvatarPreview] = useState(Profile);

      const { name, email, password } = user;

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail , loginPassword));
        // console.log("Login successfully");
    }
    const signUpSubmit = (e)=>{
      e.preventDefault();

      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(signUp(myForm));
    }


    const switchTabs = (e , tab)=>{
            if (tab === "login") {
                switcherTab.current.classList.add("shiftToNeutral");
                switcherTab.current.classList.remove("shiftToRight");
          
                signUpTab.current.classList.remove("shiftToNeutralForm");
                loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==="signUp"){
            console.log("signup");
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            signUpTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    const signUpChange = (e) => {
      if (e.target.name === "avatar") {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    };
    const redirect=location.search ? `/${location.search.split("=")[1]}` : "/account";
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
      if(isAuthenticated){
        // navigate('/account');
        navigate(redirect);
      }
    } , [dispatch , alert , error , isAuthenticated , navigate , redirect]);

  return (<Fragment>{loading ? (<Loader />):(
    <div className="loginSignUpContainer">
        <div className="loginSignUpBox">
            <div>
                <div className="tabs">
                    <p onClick={(e)=>switchTabs(e , "login")}>LOGIN </p>
                    <p onClick={(e)=>switchTabs(e , "signUp")}>SIGN-UP</p> 
                </div>
                <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                <EmailIcon />
                
                <input 
                type="email"
                name="email"
                placeholder='Email'
                onChange={(e)=>setLoginEmail(e.target.value)} />
                </div>
                <div className="loginPassword">
                <LockOpenIcon />
                <input 
                type="password"
                name="password"
                placeholder='Password'
                onChange={(e)=>setLoginPassword(e.target.value)} />
                </div>
               
                <Link to="/forgot/password">Forgot Password?</Link>
                <input type='submit' value="Login" className="loginBtn"/>
            </form>
            <form className="signUpForm" ref={signUpTab} encType="multipart/form-data" onSubmit={signUpSubmit}>
                <div className="signUpName">
                <AccountBoxIcon />
                <input 
                type="name"
                name="name"
                placeholder='Name'
                onChange={signUpChange} />
                </div>
              <div className="signUpEmail">
              <EmailIcon />
              <input 
                type="email"
                name="email"
                placeholder='Email'
                onChange={signUpChange} />
              </div>
              <div className="signUpPassword">
              <LockOpenIcon />
              <input 
                type="password"
                name="password"
                placeholder='Password'
                onChange={signUpChange} />
              </div>
              <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={signUpChange}
                  />
              </div>
           
                <input type='submit' value="Sign-Up" className="signUpBtn" />
            </form>
        </div>
    </div>)}
    </Fragment>
  )
  
}

export default LoginSignUp