import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js"
import "./dashboard.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import 'chart.js/auto'
import {  Line , Doughnut } from "react-chartjs-2"
import { useDispatch , useSelector } from 'react-redux';
import {
    getAdminProduct,
  } from "../../actions/productAction";
// import {Chart, ArcElement , CategoryScale , LinearScale , PointElement , LineElement, Title} from 'chart.js'
// Chart.register(ArcElement , CategoryScale , LinearScale , PointElement , LineElement , Title);

import { useAlert } from 'react-alert';
import { getAllOrders } from '../../actions/orderAction.js';

const Dashboard = () => {
  
  
  const alert = useAlert();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
   
    
    let outOfStock = 0;

    products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };
    
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock , products.length - outOfStock],
          },
        ],
      };

      useEffect(()=>{
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
      } , [dispatch])

      let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboardContainer'>
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>2</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>

        </div>
    )
}

export default Dashboard