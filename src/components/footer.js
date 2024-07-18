import React from 'react'
import { Link } from 'react-router-dom'
export default function footer() {
  return (
    

<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">MentalHealth Stories</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li class='mx-3'>
            <Link to="/about">About</Link>
        </li>
        <li>
            <a href="" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <Link to="/contact">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

  )
}
