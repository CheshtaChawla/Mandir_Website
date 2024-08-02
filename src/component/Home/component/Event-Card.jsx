import '../component/responsiveness/Event.css';
export default function EventCard({name, date, time, image, description, onButtonClick}) {

  return (

    <div className="relative lg:mt-10 md:mt-5 2xl:ml-40 2xl:mr-40 xl:ml-40 xl:mr-40 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-10 sm:mr-10 sm:mt-5 flex mb-1"> {/* this is the css of the slider of the events section */}
      <div>
        <div className="custom-event-card py-8 border border-orange-100 shadow-md shadow-orange-200 rounded-2xl flex">
          {/* events carasole */}
          <div className="flex-1 pl-5">
            {/* left -> content*/}
            <div className="float-left clear-right">
              {/* Event Heading*/}
              <h1 className="custom-event-inner-heading text-orange-500 text-3xl mb-6">
                {name}
              </h1>
              <div>
                {/* Date and Time information*/}
                <div className="flex mb-5">
                  {/* date -> float left*/}
                  <div className="custom-date float-left mr-5 flex flex-row ">
                    <span className="custom-date-icon material-symbols-outlined text-2xl">calendar_month</span>
                    <h4 className='custom-date-text text-xl'> {date} </h4>
                  </div>
                  {/* time -> float right*/}
                  <div className="custom-time float-right ml-5 flex flex-row">
                    <span class="material-symbols-outlined custom-time-icon text-2xl">alarm_on</span>
                    <span className='custom-time-text text-xl'>{time}</span>
                  </div>
                </div>
              </div>
              <div>

                {/* Breif information about Event */}
                <p className='custom-event-description mr-6'>
                  {description}
                </p>
              </div>
              <div>

                {/* Donate button */}
                <div className='custom-event-donateButton sm:mr-8 2xl:mt-16 xl:mt-16 lg:mt-16'>
                  <button
                  className="text-black-300 bg-orange-400 w-full h-10 flex justify-center rounded-lg text-xl mt-10 py-1"
                  onClick={onButtonClick}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="float-right clear-left ml-5 mr-5 md:block hidden">
            {/* right -> image */}
            <img
              className="custom-event-image w-auto h-auto"
              src={image}
            />
          </div>
        </div>

      </div>
    </div>

  );
}