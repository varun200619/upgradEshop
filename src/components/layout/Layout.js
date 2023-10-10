import { SessionContext } from '../../context/context';
import { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
const Layout = ({ children }) => {
	const [state, setState] = useState({
		username: '',
		email: '',
		isAdmin: false,
	});
	useEffect(() => {
		setState({
			username: sessionStorage.getItem('name') || 'Guest',
			email: sessionStorage.getItem('email') || '',
			isAdmin: sessionStorage.getItem('isAdmin') || false,
		});
	}, []);
	return (
		<div>
			<SessionContext.Provider
				value={{
					username: state.username,
					email: state.email,
					isAdmin: state.isAdmin,
					setState: setState,
				}}
			>
				{/* <Navbar /> */}
				<Header />

				<div
					style={{
						textAlign: 'center',
						width: '100%',
						height: '100%',
						margin: 'auto',
					}}
				>
					{children}
				</div>
				<div>
					<Footer />
				</div>
			</SessionContext.Provider>
		</div>
	);
};

export default Layout;
