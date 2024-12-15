import * as React from 'react';
import { IoFingerPrintOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


export default function LandingPage() {
    return (
      <div className="h-screen w-full relative">
        <h1 className="p-5 absolute text-6xl text-white font-thin font-aqem z-10">_psy <br /><span>Toth_</span></h1>

        
        <div className="h-screen w-full flex justify-center items-center">
          <Link to="/registration">
            <IoFingerPrintOutline 
              className="text-9xl text-white/50 hover:text-white absolute z-10"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} 
            />
          </Link>
          
          <iframe 
            src='https://my.spline.design/arcslightbeamsandagianthand-b77419332b6ff4aa19b833544226afdd/' 
            frameBorder='0' 
            width='100%' 
            height='100%' 
            className='z-0'
          ></iframe>
        </div>
      </div>
    );
}
