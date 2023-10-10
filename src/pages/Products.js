import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import { BackendContext } from '../context/context';
// import { categories } from '../lib/index';s
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BiSearchAlt } from 'react-icons/bi';
const Products = () => {
	const { baseUrl } = useContext(BackendContext);
	const [state, setState] = useState({
		categories: [],
		products: [],
	});
	const [filter, setFilter] = useState({
		category: '',
		direction: 'asc',
		sortBy: '',
		name: '',
	});
	const getApi = async () => {
		const response = await fetch(`${baseUrl}api/v1/products`);
		// console.log(response);
		const data = await response.json();
		setState((ref) => ({ ...ref, products: data }));
	};
	useEffect(() => {
		console.log(state.products);
	}, [state.products]);
	useEffect(() => {
		fetch(`${baseUrl}api/v1/products/categories`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('categories; ', data);
				setState((ref) => {
					return { ...ref, categories: data };
				});
			})
			.catch((err) => {
				console.log(err);
			});
		getApi();
	}, []);

	const handleFilterChange = (event) => {
		const { name, value } = event.target;
		setFilter((ref) => ({ ...ref, [name]: value }));
	};
	const handleFilter = () => {
		const { category, name, sortBy, direction } = filter;
		fetch(`${baseUrl}api/v1/products?category=${category}&name=${name}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setState((ref) => ({ ...ref, products: data }));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleSort = (sort, dir) => {
		const { category, name } = filter;
		fetch(
			`${baseUrl}api/v1/products?category=${category}&name=${name}&sortBy=${sort}&direction=${dir}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			},
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setState((ref) => ({ ...ref, products: data }));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			{/* <Header />
			Product
			<br />
			<br /> */}

			<div className="content-container">
				<div className="sub-header-container">
					<div className="search-container">
						<ButtonGroup
							variant="outlined"
							aria-label="outlined button group"
							className="btn-group"
						>
							<Button
								className="tab-btn"
								onClick={() => handleSort('_id', 'desc')}
							>
								Default
							</Button>
							<Button
								className="tab-btn"
								onClick={() =>
									handleSort('availableItems', 'asc')
								}
							>
								Available Items
							</Button>

							<Button
								className="tab-btn"
								onClick={() => {
									handleSort('price', 'desc');
								}}
							>
								Price High to Low
							</Button>
							<Button
								className="tab-btn"
								onClick={() => {
									handleSort('price', 'asc');
								}}
							>
								Price Low to High
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className="body-container">
					<div className="filter-section">
						<h3>Filter By</h3>
						<Box sx={{ margin: 'auto' }}>
							<FormControl sx={{ marginTop: '10px' }}>
								<TextField
									sx={{
										width: '250px',
										marginLeft: '16px',
										marginBottom: '10px',
									}}
									name="name"
									value={filter.name}
									placeholder="Search"
									onChange={handleFilterChange}
								/>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel
									id="demo-simple-select-label"
									sx={{ marginLeft: '16px' }}
								>
									Categories
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Categories"
									sx={{ width: '100%', marginLeft: '16px' }}
									name="category"
									value={filter.category}
									onChange={handleFilterChange}
								>
									{state.categories?.map(
										(element, elemId) => {
											return (
												<MenuItem
													value={element}
													key={elemId}
												>
													{element}
												</MenuItem>
											);
										},
									)}
								</Select>
							</FormControl>
							<FormControl>
								<div className="btn">
									<Button
										sx={{
											width: 'fit-content',
											marginLeft: '16px',
										}}
										className="button"
										variant="contained"
										onClick={handleFilter}
									>
										Apply
									</Button>

									<Button
										sx={{
											width: 'fit-content',

											marginLeft: '16px',
										}}
										className="button"
										variant="contained"
										onClick={() =>
											setFilter({
												name: '',
												category: '',
											})
										}
									>
										Clear
									</Button>
								</div>
							</FormControl>
						</Box>
					</div>
					<div className="content-section">
						{state.products?.map((elem, elemId) => {
							return (
								<Link to={`/products/${elem._id}`} key={elemId}>
									<ProductCard element={elem} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
