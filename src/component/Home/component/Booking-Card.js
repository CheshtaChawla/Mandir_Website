import '../component/responsiveness/Booking.css';

export default function BookingCard({ image, heading, paragraph, buttonName }) {

  return (
    <div className="custom-booking-card flex flex-col lg:flex-row border border-orange-100 shadow-md shadow-orange-200 rounded-2xl mb-1 h-full">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-full">
        <img className="custom-booking-image w-full h-auto rounded-xl" src={image} alt="Booking Image" />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 h-full flex flex-col p-4 flex justify-end">
        <div>
          <h1 className="custom-booking-inner-heading text-3xl text-orange-500 mb-4">{heading}</h1>
          <p className="custom-booking-details mb-4">{paragraph}</p>
        </div>
        <div className="custom-booking-button mb-2 ">
          <button
            onClick={() => window.location.href = "https://api.whatsapp.com/send?phone=+91-9988308752&text=Hey%20I%20have%20a%20query%20regarding%20Booking%20of%20the%20kirtan"}
            className="bg-orange-400 rounded-xl text-xl py-2 px-4 w-full "
            style={{ width: "100%" }}
          >
            {buttonName}
          </button>
        </div>

      </div>
    </div>
  );
}
