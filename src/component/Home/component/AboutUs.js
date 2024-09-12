import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Circle from "../../Image/Circle.png";
import fetchAboutUsData from './fetchAboutUsData';
import '../component/responsiveness/AboutUs.css';
import parse from 'html-react-parser';


export default function AboutUs() {
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);

// ["e","f", "g", "c"].map((data)=><div></div> 

  // useEffect(() => {
  //   const getaboutusData = async () => {
  //     const data = await fetchAboutUsData();  // fetches all documents from the events collection.
  //     setAboutusData(data);  // Store the fetched data in the state.
  //     console.log(data); // Check the data structure here
  //   };
  //   getaboutusData();
  // }, []);

 useEffect(() => {
    const getaboutusData = async () => {
      const data = await fetchAboutUsData();
      // Assuming data is an array with a single object
      if (data.length > 0) {
        const { paragraph, ...imageData } = data[0];
        setParagraphs([paragraph]);
        setImages(Object.values(imageData));
      }
    };
    getaboutusData();
  }, []);


  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Set this to 1 if you want to show one slide at a time
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="custom-AboutUs-div lg:ml-40  md:ml-20 md:mr-20 sm:ml-14 sm:mr-14 mb-4 ">
        <div className="custom-aboutUs-heading-div ">
          <img src={Circle} className="custom-about-circle absolute" style={{ zIndex: -1 }} />    {/* Absolute position is used so that text should come over the image */}
          <h1 className="custom-about-heading text-5xl font-medium font-bellefair 2xl:ml-10 2xl:mt-16 2xl:pt-10 xl:ml-10 xl:mt-12 xl:pt-10 lg:ml-10 lg:mt-10 lg:pt-10 md:ml-10 md:mt-8 md:pt-10 sm:ml-10 sm:mt-10 sm:pt-10 mb-3">
            About Us
            <div className="custom-committee-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
          </h1>
        </div>
        <div className="custom-AboutUs-div flex flex-col md:flex-row ">
  <div className="custom-AboutUs-description font-bellefair text-2xl p-5 w-full md:w-1/2 mt-3"> 
    {paragraphs.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '1em' }}>{parse(paragraph)}</p>  //parse is used because using the library used for proper spacing alignment in the aboutus text
    ))}
  </div>
  <div className="flex items-center justify-center w-full md:w-1/2 mx-auto mb-3"> 
    <Slider {...settings} className="h-auto rounded rounded-xl w-full"> {/* Remove hidden for mobile view */}
      {images.slice(0, 3).map((image, index) => (
        <div key={index} className="flex justify-center w-full">
          <img src={image} alt={`Image ${index + 1}`} className="w-[300px] h-auto object-cover mx-auto" />
        </div>
      ))}
    </Slider>
  </div>
</div>

      </div>
    </>
  );
}
