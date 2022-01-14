import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Icon } from '@mui/material';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function Sidebar() {
  return (
    <Box
      sx={{ width: '15.5vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 2, backgroundColor: 'white', paddingLeft: '-3vw',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Box
        sx={{ paddingTop: '190px', width: '80%' }}
      >
        <ListItem 
           >
          <HomeIcon 
           sx={{ marginRight: '20px' }}
           color="primary"
          />
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 4" />
        </ListItem>
      </Box>
      <Box 
        sx={{ marginBottom: '100px' }}
      >
        <Button variant="borderBtn" size="small" color="primary" startIcon={<SettingsIcon />}>
          Paramètres
        </Button>
      </Box>
    </Box>
  );
}