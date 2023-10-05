import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { getDatabase, ref, get,child } from 'firebase/database';
import { Button } from '@mui/material';
import Lottie from 'lottie-react'
import animationData from './calling'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {axios} from 'axios';
const QRCodeScanner = () => {
  const[isCalling,setIsCalling]=useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const Call=()=>{
    console.log(123);
  setIsCalling(true);
  // axios.post('http://localhost:3000/',{
  //   phoneNumber:phoneNumber
  // });
  setScanResult(null)
  setTimeout(() => {
    setIsCalling(false);
  }, 3000); 
  }

  const [scanResult, setScanResult] = useState(null);
  const [phoneNumber,setphoneNumber]=useState(null);
  useEffect(()=>{
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })
    scanner.render(success, error);
  
      function success(result) {
        scanner.clear();

        const dbRef = ref(getDatabase());
        get(child(dbRef, `QRS/${result}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          if(snapshot.val().flag===true){
            setphoneNumber(snapshot.val().Phone_Number);
            setScanResult(result);
          }
        } else {
          console.log("No data available");
        }
        }).catch((error) => {
          console.error(error);
        });

      }
  
      function error(err) {
        console.warn(err);

      }

  },[])
  return (
    <div>
      <h2>QR Code Scanner Component</h2>
      {
        scanResult ? <div><Button variant="contained" onClick={Call}>Call</Button></div>:<div id='reader'></div>
      }
      {isCalling &&   <Lottie 
    options={defaultOptions}
    animationData={animationData}
    />}
   
    </div>
  );
};

export default QRCodeScanner;
