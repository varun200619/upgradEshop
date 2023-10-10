import React, { useEffect, useState } from 'react';
import './cart.css';
import { BsArrowLeft } from 'react-icons/bs';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars-2';
import { Button } from '@mui/material';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Cart = () => {
	// const [amount, setAmount] = useState(0);

	const [cart, setCart] = useState(
		JSON.parse(sessionStorage.getItem('cart')) || [],
	);
	const handleDecre = (id) => {
		const updatedCart = cart.map((item) => {
			if (item._id === id && item.quantity > 1) {
				item.quantity -= 1;
			}
			return item;
		});
		setCart(updatedCart);
		sessionStorage.setItem('cart', JSON.stringify(updatedCart));
	};
	// const handleTotal = () => {
	// 	let total = 0;
	// 	cart.map((item) => (total = item.price + item.price));
	// 	setAmount(total);
	// };
	// useEffect(() => {
	// 	handleTotal();
	// }, [cart]);
	const handleIncre = (id) => {
		const updatedCart = cart.map((item) => {
			if (item._id === id) {
				item.quantity += 1;
			}
			return item;
		});
		setCart(updatedCart);
		sessionStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleDelete = (id) => {
		const updatedCart = cart.filter((item) => item._id !== id);
		setCart(updatedCart);
		sessionStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	return (
		<>
			<header className="sub-header-cont">
				<div className="continue-shopping">
					<Link to="/products">
						<p>
							<BsArrowLeft /> Continue shopping
						</p>
					</Link>
				</div>

				<div className="icon-cart">
					<IconContext.Provider
						value={{
							className: 'global-class-name icon-style',
							size: '1.5em',
							color: '#1a759f',
						}}
					>
						<FaShoppingCart />
					</IconContext.Provider>
					<p className="total-products">{cart.length}</p>
				</div>
			</header>

			<section className="main-cart-section">
				<h1 className="cart-heading">Shopping Cart</h1>
				<p className="total-items">
					You have{' '}
					<span className="total-items-count">{cart.length}</span>{' '}
					items in the shopping cart
				</p>

				{cart.length === 0 ? (
					<div>Cart is Empty</div>
				) : (
					<div className="cart-items">
						<div className="cart-items-container">
							<Scrollbars>
								{cart.map((elem) => {
									const {
										_id: id,
										name,
										imageURL,
										category,
										price,
										quantity,
									} = elem;

									return (
										<div className="items-info" key={name}>
											<div className="product-img">
												<img
													src={imageURL}
													alt="productImg"
												/>
											</div>

											<div className="title">
												<h2>{name}</h2>
												<p>{category}</p>
											</div>

											<div className="add-quantity">
												<Button
													className="minus-btn"
													disabled={quantity === 1}
													onClick={() =>
														handleDecre(id)
													}
												>
													<AiOutlineMinus />
												</Button>
												<input
													type="text"
													className="textField"
													value={quantity}
													readOnly
												/>
												<Button
													className="plus-btn"
													onClick={() =>
														handleIncre(id)
													}
												>
													<AiOutlinePlus />
												</Button>
											</div>

											<div className="price">
												<h3>
													Rs{' '}
													{(price * quantity).toFixed(
														2,
													)}
												</h3>
											</div>

											<div className="remove-item">
												<Button
													onClick={() =>
														handleDelete(id)
													}
												>
													<IconContext.Provider
														value={{
															color: 'red',
															size: '1.3em',
														}}
													>
														<FaTrash />
													</IconContext.Provider>
												</Button>
											</div>
										</div>
									);
								})}
							</Scrollbars>
						</div>
					</div>
				)}
				<div className="total-container">
					<Button
						variant="contained"
						sx={{
							bgcolor: '#012a4a',
							padding: '10px',
							margin: '10px 20px',
							fontWeight: 'bold',
						}}
						href="/address"
					>
						Buy Now
					</Button>
					<div className="total-amount">
						<h3>Total amount : </h3>
						<p>
							Rs.
							{cart
								.reduce(
									(total, item) =>
										total + item.price * item.quantity,
									0,
								)
								.toFixed(2)}
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Cart;
