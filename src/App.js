import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ItemPage from './pages/ItemPage';
import Cart from './pages/Cart';
import Address from './pages/Address';

const App = () => {
	return (
		<>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<ItemPage />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/address" element={<Address />} />
				</Routes>
			</div>
		</>
	);
};

export default App;
