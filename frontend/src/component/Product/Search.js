import React ,{useEffect , Fragment, useState} from 'react'
import "./search.css"
import {useNavigate} from "react-router-dom"
import MetaData from "../layout/MetaData"


const Search = () => {
    let navigate = useNavigate();
    const [keyword ,setKeyword] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate("/products")
        }
    }
  return (
    <Fragment>
        <MetaData title="Search --SHOPKART" />
        <form className="searchBox" onSubmit={handleSubmit}>
       <input type="text" 
       placeholder='Exter a product'
       onChange={(e)=>setKeyword(e.target.value)} />
       <input type="submit" value="Search" />
       </form>
  </Fragment>
  )
}



export default Search