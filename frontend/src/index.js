import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import LandingPage from "./routes/LandingPage";
import Registration from "./routes/Registration"
import MusicPlayer from './components/MusicPlayer';
import JournalEntries from './routes/JournalEntries';

import Home from "./routes/Home"
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/registration",
    element: <Registration/>
  },
{ 
  path: "/home",
  element: <Home/>
},
{ 
  path: "/journal-entries",
  element: <JournalEntries/>
}

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1 className='p-5 absolute text-6xl text-black font-thin font-aqem z-10'>_psy <br /><span>Toth_ </span></h1>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
