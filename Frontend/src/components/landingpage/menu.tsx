import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ProfileButton } from '../Auth0/ProfileButton';
import { Button } from "flowbite-react";


const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated} = useAuth0();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="fixed top-0 z-[100] py-2 flex flex-wrap items-center justify-between w-full  group shrink-0">
      <button
        onClick={toggleMenu}
        className="md:hidden p-2"
      >
        {/* You can use an icon library or create your own hamburger icon */}
        <span className="sr-only">Toggle menu</span>
        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-600"></div>
      </button>

      <div>
        <Link to={'/'} ><img className="h-16 cursor-pointer" src="/logo.png" /></Link>
      </div>
      {/* <div className="items-center justify-between gap-12 hidden text-black md:flex">
        <Link
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          to={`/`}
        >
          Home
        </Link>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Features
        </a>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Company
        </a>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#FAQ"
        >
          FAQs
        </a>
      </div> */}
        <div className="items-center hidden gap-5 md:flex mr-8">
      {isAuthenticated ? <ProfileButton /> :<>
          <Button color={'white'} pill className="bg-secondary-pink border-none hover:border-[1px] hover:border-secondary-pink flex items-center text-sm font-normal text-white hover:text-secondary-pink hover:bg-white transition duration-300">
            <Link to={'/login'}> Log In</Link>
          </Button>
          <Button color={'white'} pill className="bg-white  flex items-center text-sm font-normal text-secondary-pink hover:text-white hover:bg-secondary-pink transition duration-300">
            <Link to={'/login'}>Sign Up</Link>
          </Button>
          </>
      }
        </div>
      <div className='relative w-full md:hidden'>
      <div className={`absolute flex items-center md:hidden transition-all duration-300 ease-in-out flex-col shadow-main justify-center w-full gap-5 overflow-hidden bg-white ${isOpen ? 'max-h-64 py-4 px-4 rounded-2xl' : 'max-h-0'} top-full`}>
        {/* <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Product
        </a>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Features
        </a>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Pricing
        </a>
        <a
          className="text-sm font-normal text-dark-grey-700 hover:text-dark-grey-900"
          href="#"
        >
          Company
        </a> */}
          <Button color={'white'} pill className="bg-white  flex items-center text-sm font-normal text-secondary-pink hover:text-white hover:bg-secondary-pink transition duration-300">
          <Link to={'/login'}> Log In</Link>
          </Button>
          <Button color={'white'} pill className="bg-white  flex items-center text-sm font-normal text-secondary-pink hover:text-white hover:bg-secondary-pink transition duration-300">
            <Link to={'/login'}>Sign Up</Link>
          </Button>
      </div>
      </div>
    </div>
  )
}

export default Menu