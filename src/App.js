import React, {Fragment, useState} from 'react';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {
	const [isCartVisible, setCartIsVisible] = useState(false);

	const showCartHandler = ()=>{
		setCartIsVisible(true);
	}
	const hideCartHandler = ()=>{
		setCartIsVisible(false);
	}

	return (
		<CartProvider>
			{isCartVisible && <Cart onClose={ hideCartHandler }/>}
			<Header onShowCart={ showCartHandler } />
			<main>
				<Meals/>
				
			</main>
		</CartProvider>
	);
}

export default App;
