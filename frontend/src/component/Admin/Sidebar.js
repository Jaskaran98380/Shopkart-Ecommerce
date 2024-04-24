import React from 'react'
import logo from "../../images/logo.jpg";
import "./sidebar.css";
import { TreeView , TreeItem } from '@mui/x-tree-view';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="logo" />
        </Link>
        <Link to="/admin/dashboard">
            <p>
                <DashboardIcon />
                Dashboard
            </p>
        </Link>
        <Link>
            <TreeView 
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ImportExportIcon />} 
              >
                <TreeItem nodeId="1" label="Products">
                    <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={<PostAddIcon />}/>
                    </Link>
                    <Link to="/admin/product">
                    <TreeItem nodeId="3" label="Create" icon={<AddIcon />}/>
                    </Link>
                    </TreeItem>              </TreeView>
        </Link>
        <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default Sidebar