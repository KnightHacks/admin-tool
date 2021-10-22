import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Sponsor } from './sponsor';

interface FormControlProps {
  sponsor: Sponsor;
  open: boolean;
  handleClose: () => void;
  handleSubmission: () => void;
}

export default function FormDialog({
  sponsor,
  open = false,
  handleClose,
  handleSubmission,
}: FormControlProps) {
  // TODO: form state to sponsorPage or to sponsorTable
  // TODO: add this component in there
  // TODO: open and close form from button on page and from modal respectively
  //const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [linkedIn, setLinkedIn] = React.useState('');
  const [tier, setTier] = React.useState('');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`${sponsor ? 'Edit' : 'New'} Sponsor`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="sponsorName"
          label="Sponsor Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={sponsor ? sponsor.name : ''}
        />
        <TextField
          autoFocus
          id="sponsorDescription"
          label="Sponsor Description"
          type="text"
          fullWidth
          multiline
          variant="standard"
          defaultValue={sponsor ? sponsor.description : ''}
        />
        <TextField
          autoFocus
          id="sponsorLinkedIn"
          label="LinkedIn"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={sponsor ? sponsor.linkedIn : ''}
        />
        <TextField
          autoFocus
          id="sponsorTier"
          label="Sponsorship Tier"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={sponsor ? sponsor.tier : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmission}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
