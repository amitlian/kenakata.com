import React,{useContext} from 'react'
import {ContextShare} from '../ContextShare'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import useStyle from '../Cart/Cart_style'
import CartItem from '../Cart/CartItem'
import {Link} from 'react-router-dom';


function Cart({cart}) {
    const classes = useStyle();
    // const isEmpty = !cart.line_items.length;
    const {handleEmptyCart} = useContext(ContextShare)
    const EmptyCart = ()=>(
        <Typography variant="subtitle1">You have no items in the Cart</Typography>
    )

    const FilledCard = ()=>(
        <>
        <Grid container spacing={3}>
            {cart.line_items.map(item=>(
                <Grid item xs={12} sm={4} key={item.id}>
                      <CartItem item ={item}/>  
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                        <Link to="/checkout">
                            <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                        </Link>
                        
                    </div>
                </Typography>
        </div>
        
        </>
    )

    if(!cart.line_items) return 'Loading.........'

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length? <EmptyCart/> : <FilledCard/> }
        </Container>
    )
}

export default Cart
