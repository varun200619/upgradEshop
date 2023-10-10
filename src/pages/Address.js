import React, { Fragment, useContext, useEffect, useState } from 'react';
import './form.css';
import { Link } from 'react-router-dom';
import { validateSignup } from '../utils/helper';
import { BackendContext } from '../context/context';
import { Button, TextField } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs';

const Address = () => {
	const { baseUrl } = useContext(BackendContext);
	console.log(baseUrl);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		contactNumber: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(`name = ${name}`);
		console.log(`value = ${value}`);

		setUser((ref) => ({ ...ref, [name]: value }));
	};
	useEffect(() => {
		console.log('user =', user);
	}, [user]);

	const [allArray, setAllArray] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName, email, password, contactNumber } = user;
		const isValid = validateSignup(user);
		if (!isValid) {
			console.log('Try again');
			return;
		}

		fetch(`${baseUrl}api/v1/users`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			contactNumber: '',
		});
	};

	return (
		<Fragment>
			<p>
				<Link to="/products">
					<BsArrowLeft />
					Go Back{' '}
				</Link>
			</p>
			<div className="form-container">
				<h2>Get your Item Delivered!</h2>

				<form onSubmit={handleSubmit}>
					<div className="name-field-container">
						<div className="name-field">
							<TextField
								type="text"
								placeholder="Firstname"
								id="firstname"
								name="firstName"
								value={user.firstName}
								onChange={handleChange}
								className="name-field text-field"
							/>
							<TextField
								type="text"
								placeholder="Lastname"
								id="lastname"
								name="lastName"
								value={user.lastName}
								onChange={handleChange}
								className="name-field text-field"
							/>
						</div>
					</div>
					<div className="data-field-container">
						<div className="data-field">
							<TextField
								type="email"
								placeholder="Email"
								id="email"
								name="email"
								value={user.email}
								onChange={handleChange}
								className="text-field"
							/>

							<TextField
								type="text"
								placeholder="Contact"
								id="contact"
								name="contactNumber"
								value={user.contactNumber}
								onChange={handleChange}
								className="text-field"
							/>
							<textarea
								type="text"
								placeholder="Address"
								id="address"
								name="address"
								value={user.address}
								onChange={handleChange}
								// className="text-field"
								cols={30}
								rows={5}
							/>
						</div>
					</div>
					<div className="btn">
						<Button
							className="button"
							variant="contained"
							type="submit"
							sx={{ width: '100%' }}
						>
							Checkout
						</Button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};
export default Address;
