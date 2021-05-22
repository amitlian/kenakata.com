import {useState,createContext} from 'react';
import {commerce} from '../src/lib/commerce'
import{useHistory} from 'react-router-dom'

export const ContextShare = createContext();

function ContextShareProvider(props){
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [order, setOrder] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [isFiniahed, setIsFiniahed] = useState(false)
    const history = useHistory()
  
    const fetchProduct = async()=>{
        const {data} = await commerce.products.list();
        setProducts(data)
    }
  
    const fetchCart = async()=>{
      const itemz = await commerce.cart.retrieve();
      setCart(itemz)
    }
  
    const handleAddToCart = async(productId,quantity)=>{
      const {cart} = await commerce.cart.add(productId,quantity);
      setCart(cart)
    }

    const handleUpdateCartQty = async(productId,quantity)=>{
        const {cart} = await commerce.cart.update(productId,{quantity});
        setCart(cart)
      }

    const handleRemoveFromCart = async(productId)=>{
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart)
    }

    const handleEmptyCart = async()=>{
        const {cart} = await commerce.cart.empty();
        setCart(cart)
    }

    const generateToken = async()=>{
        try {
            const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
            console.log("Token",token)
            setCheckoutToken(token)
        } catch (error) {
            history.push('/')
        }
    }

    const refreshCart = async()=>{
        const newCart = await commerce.cart.refresh();
        setCart(newCart)
    }

    const handleCaptureCheckout = async(checkoutTokenId,newOrder)=>{
        console.log("Get the customer info",checkoutTokenId,newOrder)
        try {
            console.log("Get the customer info First")
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
            console.log("Incoming Order",incomingOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            console.log("Get the customer info Error",error.data.error.message)
            setErrorMsg(error.data.error.message)
        }

    }

    const timeout = ()=>{
        setTimeout(()=>{
            setIsFiniahed(true)
        },3000);
    }


    const value = {products,cart,checkoutToken,order,errorMsg,isFiniahed,fetchProduct,fetchCart,handleAddToCart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart,generateToken,refreshCart,handleCaptureCheckout,timeout}
    return(
        <ContextShare.Provider value={value}>
            {props.children}
        </ContextShare.Provider>
    )
}

export default ContextShareProvider;