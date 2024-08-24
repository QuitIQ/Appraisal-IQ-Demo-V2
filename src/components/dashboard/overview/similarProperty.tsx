import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import type { SxProps } from '@mui/material/styles';

export interface PropertyProps {
    sx?: SxProps;
    imageFile: string;
    title: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    age: number,
    sqft: number
  }

export function SimilarProperty({ sx, imageFile, title, price, bedrooms, bathrooms, age, sqft }: PropertyProps) {
  return (
    <Card sx={sx}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`/assets/${imageFile}`}
          alt="Home Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: '20px' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ marginBottom: '5px' }}>
            <span style={{fontWeight: "bold"}}>Price: </span>
            ${price}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ marginBottom: '5px' }}>
            <span style={{fontWeight: "bold"}}># of Bedrooms: </span>
            {bedrooms}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ marginBottom: '5px' }}>
            <span style={{fontWeight: "bold"}}># of Bathrooms: </span>
            {bathrooms}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ marginBottom: '5px' }}>
            <span style={{fontWeight: "bold"}}>Age: </span>
            {age}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <span style={{fontWeight: "bold"}}>Square Feet: </span>
            {sqft}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}