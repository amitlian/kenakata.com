import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyle from '../Nav/Nav_style'
import logo from '../Nav/logo.png'
import {Link} from 'react-router-dom';

function Nav({totalItem}) {
    const classes = useStyle();
    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit">
                    <Link to="/">
                         <img src={logo} alt="KenaKata" width="150px" className={classes.image}/> 
                    </Link>
                </Typography>
                <div className={classes.grow}/>
                <div>
                    <Link to="/cart">
                        <IconButton aria-label="show cart items" color="inherit">
                            <Badge badgeContent={totalItem} color="secondary">   
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
            
        </>
    )
}

export default Nav
