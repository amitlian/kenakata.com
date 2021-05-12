import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyle from '../Nav/Nav_style'
import logo from '../Nav/logo.png'

function Nav() {
    const classes = useStyle();
    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="KenaKata" width="150px" className={classes.image}/>
                </Typography>
                <div className={classes.grow}/>
                <div>
                    <IconButton aria-label="show cart items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                    <ShoppingCart/>
                            </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
            
        </>
    )
}

export default Nav
