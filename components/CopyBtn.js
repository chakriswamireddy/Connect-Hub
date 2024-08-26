import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ImCopy } from 'react-icons/im';
import { Alert, Slide } from '@mui/material';
import { RiUserSharedFill } from "react-icons/ri";
import React, { useState } from 'react';

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

function CopyBtn({roomId}) {
  const [showNote, setShowNote] = useState(true);
  const [tooltipTitle, setTooltipTitle] = useState("Copy Room ID");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowNote(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setTimeout(()=>{
      setTooltipTitle((prev) => "Copy Room Id")
      
    },1500)
    setShowNote(false)
    
    setTooltipTitle( (prev) => "Copied")
    
  };

  const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
    '& .MuiSnackbarContent-root': {
      backgroundColor: 'rgb(96 165 250)',  // Custom background color
      color: '#070F31',            // Custom text color
      boxShadow: theme.shadows[3],
      marginBottom : '100px',
      paddingBottom:'10px',
      paddingTop :'20px',
      borderRadius:'20px',
    },
  }));

  const CustomIconButton = styled(IconButton)({
    color: '#070F31',  // Custom icon color,
    fontWeight:800,
  });

  const CustomMessage = styled(Typography)({
    fontSize: '16px',   // Custom font size
    // color: 'rgb(251 146 60)',   // Custom text color (yellow)
    paddingRight: '8px', // Padding between text and icon
  });

  const action = (
    <React.Fragment>
      <Tooltip title={tooltipTitle}>
        <CustomIconButton
          size="small"
          aria-label="copy"
          onClick={handleCopy}
        >
          <ImCopy fontSize="medium" />
        </CustomIconButton>
      </Tooltip>
    </React.Fragment>
  );

  return (
    <div>
    {/* {tooltipTitle} */}
    <CustomSnackbar
      open={showNote}
      autoHideDuration={10000}
      onClose={handleClose}
      message={
        <CustomMessage>
          {/* <RiUserSharedFill /> */}
          Share this Room ID to invite others to the meeting. <br />
           <Typography textAlign='end' marginRight='20px' fontStyle='italic' fontWeight={600} color='#070F31'> {roomId} </Typography> 
        </CustomMessage>
      }
      action={action}
      TransitionComponent={SlideUpTransition}
    />
    <Snackbar open={tooltipTitle==='Copied' } autoHideDuration={400}>
  <Alert
    // onClose={}
    severity="success"
    variant="filled"
    
  >
    Copied Successfully
  </Alert>
</Snackbar>
    </div>
  );
}

export default CopyBtn;
