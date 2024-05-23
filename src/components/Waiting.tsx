import React from 'react';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

export default function Waiting(props: { open: boolean }) {
  return (
    <Backdrop
      open={props.open}
      sx={{
        zIndex: 10000,
        color: '#fff',
      }}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}
