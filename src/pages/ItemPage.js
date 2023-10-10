import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './itempage.css';
import { Button } from '@mui/material';
import { IconContext } from 'react-icons';
import { BsArrowLeftCircle, BsHeart } from 'react-icons/bs';
import { BackendContext } from '../context/context';

const ItemPage = ({ element }) => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	const { baseUrl } = useContext(BackendContext);
	// console.log('element: ', element);
	useEffect(() => {
		fetch(`${baseUrl}api/v1/products/${id}`, {})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setData(response);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);
	useEffect(() => {
		console.log('data', data);
	}, [data]);

	const addItemHandler = () => {
		const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
		const isProductExist = cart.find((item) => item.id === id);
		if (isProductExist) {
			const updatedCart = cart.map((item) => {
				if (item.id === id) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}
				return item;
			});
			sessionStorage.setItem('cart', JSON.stringify(updatedCart));
		} else {
			sessionStorage.setItem(
				'cart',
				JSON.stringify([...cart, { ...data, quantity: 1 }]),
			);
		}
	};
	return (
		<>
			<div className="back">
				<Link to="/products">
					<BsArrowLeftCircle />
				</Link>
			</div>
			<div className="productCard ">
				<div className=" card  ">
					<div className="image-container">
						<img
							className="aspect-square"
							src={data.imageURL}
							alt={'Unsupported image.'}
							// height="500"
							// width="500"
						/>
						<IconContext.Provider
							value={{
								color: '#000',
								size: '1em',
								className: 'global-class-name heart-icon',
							}}
						>
							<BsHeart />
						</IconContext.Provider>
					</div>
					<div className=" details-cont">
						<div className="heading-cont">
							<h1 className="title">{data.name}</h1>
							<h1 className="desc">{data.description}</h1>
						</div>
						<div className="specifications-cont">
							<div className="grid-cont">
								<div className="category-cont">
									<p>Category</p>
									<hr />
									<h5>{data.category}</h5>
								</div>

								<div className="rating-cont">
									<p>Manufacturer</p>
									<hr />
									<h5>{data.manufacturer}</h5>
								</div>
							</div>
						</div>
						<div className="price-cont">
							<h3>Price - Rs. {data.price}</h3>
						</div>
						<br />
						<div className=" button-cont btn">
							<Button
								sx={{ margin: '10px', bgcolor: 'green' }}
								className=" add-btn "
								variant="contained"
								href="/cart"
								onClick={addItemHandler}
							>
								Add To Cart
							</Button>

							<Button
								sx={{ margin: '10px', bgcolor: '#012a4a' }}
								className=" buy-btn"
								variant="contained"
								href="/address"
							>
								Buy Now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemPage;
