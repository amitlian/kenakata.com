import {useState,createContext} from 'react';
import {commerce} from '../src/lib/commerce'

export const ContextShare = createContext();

function ContextShareProvider(props){
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
  
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
            console.log(error)
        }
    }



    const value = {products,cart,checkoutToken,fetchProduct,fetchCart,handleAddToCart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart,generateToken}
    return(
        <ContextShare.Provider value={value}>
            {props.children}
        </ContextShare.Provider>
    )
}

export default ContextShareProvider;