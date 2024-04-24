import React ,{Fragment} from 'react'
import { useSelector } from 'react-redux'
import { Route , Routes, redirect , Router } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

//using older version
// const ProtectedRoute = ({element:Element , ...rest}) => {
//     const {loading , isAuthenticated , user} = useSelector(state=>state.user);
//   return (

//     <Fragment>
//         {!loading &&
//         <Routes>
//               <Route {...rest} render={(props)=>{
//             if(!isAuthenticated){
//                 return redirect('/login');
//             }
//             return <Element {...props} />
//         }} />
//         </Routes>
//       }
//     </Fragment>   
  
  
//   )
// }


const ProtectedRoute = ({children , isAdmin}) => {
    const navigate = useNavigate();
    const {loading , isAuthenticated , user} = useSelector(state=>state.user);
    if(user && (isAdmin===true  && user.role!=="admin")){
        return navigate("/login");
    }
    return (loading?<Loader />:(
        isAuthenticated ? children : navigate("/login")                       //instead of using loader we can also use isAuthenticated===false as it is different from !isAUthenticated.===false one will wait for isAUth to fill while ! one wont wait as after refresh,state takes some time to fill up.
    ))       
}



 
export default ProtectedRoute