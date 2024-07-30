import React from 'react'
import Slider from './Slider'

const HeroSection = () => {
  return (
    <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
    <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
      <div className="flex items-center justify-center mb-4 lg:justify-normal">
        <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
          your journey starts here
        </h4>
      </div>
      <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">
        The world of Tentacle is here
      </h1>
      <p className="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quibusdam porro sed iure, dolor reprehenderit saepe mollitia, excepturi autem tenetur in, dicta unde exercitationem nesciunt dolores delectus! Fugit, aut quae?.
      </p>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <button className="flex items-center py-4 text-sm font-bold text-white px-7 bg-purple-blue-500 hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl">
          Get started now
        </button>
      </div>
    </div>
    <div className="items-center justify-end hidden col-span-1 md:flex">
    <Slider />
    </div>
  </div>
  )
}

export default HeroSection