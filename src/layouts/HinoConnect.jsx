import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { verifyUserHino } from "../api";
import logo from "/images/logo-white.svg";
import "./hinoConnect.css";

const HinoConnect = () => {
  let [searchParams] = useSearchParams();
  let token = searchParams.get("loginToken");
  let apiKey = searchParams.get("apiKey");
  let accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if (!token || !apiKey) {
      window.location = "/login";
      return;
    }

    const getProfile = async () => {
      try {
        const response = await axios.get(
          "https://api-center.onelink-iot.com/prod/users/get-profile",
          {
            headers: {
              authorization: token,
              "x-api-key": apiKey,
            },
          }
        );

        if(accessToken){
          const response3 = await axios.get("https://api-tms.cargolink.co.th/api/auth/user/info",  {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          localStorage.setItem("user", JSON.stringify({...response3.data, token: accessToken}));
        }
        else {
          const response2 = await verifyUserHino({
            ...response.data,
            accessToken: token,
            apiKey,
          });
          localStorage.setItem("user", JSON.stringify(response2.data));
        }
        window.location = "/";
      } catch (error) {
        //window.location = "/login";
        console.log(error);
      }

      setIsLoading(false);
    };

    getProfile();
  }, []);

  return (
    <div className="m-0 flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-cyan-400 to-green-500">
      <img src={logo} alt="logo" className="absolute top-6 left-10 w-60" />
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2 class="mt-4 text-center text-xl font-semibold text-white">
        Loading...
      </h2>
      <p class="w-1/3 text-center text-white">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default HinoConnect;
