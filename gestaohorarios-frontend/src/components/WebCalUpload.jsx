import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { processWebCal } from '../utils/webCalProcessing';
import { RRule } from 'rrule';

const WebCalUpload = () => {
  const [uri, setUri] = useState('');
  console.log('Uri:', uri)
  //const [events, setEvents] = useState([]);  
 
  const handleChange = async (event) => {
    setUri(event.target.value);
    console.log('On Change:', uri)
  }

  const fetchCalendar = async (uri) => {

    let httpsUrl = uri.replace('webcal://fenix.iscte-iul.pt', '');
    console.log('httpsUrl em fetchWebCalData:',  httpsUrl);
  
    const response = await fetch(`/icalendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetUrl: httpsUrl }),
        timeout: 10000,
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching the file: ${response.statusText}`);
      }
      const data = await response.text()
      //console.log('DADOS DO CALENDARIO:', data );
      //return new File([data], 'calendar.ics', { type: 'text/calendar' });
    };

  /* const getFilenameFromUrl = (url) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];

    if (filename.endsWith('.ics')) {
    return filename;
    } else {
    console.error('Invalid URL: File should be an ICS file');
    return null;
  }
} */

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = await fetchCalendar(uri);
    //processWebCal(file);
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                Web Calendar Upload
            </Typography>
            
            <Box sx={{
                width: 650,
                maxWidth: '95%',
            }}
            >
            <TextField
                label="Web Calendar URL"
                placeholder='Enter web calendar URL'
                variant="outlined"
                size="small"
                fullWidth
                value={uri}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Send
                </Button>
            </Box>
        </Box>
  );
}
  
export default WebCalUpload;

