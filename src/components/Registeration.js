import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Registeration() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const Register= async (e)=>{

        e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username: name,
        password: password,
        email: email
      });

      // Handle successful registration response
      console.log('Registration successful:', response.data);
      
      // You can handle further actions like redirecting to login page or displaying a success message
    } catch (error) {
      // Handle error
      console.error('Registration error:', error);
    }
  };
    
  return (
    <div class="bg-white w-screen font-sans text-gray-900">
  <div class=" ">
    <div class="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div class="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
        <h1 class="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">Sign up</h1>
        
       
      </div>
    </div>
  </div>
  <div class="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
    <form class="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8" onSubmit={(e)=>Register(e)}>
    <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="name">Name</label><input class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring" id="phone" type="name" placeholder="Name" required="" onChange={(e)=>setName(e.target.value)}/><span class="my-2 block"></span></div>
      <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="email">E-mail</label><input class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring" id="email" type="email" placeholder="email" required="" onChange={(e)=>setEmail(e.target.value)}/><span class="my-2 block"></span></div>
      
      <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="password">Password</label><input class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring" id="password" type="password" placeholder="******************" required="" onChange={(e)=>setPassword(e.target.value)} /></div>
      
      <div class="mb-6">
        <label class="mb-2 flex text-sm"
          ><input type="checkbox" name="accept" class="mr-2" required="" />
          <div class="text-gray-800">
            <p class="">
              I accept the
              <a href="#" class="cursor-pointer text-blue-500 underline">terms of use</a>
              and
              <a href="#" class="cursor-pointer text-blue-500 underline">privacy policy</a>
            </p>
          </div></label
        >
      </div>
      <div class="flex items-center justify-center">
        <button class="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white" type="submit">Create account</button>
      </div>
    </form>
  </div>
</div>

  )
}
