
import '../component/responsiveness/Booking.css';

export default function BookingCard(props) {


  return (
    <>

      {/* <div className="rounded-3xl"> */}
      <div className="custom-booking-card flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col border border-orange-100 shadow-md shadow-orange-200 rounded-2xl mb-1"> {/* this is the IMAGE div -> float-left*/}
        <div className='custom-booking-image-div h-full 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 2xl:flex-col xl:flex-col lg:flex-col md:flex-col'>
          <img className="custom-booking-image rounded-xl" src={props.children.image} alt="Booking Image" />
        </div>
        <div className="custom-booking-details-div h-full pb-3 rounded-xl 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 2xl:flex-col xl:flex-col lg:flex-col md:flex-col"> {/* this is the CONTENT div -> float-right*/}
          <h1 className="custom-booking-inner-heading text-3xl text-orange-500 2xl:ml-10 xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 pt-5 pb-5">{props.children.heading}</h1>
          <p className="custom-booking-details ml-10 pb-5 mr-10">{props.children.details}</p>
          <div className="custom-booking-button 2xl:ml-10 xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10">
            <button onClick={() => window.location.href = "https://api.whatsapp.com/send?phone=+91-9988308752&text=Hey%20I%20have%20a%20query%20regarding%20Booking%20of%20the%20kirtan"} className="bg-orange-400 rounded-xl pt-2 pb-2 text-xl mt-10" style={{ width: "90%" }}>Book</button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>

  );
}
