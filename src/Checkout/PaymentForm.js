import React,{useContext} from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from '../Checkout/Review'
import {ContextShare} from '../ContextShare'

const stripePromise = loadStripe('pk_test_51ItpdbG1jgr8Ew2zGVCUf9IDrsqdVnl6OFIJTTbYyAU6VSRkmjgF42RtMQ1eRg8VmhoyGAv0y8W1Ja2zLMNLHNow00OkcUwNny')
function PaymentForm({shippingData,nextStep,backStep}) {
    const {checkoutToken,handleCaptureCheckout,timeout} = useContext(ContextShare)
    console.log("ShippingData==>",shippingData)

    const handleSubmit = async(event,elements,stripe)=>{
        event.preventDefault();
        if(!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card',card:cardElement})

        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items : checkoutToken.live.line_items,
                customer : {firstname: shippingData.firstName, lastname: shippingData.lastName,email: shippingData.email },
                shipping: {name:'Primary',
                 street: shippingData.address,
                 town_city:shippingData.city,
                 country_state: shippingData.shippingSubdivision,
                 postal_zip_code: shippingData.zip,
                 country: shippingData.shippingCountry,
                 },
                 fulfillment:{shipping_method: shippingData.shippingOption},
                 payment:{
                     gateway:'stripe',
                     stripe:{
                         payment_method_id: paymentMethod.id
                     }
                 }
            }
            console.log("Payment_Customer===>",checkoutToken.id,orderData)
            handleCaptureCheckout(checkoutToken.id,orderData)
            timeout()
            nextStep()
        }

    }
    return (
        <>
            <Review/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements,stripe})=>(
                        <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
                            <CardElement/>
                            <br/> <br/>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button variant="outlined" onClick={backStep} >Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>

            </Elements>
        </>
    )
}

export default PaymentForm
