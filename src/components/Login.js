import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner";
export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const Login=async (e)=>{

        e.preventDefault() // Prevent default form submission
        setLoading(true)
        try {
          const response = await axios.post(`https://mental-health-backend-j16e.onrender.com/api/auth/login`, {
            email: email,
            password: password
          });
          // Assuming the token is in the response data (adjust as necessary)
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem(email+'token', token);
          // Handle successful login response
          console.log('Login successful:', response.data);
          navigate("/stories",{state:{email:email}})

          
          // You can handle further actions like redirecting to another page or updating state
        } catch (error) {
          alert("User authentication failed")
          // Handle error
          console.error('Login error:', error);
        }
        setLoading(false)
      };


    
  return (
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  class="space-y-6" onSubmit={(e)=>Login(e)}>
            <div>
              <label htmlFor="email" class="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label htmlFor="password" class="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setPassword(e.target.value)}
               />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          
        </div>
       {loading?<div class='flex justify-center mt-5'><RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    /></div>:""}
      </div>
  )
}
