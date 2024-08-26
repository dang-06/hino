import React from "react";

const LoadingLayout = () => {
  return (
    <div className="top-0 right-0 bottom-0 left-0 absolute z-10 flex items-center justify-center">
      <div className="absolute w-full h-full bg-[#0000008a]"></div>
      <div className="lds-roller relative z-20"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoadingLayout;
