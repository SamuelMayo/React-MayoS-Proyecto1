import React, {useState,createContext} from 'react'
import { useEffect } from 'react'


export const contextCart=createContext()
const {Provider} = contextCart

const CartContext = ({children}) => {

    const [cartList, setCartlist]= useState([])
    const [totalProducts, setTotalProducts]=useState(0)

    const quantityTotalProducts=()=>{
        let count=0

        cartList.forEach(product=>{
            count+=product.quantity;
        })
        setTotalProducts(count)
    }


    useEffect(()=>{
        quantityTotalProducts();
    } , [cartList] )
    
    const addProducts=(product)=>{
        if(isInCart(product.id)){

            const aux= [...cartList]
            const found = aux.find(prod=>prod.id===product.id)
            found.quantity+= product.quantity
            
            setCartlist(aux)
        }else{

            setCartlist([...cartList, product])
        }
    }
    
    const removeItem=(product)=>{

        let aux =[...cartList]
        const found= aux.find(aux=> aux.id === product.id )
        aux= aux.filter(product=>product.id !== found.id)

        setCartlist(aux)
    }

    const clear= ()=>{

        setCartlist([])

    }

    const isInCart=(id)=>{

        cartList.some(product=>product.id===id)
    }

    const [totalPrice, setTotalPrice] =useState(0)

    const calcPrice= ()=>{
        let count = 0 
        cartList.forEach(product => {
        count += product.price*product.quantity
        });
        setTotalPrice(count)
    }

    useEffect(()=>{
        calcPrice()
    }, [cartList])


    return (
    <Provider value={{addProducts,cartList, totalProducts,removeItem,clear, totalPrice}}>
        {children}
    </Provider>
    )
}

export default CartContext