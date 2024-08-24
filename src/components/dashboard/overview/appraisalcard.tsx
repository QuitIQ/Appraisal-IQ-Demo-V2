"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { setItem, getItem, removeItem, clearStorage } from "@/util/useLocalStorage";
import Button from '@mui/material/Button';
import {paths} from '@/paths'

type AppraisalCardProps = {
  title: string;
  address: string;
  image: string;
};

export default function AppraisalCard({ title, address, image }: AppraisalCardProps) {
    const router = useRouter();
    const redirectToPage = () => {
        setItem("selected", title)
        router.push('/dashboard/project');
      };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={redirectToPage}>
        <CardMedia
          sx={{ height: 145 }}
          image={image}
          title={address}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {address.split(",")[0]} {/* Show only the first part of the address */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {address.split(",").slice(1).join(", ")} {/* Show the rest of the address */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
