import React, {useContext, useState} from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
export default function Cart(props) {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }
    const orderHandler = () => {
        setIsCheckOut(true);
    }
    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true);
        const response = await fetch('https://react-meals-cab23-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmiting(false);
        setDidSubmit(true);
    }
    const cartItems = <ul className={classes['cart-items']}>
            {cartCtx.items.map(item=>
                <CartItem key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price} 
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}/>
            )}
        </ul>;

    const totalPrice = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;  
    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckOut && modalActions}
        </React.Fragment>
    )
    const isSubmitingModalContent = <p>Sending order data</p>;
    const didSubmitContent = <p>The order is sent</p>;
    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {didSubmit && didSubmitContent}
        </Modal>
    )
}
