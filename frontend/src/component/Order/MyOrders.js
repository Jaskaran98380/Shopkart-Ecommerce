import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { myOrders } from '../../actions/orderAction';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { clearErrors } from '../../actions/orderAction';
import "./myOrders.css";
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';


const MyOrders = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user)
  const {loading , error , orders} = useSelector(state=>state.myOrders)

  const columns=[
    {field:"id",
    headerName:"OrderId",
    minWidth:300,
    flex:1},

    {field:"status",
    headerName:"Status",
    minWidth:150,
    flex:0.5,
    cellClassName: (params) => {
      console.log(params);
      return params.value==="Delivered"
        ? "greenColor"
        : "redColor"
    }
    
},

    {field:"itemsQty",
    headerName:"Items Quantity",
    type:"number",
    minWidth:130,
    flex:0.3},

    {field:"amount",
    headerName:"Amount",
    minWidth:150,
    type:"number",
    flex:0.5},

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (

          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ]

  const rows=[];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myOrders());
    }, [dispatch, alert, error]);
     
  return (
   <div className="myOrdersPage">
    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
    <DataGrid columns={columns} 
     rows={rows}
     pageSize={10}
     autoHeight
     disableSelectionOnClick
     className="myOrdersTable" />
     
   </div>

  )
}

export default MyOrders