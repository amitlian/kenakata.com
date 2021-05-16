import React,{useContext} from 'react'
import {ContextShare} from '../ContextShare'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyle from './productStyles'


function Item({item}) {
    const classes = useStyle();
    const {handleAddToCart} = useContext(ContextShare);
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={item.media.source} title={item.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {item.price.formatted_with_symbol}
                    </Typography>

                </div>
                <Typography dangerouslySetInnerHTML ={{ __html:item.description}} variant="body2" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={()=>handleAddToCart(item.id,1)}>
                    <AddShoppingCart/>
                </IconButton>

            </CardActions>

        </Card>
    )
}

export default Item
