import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const GoogleSignIn = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  // console.log("googole",location)
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const data = result.user;

      const userInfo = {
        displayName: data.displayName,
        photoURL: data.photoURL,
        email: data.email,
        role: 'user'
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Sign In Successful!");
      navigate(location.state || "/");
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "An error occurred during Google Sign In");
    }
  };
  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn bg-white text-black border-[#e5e5e5]"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
