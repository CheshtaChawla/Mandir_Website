import Circle from "../../Image/Circle.png"
import babaJi from "../../Image/babaJi.webp"
import BabaRamDev from "../../Image/BabaRamDev.jpg"
import banner2 from "../../Image/banner-2.jpg"

import '../component/responsiveness/AboutUs.css';

export default function AboutUs() {
  return (
    <>
      <div className="custom-AboutUs-div lg:ml-40 lg:mr-20 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4">
        <div className="custom-aboutUs-heading-div">
          <img src={Circle} className="custom-about-circle absolute" style={{ zIndex: -1 }} />    {/* Absolute position is used so that text should come over the image */}
          <h1 className="custom-about-heading text-5xl font-medium font-bellefair 2xl:ml-10 2xl:mt-16 2xl:pt-10 xl:ml-10 xl:mt-12 xl:pt-10 lg:ml-10 lg:mt-10 lg:pt-10 md:ml-10 md:mt-8 md:pt-10 sm:ml-10 sm:mt-10 sm:pt-10">
            About Us
            <div className="custom-aboutUs-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
          </h1>
        </div>
        <div className="custom-AboutUs-div mr-40 md:mr-20 sm:mr-14 2xl:mt-10 xl:mt-9 lg:mt-8 md:mt-8 sm:mt-8 float-left flex flex-row">
          <div className="custom-AboutUs-discription flex flex-col w-full 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 font-bellefair text-2xl">   {/* this is the div for the text FLOAT->LEFT */}
            <p style={{ marginBottom: '1em' }}>Baba Ramdev Ji, also known as Ramdevji, Ramdeo Pir, or Ramsha Pir, is a revered figure in India, particularly in the states of Gujarat and Rajasthan. Born into a Rajput family in the village of Ramdevra in the Jaisalmer district, Baba Ramdev Ji is celebrated for his devotion to uplifting the downtrodden and poor.</p>
            <p style={{ marginBottom: '1em' }}>Baba Ramdev Ji, also known as Ramdevji, Ramdeo Pir, or Ramsha Pir, is a revered figure in India, particularly in the states of Gujarat and Rajasthan. Born into a Rajput family in the village of Ramdevra in the Jaisalmer district, Baba Ramdev Ji is celebrated for his devotion to uplifting the downtrodden and poor.</p>
            <p style={{ marginBottom: '1em' }}>Baba Ramdev Ji, also known as Ramdevji, Ramdeo Pir, or Ramsha Pir, is a revered figure in India, particularly in the states of Gujarat and Rajasthan. Born into a Rajput family in the village of Ramdevra in the Jaisalmer district, Baba Ramdev Ji is celebrated for his devotion to uplifting the downtrodden and poor.</p>
          </div>
          <div className="flex flex-col items-center w-1/2 float-right md:block hidden ">   {/* this is the div for the text FLOAT->LEFT */}
            <div className="flex justify-center items-center ml-40 xl:ml-20 lg:ml-20 md:ml-2" style={{ position: 'relative', width: '300px', height: '300px' }}>
              <img src={banner2} alt="Image 1" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
              <img src={BabaRamDev} alt="Image 2" style={{ position: 'absolute', top: '80px', left: '100px', zIndex: 2 }} />
              <img src={banner2} alt="Image 3" style={{ position: 'absolute', top: '300px', right: 0, zIndex: 3 }} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
