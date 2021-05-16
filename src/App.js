import './App.css';
import Nav from '../src/Nav/Nav'
import React,{useEffect,useContext} from 'react';
import {ContextShare} from '../src/ContextShare'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Product from '../src/Product/Product'
import {commerce} from '../src/lib/commerce'
import Cart from '../src/Cart/Cart'
import Checkout from '../src/Checkout/Checkout'

function App() {

  const{fetchCart,fetchProduct} = useContext(ContextShare);
  const {cart} = useContext(ContextShare);

  useEffect(() => {
    fetchProduct();
    fetchCart();
  },[])

  return (
    <Router>
      <Nav totalItem = {cart.total_items}/>
      <Switch>
          <Route exact path="/">
              <Product/>
          </Route>
          <Route path="/cart">
            <Cart cart={cart}/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
      </Switch>
    </Router>

  );
}

export default App;
