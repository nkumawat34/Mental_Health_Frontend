import React from 'react'
import { RiMentalHealthLine } from "react-icons/ri";
import Download1 from '../Assets/Images/download1.jpg'
import Download2 from '../Assets/Images/download2.jpeg'
import Download3 from '../Assets/Images/download3.jpg'

import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div>
        <div class="flex justify-between ...">
  <div class='m-4'><RiMentalHealthLine size={70}/></div>
  <div><button class='m-4 p-4 bg-red-200 rounded-full'><Link to="/login">Login</Link></button><button class='m-4 p-4 bg-red-200 rounded-full'><Link to="/registeration">SignUp</Link></button></div>
  
</div>
    <div class='flex justify-center'>
        <h1 className='text-3xl'>Mental Health Stories</h1>
    </div>
    <div class='flex flex-row justify-center'>
       <h1 class='text-2xl mt-5'>You are just one step  away to connect with  <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;people like you</h1>
    </div>
    <h1 class='text-center text-3xl mt-5 my-5'>Testimonials</h1>
    <div class='flex flex-row flex-wrap items-center justify-center '>
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-5 mt-4 md:mt-0">
  <img class="w-full" src={Download1} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Neeraj Kumawat</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#OCD</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#anxiety</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#depression</span>
  </div>
  </div>
  <div class="max-w-sm rounded overflow-hidden shadow-lg mx-5 mt-4 md:mt-0">
  <img class="w-full" src={Download2} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Simran Kaur</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#depression</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#anxiety</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#polar disorder</span>
  </div>
  </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-5 mt-4 md:mt-0">
  <img class="w-full" src={Download3} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Aditya Sharma</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#anxiety</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#mental disorder</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#phobia</span>
  </div>
  </div>
  </div>
    </div>
  )
}
