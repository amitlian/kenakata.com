import React,{useState,useContext,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import {ContextShare} from '../ContextShare'
import useStyle from '../Checkout/Checkout_Style'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import {commerce} from '../lib/commerce'



const steps = ['Shipping Address','Payment Details']
function Checkout() {
    const {cart,generateToken,checkoutToken} = useContext(ContextShare)
    const classes = useStyle();
    const [shippingData, setShippingData] = useState({})
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        generateToken()

    }, [cart]);
    const nextStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep + 1 )
    const backStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep - 1 )
    const next = (data)=>{
        setShippingData(data)
        nextStep()
    }
    const Confirmation = ()=>(
        <div>
            Confirmation
        </div>
    )
    const Form = ()=> activeStep === 0? <AddressForm next = {next}/> : <PaymentForm shippingData ={shippingData} backStep={backStep}/>

    return (
        <div className={classes.toolbar}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center" className={classes.topmargin}>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length? <Confirmation/>: checkoutToken && <Form/>}
                </Paper>
            </main>

        </div>
           
        
    )
}

export default Checkout
