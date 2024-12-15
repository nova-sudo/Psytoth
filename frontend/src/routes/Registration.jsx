import React, { useState } from 'react';
import { IoFingerPrintOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
      try {
          const response = await fetch("http://localhost:5000/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });
          
          const data = await response.json();
  
          if (response.status === 201) {
              // Successful registration
              console.log(data.message);
              // Redirect to login page or main application page
              window.location.href = "/home";
          } else if (response.status === 400) {
              // User already exists
              alert(data.message);
          } else {
              // Handle other errors
              console.error(data.message);
              alert("An error occurred. Please try again.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
  };
  

    return (
        <div className="h-screen mx-auto">
            <section className="flex justify-center items-center text-black h-screen bg-white bg-gradient-to-r">
                <div className="flex flex-col py-16 px-24 rounded-3xl space-y-4">
                    <h1 className='text-center pb-10 text-black font-aqem text-5xl animate-pulse'>Sign Up / Login</h1>
                    <label htmlFor="" className='font-aqem text-2xl'> Username </label>
                    <input
                        type="text"
                        className='w-72 text-3xl rounded-lg ring-1 ring-black h-10 px-2 font-aqem text-black'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="" className='font-aqem text-2xl'> Password </label>
                    <input
                        type="password"
                        className='w-72 rounded-lg text-3xl h-10 px-2 ring-1 ring-black font-aqem text-black'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                   
                    <Link onClick={handleRegister} to="/home">
                        <IoFingerPrintOutline className='text-6xl animate-pulse ml-28 mt-10 hover:text-7xl hover:ml-[105px]' />
                    </Link>
                </div>
            </section>
        </div>
    );
}
