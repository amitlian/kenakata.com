import React,{useContext} from 'react'
import {ContextShare} from '../ContextShare'
import {Grid} from '@material-ui/core'
import Item from '../Product/Item'
import useStyle from '../Product/Product_style'

function Product() {
    const {products} = useContext(ContextShare)
    const classes = useStyle();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((items)=>(
                    <Grid item key={items.id} xs={12} sm={6} md={4} lg={3} >
                        <Item item={items}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Product
