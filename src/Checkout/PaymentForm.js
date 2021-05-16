import React,{useContext} from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from '../Checkout/Review'
import {ContextShare} from '../ContextShare'

const stripePromise = loadStripe('...')
function PaymentForm({shippingData,backStep}) {
    const {checkoutToken} = useContext(ContextShare)
    return (
        <>
            <Review/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements,stripe})=>(
                        <form>
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