import React from "react";
import Logo from "../Logo/Logo";

const RoundLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <Logo />
      </div>
      <div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default RoundLoader;
