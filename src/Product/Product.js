import React from 'react'
import {Grid} from '@material-ui/core'
import Item from '../Product/Item'
import useStyle from '../Product/Product_style'

const products = [
        {id:1,name:'Burger',description:'Premium',price:'$5', image:'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4.jpg'},
        {id:2,name:'pizza',description:'Fountain Cheesee',price:'$10',image:'https://media.istockphoto.com/photos/tasty-pepperoni-pizza-and-cooking-ingredients-tomatoes-basil-on-black-picture-id1083487948?k=6&m=1083487948&s=612x612&w=0&h=lK-mtDHXA4aQecZlU-KJuAlN9Yjgn3vmV2zz5MMN7e4='},
]

function Product() {
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
