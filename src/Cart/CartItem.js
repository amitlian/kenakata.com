import React,{useContext} from 'react'
import {ContextShare} from '../ContextShare'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core'
import useStyle from '../Cart/CartItem_style'

function CartItem({item}) {
    const classes = useStyle();
    const {handleUpdateCartQty,handleRemoveFromCart} = useContext(ContextShare);
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={()=> handleUpdateCartQty(item.id,item.quantity -1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=> handleUpdateCartQty(item.id,item.quantity +1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={()=> handleRemoveFromCart(item.id)}>Remove</Button>

            </CardActions>
        </Card>
    )
}

export default CartItem
