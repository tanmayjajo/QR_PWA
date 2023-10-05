import React from 'react';
import { useState,useEffect } from 'react';
import { Typography ,Box,styled, Button} from '@mui/material'
import { keyframes } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAuth } from '../AuthContext';
import  {auth}  from '../services/firebaseConfig';
import {uid} from "uid";
import { database } from '../services/firebaseConfig';
import { getDatabase, ref, set,orderByChild, update } from 'firebase/database';


const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatedBox = styled("div")({
  backgroundColor: "pink",
  width: 30,
  height: 30,
  animation: `${spin} 1s infinite ease`
});
const MyComponent = styled('div')({   
  backgroundColor: '#2f3542',
    color: '#fff',
    width: 500,
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '0.5rem',
});
const QRH =styled('img')({
  height: '350px'
});
const LoadingContainer = styled('div')({
  width: '80%',
  height: '350px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});
const LoadingSpan = styled('span')({
  display: 'inline-block',
  width: '3rem',
  height: '3rem',
  border: '2px solid',
  borderBottom: '0',
  borderColor: '#fff',
  borderRadius: '50%',
  WebkitBorderRadius: '50%',
  MozBorderRadius: '50%',
  MsBorderRadius: '50%',
  OBorderRadius: '50%',
  animation: '$loading 1s linear infinite',
  WebkitAnimation: '$loading 1s linear infinite',
});
const SubmitButton = styled('button')({
  backgroundColor: '#57606f',
    padding: '1rem',
    outline: 'none',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#fafafa',
    width: '100%',
    cursor: 'pointer',
});
const SButton = styled('button')({
  backgroundColor: '#008000',
    padding: '1rem',
    outline: 'none',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#fafafa',
    width: '100%',
    cursor: 'pointer',
});




const QRCodeManagement = () => {
  const { isAuthenticated } = useAuth();
  //const user=useAuthState(auth)

  const [qr, setQr] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const getQRCode = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to generate a QR code.');
      return;
    }

    try {

      setIsLoading(true);
        const newData = {
          Phone_Number:auth.currentUser.phoneNumber,
          flag: true,
        };
        const db = getDatabase();
        await set(ref(db,`QRS/${auth.currentUser.uid}`),newData).then(() => {
          console.log('Data saved successfully!');
        })
        .catch((error) => {
          console.log(error.msg);
        });
      
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${auth.currentUser.uid}`);
      console.log(res.url);
      setQr(res.url);
    } catch (error) {
      console.log(error);
    }finally{
    setIsLoading(false);
    }

  };
  const DeactivateQR=async()=>{
    console.log(123);
    const db = getDatabase();
    const id=auth.currentUser.uid;
    await update(ref(db,`QRS/${id}`),{
      Phone_Number:auth.currentUser.phoneNumber,
      flag: false,
    })
  }
  return (
    <div>
      <MyComponent elevation={3} >
        <Typography variant='h4'>QR code Generation</Typography>

        {isLoading && (
          <LoadingContainer >
            <LoadingSpan ></LoadingSpan>Loading...
          </LoadingContainer>
        )}

        {!isLoading && qr ? (
          <QRH  src={qr} alt='qr_code' />
        ) : (
          <Typography>Generate Amazing QR Code for you Phone Number!</Typography>
          
        )}

        <SubmitButton  onClick={getQRCode}  value='Generate QR Code' >Generate QR</SubmitButton>
      </MyComponent>
<br/>
      <SButton onClick={DeactivateQR}variant="contained">Deactive QR</SButton>
    </div>
  );
};

export default QRCodeManagement;


