
import { Carousel } from "flowbite-react";

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

function SliderPage() {
  return (
    <div className="min-h-screen h-96">
      <Carousel onSlideChange={(index) => console.log('onSlideChange()', index)}>
        {slides.map(slide => {

            return    <div className="relative flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                      <img src={slide.image} />
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <h2 className="text-white font-extrabold text-3xl md:text-5xl">{slide.title}</h2>
                        <p className="text-white text-xl font-thin bg-[#0000006d] py-2 m-2">{slide.description}</p>
                      </div>
          </div>


        })}
        {/* <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <img src={slides[0].image} />
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 2
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 3
        </div> */}
      </Carousel>
    </div>
  );
}

export default SliderPage;
