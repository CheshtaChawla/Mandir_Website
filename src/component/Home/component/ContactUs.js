import ContactUsForm from "../component/ContactUs-Form";
import durgaevent from "../../Image/durgaevent.jpg"

import '../component/responsiveness/ContactUs.css';
export default function ContactUs() {
    return (
        <>
            <div className="custom-contactUs flex flex-col">
                <div className="custom-contactUs-heading-div">
                    <h1 className="custom-form-heading text-5xl font-medium font-bellefair 2xl:mt-12 xl:mt-12 lg:mt-8 md:mt-8 sm:mt-10 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14">
                        Contact Us
                        <div className="custom-contactUs-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
                    </h1>
                </div>
                <div className="custom-form-div border border-orange-100 shadow-md shadow-orange-200 2xl:ml-40 2xl:mr-40 xl:ml-40 xl:mr-40 lg:ml-40 lg:mr-40 md:ml-20 md:mr-10 sm:ml-10 sm:mr-10 rounded-2xl ">
                    <div className="w-full 2xl:w-1/2 xl:w-1/2 lg:w-3/5 md:w-1/2 float-left p-5">   {/* this is the form area for the ContactUs div*/}
                        <ContactUsForm />
                    </div>
                    <div className="2xl:w-1/2 xl:w-1/2 lg:w-2/5 md:w-1/2 sm:w-1/2 float-right flex flex-row justify-center" >   {/* this is the image area for the ContactUs div*/}
                        <img className="rounded rounded-xl md:inline hidden" src={durgaevent} />
                    </div>
                </div>


            </div>
        </>
    );
}