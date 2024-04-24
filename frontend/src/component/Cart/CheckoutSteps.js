import React from 'react'
import "./CheckoutSteps.css"
import { Stepper , Step , StepLabel } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Typography} from '@mui/material';

const CheckoutSteps = ({activeStep}) => {
    const steps=[
        {
            icon:<LocalShippingIcon />,
            label:<Typography>Shipping Details</Typography>
        },
        {
            icon:<LibraryAddCheckIcon />,
            label:<Typography>Confirm Order</Typography>
        },
        {
            icon:<AccountBalanceIcon />,
            label:<Typography>Payment</Typography>
        }
    ]
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item , index)=>(
            <Step key={index}>
                <StepLabel className={
                index === activeStep ? "active" : index < activeStep ? "completedStep" : "notReached"
              } icon={item.icon}>{item.label}</StepLabel>
            </Step>
        ))}
    </Stepper>
  )
}

export default CheckoutSteps