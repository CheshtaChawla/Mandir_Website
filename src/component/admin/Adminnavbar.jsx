import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LogoutModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            Logout
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminNavbar = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLogoutModalVisible(true);
    
  };

  // const handleLogoutConfirm = () => {
  //   localStorage.setItem('isAuthenticated', 'false'); // Handle your logout logic
  //   setIsLogoutModalVisible(false);
  //   navigate('/login'); // Redirect to login page
  // };

  const handleLogoutConfirm = async () => {
    try {
      await new Promise((resolve) => {
        localStorage.setItem('isAuthenticated', 'false'); // Handle your logout logic
        setIsLogoutModalVisible(false);
        navigate('/login'); // Redirect to login page
       
        resolve();
      });
  
     
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle any errors if necessary
    }
  };
  

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <aside className="bg-[#D9D9D9] h-screen fixed flex flex-col justify-between h-[100vh]">
        <nav className="flex flex-col space-y-4 p-2 ">
          <ul className="flex flex-col space-y-1 text-xl font-bellefair">
            {[
              { path: "/admin", label: "Home", exact: true },
              { path: "/admin/event", label: "Event" },
              // { path: "/admin/charity", label: "Charity" },
              { path: "/admin/booking", label: "Booking" },
              { path: "/admin/committee", label: "Committee" },
              { path: "/admin/contactUs", label: "Contact Us" },
              { path: "/admin/aboutUs", label: "About Us" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={true}
                  className={({ isActive }) =>
                    `block w-full p-2 rounded-lg text-center ${
                      isActive ? 'bg-[#DCB44D] text-black' : 'bg-white text-black'
                    }`
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="p-2 pb-24">
            <button
              className="block w-full p-2 rounded-lg text-center bg-[#DCB44D] text-white"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};
