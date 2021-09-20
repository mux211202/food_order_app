import CartContext from "./cart-context";
import React, { useReducer } from 'react'

const defaultCartState = {
    items:[],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const item = action.item;
        const updatedTotalAmount = state.totalAmount + item.price * item.amount;

        const existingCatItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const  existingCatItem = state.items[existingCatItemIndex];
        let updatedItems;
        if(existingCatItem){
            const updatedItem = {
                ...existingCatItem, 
                amount: existingCatItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCatItemIndex] = updatedItem;
        } else{
            updatedItems = state.items.concat(item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if( action.type === 'REMOVE' ) {
        const existingCatItemIndex = state.items.findIndex(item => item.id === action.id);
        const  existingCatItem = state.items[existingCatItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCatItem.price;
        let updatedItems;
        if( existingCatItem.amount === 1 ) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }else{
            const updatedItem = {...existingCatItem, amount: existingCatItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCatItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
        
    }
    return defaultCartState;
}
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler 
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;