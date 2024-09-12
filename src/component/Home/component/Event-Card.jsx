import '../component/responsiveness/Event.css';

export default function EventCard({ name, startDate, endDate, startTime, endTime, image, description, onButtonClick }) {
  return (
    <div className="relative lg:mt-10 md:mt-5 2xl:mx-40 xl:mx-40 lg:mx-40 md:mx-20 sm:mx-10 sm:mt-5 flex mb-1">
      <div className="custom-event-card py-8 border border-orange-100 shadow-md shadow-orange-200 rounded-2xl flex flex-col md:flex-row w-full mx-auto  flex items-center">
        {/* Content Section (full width on mobile, 2/3 on larger screens) */}
        <div className="w-full md:w-2/3 h-full px-5 md:pl-5 md:pr-0 mx-auto text-left">
          <h1 className="custom-event-inner-heading text-orange-500 text-3xl mb-6">
            {name}
          </h1>
          
          <div className="flex flex-col sm:flex-row mb-5 sm:justify-start">
            <div className="custom-date mb-2 sm:mb-0 sm:mr-5 flex flex-row items-center">
              <span className="custom-date-icon material-symbols-outlined text-2xl mr-2">calendar_month</span>
              <h4 className='custom-date-text text-xl'> ({startDate}) to ({endDate}) </h4>
            </div>
            <div className="custom-time flex flex-row items-center">
              <span className="material-symbols-outlined custom-time-icon text-2xl mr-2">alarm_on</span>
              <span className='custom-time-text text-xl'>({startTime}) to ({endTime})</span>
            </div>
          </div>
          
          <p className='custom-event-description'>
            {description}
          </p>
          
          <div className='custom-event-donateButton mt-10 md:mt-16'>
            <button
              className="text-black-300 bg-orange-400 w-full h-10 flex justify-center items-center rounded-lg text-xl py-1"
              onClick={onButtonClick}
            >
              Join Event
            </button>
          </div>
        </div>
        
        {/* Image Section (hidden on mobile, 1/3 width on larger screens) */}
        <div className="w-full md:w-1/3 h-full mt-5 md:mt-0 md:ml-5 md:mr-5 hidden md:block mx-auto">   {/* mx-auto - means margin-left and margin-right */}
          <img
            className="custom-event-image w-full h-auto rounded-lg"
            src={image}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
}