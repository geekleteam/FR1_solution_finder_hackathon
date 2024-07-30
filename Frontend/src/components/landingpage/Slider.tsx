import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const slides: any[] = [
    {
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      title: 'AI-Powered Code Completion',
      description: 'Experience intelligent code suggestions as you type, powered by advanced AI algorithms.',
    },
    {
      image: 'https://images.unsplash.com/photo-1639475377520-b256a5d204b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
      title: 'Real-Time Error Detection',
      description: 'Catch potential errors and bugs in real-time with AI-powered error detection.',
    },
    {
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'Automated Code Optimization',
      description: 'Optimize your code automatically for better performance and readability.',
    },
    {
      image: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'Seamless Integration',
      description: 'AI Code Companion integrates seamlessly with your favorite code editors and IDEs.',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIn(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    setSlideIn(false);
  }, [currentSlide]);

  const prevSlide = () => {
    setSlideIn(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIn(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative max-h-[95vh]">
      <img
        src={slides[currentSlide].image}
        alt="Slider"
        className={`w-full min-h-full transition-transform duration-500 rounded-b-xl rounded-t-xl ${
          slideIn ? 'transform translate-x-full' : ''
        }`}
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Slider;