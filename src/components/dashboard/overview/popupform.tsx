import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { setItem, getItem } from "@/util/useLocalStorage";
import { useRouter } from 'next/navigation';

type PopupFormProps = {
  open: boolean;
  handleClose: () => void;
  onDataUpdate: () => void;
};

export default function PopupForm({ open, handleClose, onDataUpdate }: PopupFormProps) {
  const [title, setTitle] = React.useState<string>('');
  const [alignment, setAlignment] = React.useState<string | null>('option1');
  const [condition, setCondition] = React.useState<string | null>('good');
  const [location, setLocation] = React.useState<string | null>('urban');
  const [address, setAddress] = React.useState<string>('');
  const [bedrooms, setBedrooms] = React.useState<string>('');
  const [bathrooms, setBathrooms] = React.useState<string>('');
  const [sqft, setSqft] = React.useState<string>('');
  const [age, setAge] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false); // Spinner state
  const router = useRouter();
  
  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const handleConditionChange = (
    event: React.MouseEvent<HTMLElement>,
    newCondition: string | null
  ) => {
    setCondition(newCondition);
  };

  const handleLocationChange = (
    event: React.MouseEvent<HTMLElement>,
    newLocation: string | null
  ) => {
    setLocation(newLocation);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
  };

  const handleSave = async () => {
    setLoading(true); // Show spinner
    setTimeout(async () => {
      let imagePath = '';

      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        // Upload the image to the backend
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          imagePath = result.filePath; // Get the file path from the server response
        } else {
          console.error('Failed to upload the image');
        }
      }

      const formDataObj = {
        title,
        address,
        bedrooms,
        bathrooms,
        sqft,
        age,
        occupant: alignment,
        condition,
        location,
        image: imagePath, // Store the image path
      };

      // Get existing data from localStorage
      const existingData = getItem('appraisalData') || {};

      // Add the new formData as a new entry using the title as the key
      const updatedData = { ...existingData, [title]: formDataObj };

      // Save the updated data back to localStorage
      setItem('appraisalData', updatedData);

      // Notify the parent component of the data update
      onDataUpdate();

      // Close the form
      setLoading(false); // Hide spinner after 5 seconds

      handleClose();
      router.push('/dashboard/project');
    }, 5000); // Simulate a delay of 5 seconds
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Appraisal Info</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="dense"
          id="bedrooms"
          label="# Bedrooms"
          type="text"
          fullWidth
          variant="standard"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <TextField
          margin="dense"
          id="bathrooms"
          label="# Bathrooms"
          type="text"
          fullWidth
          variant="standard"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <TextField
          margin="dense"
          id="sqft"
          label="SQFT"
          type="text"
          fullWidth
          variant="standard"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
        />
        <TextField
          margin="dense"
          id="age"
          label="Age of property"
          type="text"
          fullWidth
          variant="standard"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        
        <Typography variant="body1" sx={{ marginTop: 4, marginBottom: 1 }}>
          Upload Image:
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <Typography variant="body1" sx={{ marginTop: 4, marginBottom: 1 }}>
          Occupant:
        </Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleToggleChange}
          aria-label="option selection"
          sx={{ marginTop: 1 }}
        >
          <ToggleButton value="option1" aria-label="option 1">
            Owner
          </ToggleButton>
          <ToggleButton value="option2" aria-label="option 2">
            Tenant
          </ToggleButton>
          <ToggleButton value="option3" aria-label="option 3">
            Vacant
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Condition of the House
        </Typography>
        <ToggleButtonGroup
          value={condition}
          exclusive
          onChange={handleConditionChange}
          aria-label="house condition"
          sx={{ marginTop: 1 }}
        >
          <ToggleButton value="excellent" aria-label="excellent condition">
            Excellent
          </ToggleButton>
          <ToggleButton value="good" aria-label="good condition">
            Good
          </ToggleButton>
          <ToggleButton value="fair" aria-label="fair condition">
            Fair
          </ToggleButton>
          <ToggleButton value="poor" aria-label="poor condition">
            Poor
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Location Type
        </Typography>
        <ToggleButtonGroup
          value={location}
          exclusive
          onChange={handleLocationChange}
          aria-label="location type"
          sx={{ marginTop: 1 }}
        >
          <ToggleButton value="urban" aria-label="urban location">
            Urban
          </ToggleButton>
          <ToggleButton value="suburban" aria-label="suburban location">
            Suburban
          </ToggleButton>
          <ToggleButton value="rural" aria-label="rural location">
            Rural
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
