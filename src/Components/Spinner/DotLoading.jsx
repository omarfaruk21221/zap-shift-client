import React from "react";
import Logo from "../Logo/Logo";

const DotLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div>
        <Logo />
      </div>
      <div>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    </div>
  );
};

export default DotLoading;
