import React,{useState,useContext,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core'
import {ContextShare} from '../ContextShare'
import useStyle from '../Checkout/Checkout_Style'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import {commerce} from '../lib/commerce'
import {Link} from 'react-router-dom';



const steps = ['Shipping Address','Payment Details']
function Checkout() {
    const {cart,order,errorMsg,generateToken,checkoutToken,isFiniahed} = useContext(ContextShare)
    const classes = useStyle();
    const [shippingData, setShippingData] = useState({})
    const [activeStep, setActiveStep] = useState(0);
    console.log("ORDER==>",order)

    useEffect(() => {
        generateToken()

    }, [cart]);
    const nextStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep + 1 )
    const backStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep - 1 )
    const next = (data)=>{
        setShippingData(data)
        nextStep()
    }
    let Confirmation = ()=> order.customer? (
        <>
            <div>
                <Typography variant="h5"> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Link to="/">
                <Button variant="outlined" type="button">Back to Home</Button>
            </Link>
        </>
    
    ): isFiniahed? (
        <>
            <div>
                <Typography variant="h5"> Thank you for your purchase</Typography>
                <Divider className={classes.divider} />
            </div>
            <br/>
            <Link to="/">
                <Button variant="outlined" type="button">Back to Home</Button>
            </Link>
        </>

    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )
    if(errorMsg){
        <>
        <Typography variant="h5">Error:{errorMsg}</Typography>
        <br/>
        <Link to="/">
                <Button variant="outlined" type="button">Back to Home</Button>
        </Link>
        </>
    }



    const Form = ()=> activeStep === 0? <AddressForm next = {next}/> : <PaymentForm shippingData ={shippingData} nextStep={nextStep} backStep={backStep}/>

    return (
        <>
        <CssBaseline/>
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
        
        </>
           
        
    )
}

export default Checkout
