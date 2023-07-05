import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Otp = () => {
  const navigate = useNavigate()
  const [otp, setOTP] = useState('');
  const [counter, setCounter] = useState(60);

const onSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.get(`http://localhost:1102/api/user/sendotp/${otp}`)
        console.log(response,"hfqdqhyqqq")
        if(response){
          console.log(response,"asdasdasdasdasdasd")
            toast.success("User registered")
            navigate("/login")
        }else{
            toast.error("")
        }
    } catch (error) {
        toast.error("something went wrong")
    }
}

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [counter]);

  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="py-5 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            OTP Verification
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="appearance-none border rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="*****"
                value={otp}
                onChange={handleChangeOTP}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={counter === 0}
            >
              Verify OTP
            </button>
          
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
              disabled={counter === 0}
            >
              Send OTP again
            </button>
            
            {counter > 0 && (
              <p className="text-gray-700 text-sm mt-4">
                Resend OTP in {counter} seconds
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';


// const Otp = () => {
//   const navigate = useNavigate();
//   const [otp, setOTP] = useState('');
//   const [counter, setCounter] = useState(60);
//   const [showResendButton, setShowResendButton] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:1102/api/user/sendotp", { otp: otp });
//       console.log(response, "hfqdqhyqqq");
//       if (response) {
//         console.log(response, "asdasdasdasdasdasd");
//         toast.success("User registered");
//         navigate("/login");
//       } else {
//         toast.error("");
//       }
//     } catch (error) {

//     }
//   }

//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setInterval(() => {
//         setCounter((prevCounter) => prevCounter - 1);
//       }, 100);
//       return () => {
//         clearInterval(timer);
//       };
//     } else {
//       setShowResendButton(true);
//     }
//   }, [counter]);

//   const handleChangeOTP = (e) => {
//     setOTP(e.target.value);
//   };

//   const handleResendOTP = () => {
//     setCounter(60);
//     setShowResendButton(false);
//     // Perform actions to resend the OTP
//   };

//   const handleForm2Submit = async(e) => {
//     e.preventDefault();
//     const response = await axios.post("http://localhost:1102/api/user/regster")
//     console.log(response,"the response is true ")
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center">
//       <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
//         <div className="py-5 px-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//             OTP Verification
//           </h2>
//           <form onSubmit={onSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="otp"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 id="otp"
//                 className="appearance-none border rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="*****"
//                 value={otp}
//                 onChange={handleChangeOTP}
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               disabled={counter === 0}
//             >
//               Verify OTP
//             </button>
//           <form onSubmit={handleForm2Submit}>
//             {showResendButton && (
//               <button
//                 type="button"
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
//                 onClick={handleResendOTP}
//               >
//                 Resend OTP
//               </button>
//             )}
//             </form>

//             {counter > 0 && (
//               <p className="text-gray-700 text-sm mt-4">
//                 Resend OTP in {counter} seconds
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;
