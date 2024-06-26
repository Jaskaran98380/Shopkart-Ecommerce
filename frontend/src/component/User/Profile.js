import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import "./profile.css"



const Profile = () => {
    const navigate = useNavigate();
    const {user , loading , isAuthenticated} = useSelector(state=>state.user);
    // console.log(isAuthenticated , "tested2");
    // console.log(user , "tested");
    // console.log(user.name,"tested");
    useEffect(()=>{
            if(!isAuthenticated){
                navigate("/login");
            }
            
    },[]);
    // console.log("jassi");
    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={`${user.name}'s Profile`} />
              <div className="profileContainer">
                <div>
                  <h1>MY PROFILE</h1>
                  {/* {loading===false && <img src={user.avatar.url} alt={user.name} />} */}
                  <img src={user.avatar.url} alt={user.name} />
                  <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
    
                  <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
}

export default Profile