import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import React from 'react';
import '../pages/itempage.css';

const ProductCard = ({ element }) => {
	return (
		<Card
			sx={{
				width: '250px',
				margin: '10px',
				height: '300px',
			}}
		>
			<CardActionArea>
				<img
					component="img"
					width="170"
					height="160"
					src={element.imageURL}
					alt="bag"
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="p"
						component="div"
						sx={{ fontSize: '20px', marginTop: '20px' }}
					>
						{element.name}
					</Typography>
					<Typography
						gutterBottom
						variant="p"
						sx={{ fontSize: '15px' }}
						component="div"
					>
						Rs. {element.price}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
