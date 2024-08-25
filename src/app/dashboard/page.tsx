"use client";
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { setItem, getItem } from "@/util/useLocalStorage";

import AppraisalCard from "@/components/dashboard/overview/appraisalcard"
import PopupForm from "@/components/dashboard/overview/popupform";

const cardData = {
    "123 Main St": {
    projectTitle:"123 Main St",
    address: "123 Main St, Los Angeles, CA 90012",
    image: "/assets/house2.jpg"
  },
  "456 Elm St": {
    projectTitle:"456 Elm St",
    address: "456 Elm St, Chicago, IL 60614",
    image: "/assets/house3.jpg"
  }
};


export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [storedMap, setStoredMap] = React.useState<Record<string, any> | null>(null);

  // Load the initial data from local storage when the component mounts
  React.useEffect(() => {
    const data = getItem('appraisalData');
    if (data) {
      setStoredMap(data);
    }
    else{
      setItem('appraisalData', cardData);
      setStoredMap(cardData);
    }
  }, []);

  // Function to update storedMap after PopupForm writes to local storage
  const handleDataUpdate = () => {
    const updatedData = getItem('appraisalData');
    setStoredMap(updatedData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4">Projects</Typography>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', zIndex: 1, paddingBottom: "20px"}}>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>

      <Grid container spacing={3}>
        {storedMap && Object.entries(storedMap).map(([key, value], index) => (
          <Grid key={index} lg={3} sm={6} xs={12}>
            <AppraisalCard title={key} address={value.address} image={value.image} />
          </Grid>
        ))}
      </Grid>

      {/* Popup Form Component with data update callback */}
      <PopupForm open={open} handleClose={handleClose} onDataUpdate={handleDataUpdate} />
    </div>
  );
}
