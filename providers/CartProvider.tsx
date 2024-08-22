import { CartItem , Tables} from "@/app/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import {randomUUID} from 'expo-crypto';
import { useInsertOrder } from "@/app/api/orders";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

type Product = Tables<'products'>;

type CartType={
    items: CartItem[],
    addItem:(product:Product, size: CartItem['size'])=> void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: ()=>void;

};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkout: ()=>{},
});



const CartProvider = ({children}: PropsWithChildren) =>{
    const[items,setItems] = useState<CartItem[]>([]);
    
    const {mutate: insertOrder} = useInsertOrder();
    const router = useRouter();
    const addItem = (product: Product, size: CartItem['size']) =>{
        const existingItems = items.find((item) => item.product == product && item.size == size );

        if(existingItems){
            updateQuantity(existingItems.id,1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(), // generate
            product,
            product_id: product.id,
            size,
            quantity:1,
        } ;

        setItems([newCartItem, ...items])
    };


    //update quantity
const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
        items.map((item) => 
         item.id != itemId 
        ? item : { ...item, quantity: item.quantity+ amount}
    ).filter((item) => item.quantity>0));
};

const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

const clearCart = () => {
    setItems([]);
}

const checkout =()=>{
    console.warn('checkout');
    insertOrder({total},{onSuccess:(data)=>{
        clearCart();
        router.push(`/(user)/orders/${data.id}`);
    }});
}

console.log(items);

    return(
        <CartContext.Provider value={{items,addItem, updateQuantity, total, checkout}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart =()=>useContext(CartContext);