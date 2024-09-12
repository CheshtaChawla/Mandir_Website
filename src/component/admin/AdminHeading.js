import React from 'react';

export default function AdminHeading () {
    return (
        <div className='bg-[#D9D9D9] sticky top-0 flex flex-col sm:flex-row justify-between items-center p-4 z-50 w-full sm:w-full xs:w-full flex-shrink-0'> {/* justify between is used to but the one element at extreme left and one at extreme right */}
          {/* Admin Panel Heading */}
          <h1 className='font-semibold text-5xl text-[#DCB44D] flex-shrink-0'>
            Admin Panel
          </h1>
    
          {/* Website Domain */}
          <div className='bg-[#DCB44D] text-black rounded rounded-5 px-4 py-2 flex-shrink-0 hidden sm:block'>  {/* hidden sm:block using this the website domain text will be hidden after the scfreen size sm */}
            website domain
          </div>
        </div>
      );
    };