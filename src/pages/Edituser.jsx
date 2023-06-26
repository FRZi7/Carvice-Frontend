// import React, { useState } from 'react';
// import Navbar from './Navbar';

// function EditUser() {
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const handleShowDetailsModal = () => {
//     setShowDetailsModal(true);
//   };

//   const handleShowPasswordModal = () => {
//     setShowPasswordModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowDetailsModal(false);
//     setShowPasswordModal(false);
//   };

//   return (
//     <div className="edituser">
//       <Navbar />
//       <div
//         className="flex justify-center items-center object-fill min-h-screen"
//         style={{ background: `url('/img/8s4a9017.jpg')`, backgroundSize: 'cover' }}
//       >
//         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold mb-4 text-center">Edit User Details</h2>
//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={handleShowDetailsModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
//             >
//               Change User Details
//             </button>
//           </div>
//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={handleShowPasswordModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
//             >
//               Change Password
//             </button>
//           </div>
//         </div>
//       </div>

//       {showDetailsModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-96 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-4 text-center">Change User Details</h2>
//             {/* Add your form inputs for changing user details */}
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {showPasswordModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-96 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
//             {/* Add your form inputs for changing password */}
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EditUser;
import React, { useState } from 'react';
import Navbar from './Navbar';

function EditUser() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleShowDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const handleShowPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowPasswordModal(false);
  };

  return (
    <div className="edituser">
      <Navbar />
      <div
        className="flex justify-center items-center object-fill min-h-screen"
        style={{ background: `url('/img/8s4a9017.jpg')`, backgroundSize: 'cover' }}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit User Details</h2>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleShowDetailsModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Change User Details
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleShowPasswordModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="w-96 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Change User Details</h2>
            <form>
              {/* Add your form inputs for changing user details */}
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="w-96 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
            <form>
              {/* Add your form inputs for changing password */}
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block font-semibold mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block font-semibold mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUser;

