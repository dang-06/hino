import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import { createMultiJobs } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RoutingSample = () => {
  const navigate = useNavigate();
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [destinations, setDestinations] = useState([]);

  const renderDirections = (locations) => {
    let lastDirection = locations.length - 1;
    const waypoints = [];
    if (locations.length > 2) {
      for (let i = 1; i < locations.length; i++) {
        waypoints.push({
          location: new window.google.maps.LatLng(
            locations[i][0],
            locations[i][1]
          ),
          stopover: true,
        });
      }
    }

    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(locations[0][0], locations[0][1]),
        destination: new window.google.maps.LatLng(
          locations[lastDirection][0],
          locations[lastDirection][1]
        ),
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDestinations((prev) => [...prev, result]);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleChangeFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const result = JSON.parse(e.target.result);
      setSelectedFile(result);

      const newResult = result.map((item) => item.path);

      let newListLocations = [];
      for (let i = 0; i < newResult.length; i++) {
        let listItems = [];
        for (let j = 0; j < newResult[i].length; j++) {
          listItems.push(newResult[i][j].location.location);
        }
        newListLocations.push(listItems);
      }

      for (let i = 0; i < newListLocations.length; i++) {
        renderDirections(newListLocations[i]);
      }

      result.map((d) => (
        <>
          {setPositions((oldArray) => [
            ...oldArray,
            {
              lat: d.path,
            },
          ])}
        </>
      ));
    };
  };

  const handleSendData = async () => {
    try {
      const response = await createMultiJobs(selectedFile);
      toast.success("Added Jobs successfully!");
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [textDialog, setTextDialog] = useState();

  const handleShowModal = (data) => {
    setShowModal(true);

    selectedFile;

    setTextDialog(data);
  };

  const colorPolyline = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#CCEEFF",
    "#282C34",
    "#D16929",
    "#BBE2C6",
    "#FFEBCD",
    "#FFE4C4",
    "#F5DEB3",
    "#DEB887",
    "#D2B48C",
    "#BC8F8F",
    "#F4A460",
  ];

  const [positions, setPositions] = useState([]);

  const handleLatlong = (location) => {
    const latLong = [];
    location.lat.map((l) =>
      latLong.push({
        lat: l.location.location[0],
        lng: l.location.location[1],
        label: l.location.code,
      })
    );
    return latLong;
  };

  const handleLatlongMarker = (location) => {
    const latLong = {
      lat: location.location.location[0],
      lng: location.location.location[1],
      label: location.location.code,
    };

    return latLong;
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEYS,
    libraries: ["places"],
  });
  const [cooridinate, setCooridinate] = useState({
    lat: 13.63216,
    lng: 100.3649,
  });
  const options = { closeBoxURL: "", enableEventPropagation: true };
  const onLoad = (infoBox) => {
    // console.log('infoBox: ', infoBox)
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className="h-full px-4 pt-6 sm:px-6 lg:mx-auto lg:max-w-full lg:px-8">
        <div className="routing-sample-box1  rounded-lg bg-white shadow-sm ">
          <div className="divide-y divide-dashed py-3 px-7">
            <div className="py-3 text-xl font-medium">
              <p>{t("excelFileTemplate")}</p>
            </div>
            <div className="pt-5 pb-2">
              <div className="flex justify-between">
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    multiple
                    type="file"
                    className="hidden"
                    onChange={handleChangeFile}
                  />
                  <Button variant="outlined" component="span">
                    Select file
                  </Button>
                </label>
                <a
                  href="/templates/json_template.json"
                  download
                  className="self-end text-indigo-500 underline"
                >
                  {t("downloadJsonTemplate")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="routing-sample-box1  rounded-lg bg-white shadow-sm ">
          <div className="mt-5 p-7" style={{ height: "600px", width: "100%" }}>
            <GoogleMap
              center={cooridinate}
              default
              zoom={11}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {positions != null && (
                <>
                  {positions.map(function (d, idx) {
                    return (
                      <>
                        {d.lat &&
                          d.lat.map((position, index) => (
                            <Marker
                              position={
                                new window.google.maps.LatLng(
                                  handleLatlongMarker(position)
                                )
                              }
                            >
                              <InfoBox
                                onLoad={onLoad}
                                options={options}
                                position={handleLatlongMarker(position)}
                              >
                                <>
                                  <div
                                    style={{
                                      backgroundColor: "green",
                                      color: "white",
                                      borderRadius: "1em",
                                      padding: "0.2em",
                                      zIndex: 2,
                                    }}
                                  >
                                    {position.location.no}
                                  </div>
                                </>
                              </InfoBox>
                            </Marker>
                          ))}
                      </>
                    );
                  })}
                </>
              )}
              {/* {positions.map((p, idx) => (
                <>
                  <Polyline
                    path={handleLatlong(p)}
                    options={colorPolyline[0][idx]}
                    geodesic={true}
                    key={idx}
                  />
                </>
              ))} */}

              {destinations?.map((item, index) => (
                <DirectionsRenderer
                  directions={item}
                  key={index}
                  options={{
                    polylineOptions: {
                      strokeOpacity: 0.5,
                      strokeColor: colorPolyline[index],
                    },
                  }}
                />
              ))}
            </GoogleMap>
          </div>
          {selectedFile !== null && (
            <>
              <div className="px-7 pb-7">
                <div className="border border-indigo-600 border-inherit p-7">
                  <div className="flex justify-center">
                    <button
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                      onClick={handleSendData}
                    >
                      {t("newTask_11")}
                    </button>
                  </div>
                  <div className="v-list-jobs-import mt-7">
                    {selectedFile?.map(function (d, idx) {
                      return (
                        <div className="grid grid-cols-3 gap-4" key={idx}>
                          <div
                            className={
                              idx % 2 == 0 || idx == 0
                                ? "bg-slate-100 p-3"
                                : " p-3"
                            }
                          >
                            <div className="flex">
                              <i className="fa mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                                  />
                                </svg>
                              </i>
                              <strong>{d.carId}</strong>
                            </div>
                            <div className="mt-1 flex">
                              <i className="fa mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                  />
                                </svg>
                              </i>
                              <span>{d.carType}</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="grid h-full grid-cols-6 items-center gap-4">
                              {/* <div className=" ">
                                                <p>13.6 km</p>
                                                <p>00:14:18</p>
                                                <p>0</p>
                                            </div> */}
                              <div className="col-span-6">
                                <div className="flex">
                                  <span>
                                    <img
                                      className="w-[20px]"
                                      src="./images/market.png"
                                      alt=""
                                    />
                                  </span>
                                  <div
                                    className="mt-4"
                                    style={{
                                      width: "30px",
                                      height: "100%",
                                      borderBottom:
                                        "5px solid rgb(80, 118, 176)",
                                    }}
                                  ></div>
                                  {d.path.map(function (p, pid) {
                                    return (
                                      <>
                                        <div
                                          key={pid}
                                          onClick={() => handleShowModal(p)}
                                          style={{
                                            height: " 30px",
                                            minWidth: 30,
                                            textAlign: "center",
                                            opacity: 1,
                                            position: "relative",
                                            backgroundColor: "red",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: 5,
                                            padding: 3,
                                            cursor: "pointer",
                                            display: "inline-block",
                                          }}
                                        >
                                          {p.location.no}
                                        </div>
                                        <div
                                          className="mt-4"
                                          style={{
                                            width: "30px",
                                            height: "100%",
                                            borderBottom:
                                              "5px solid rgb(80, 118, 176)",
                                          }}
                                        ></div>
                                      </>
                                    );
                                  })}
                                  {/* End loop-child v-list-jobs-import */}
                                  <span>
                                    <img
                                      className="w-[20px]"
                                      src="./images/market.png"
                                      alt=""
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* End loop v-list-jobs-import */}
                  </div>
                  {/* End v-list-jobs-import */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-1/4">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-2xl">{t("information")}</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div className="grid h-full grid-cols-4 items-center gap-4">
                    <div>{t("routingSampleDialog3")}</div>
                    <div className="col-span-3">{textDialog.location.name}</div>
                  </div>
                  <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                    <div>No</div>
                    <div className="col-span-3">{textDialog.location.no}</div>
                  </div>
                  <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                    <div>{t("routingSampleDialog2")}</div>
                    <div className="col-span-3">{textDialog.location.code}</div>
                  </div>
                  <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                    <div>{t("routingSampleDialog1")}</div>
                    <div className="col-span-3">{textDialog.location.type}</div>
                  </div>
                  <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                    <div>{t("routingSampleDialog4")}</div>
                    <div className="col-span-3">
                      {textDialog.location.location}
                    </div>
                  </div>
                  {textDialog.add.length > 0 && (
                    <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                      <div>{t("routingSampleDialog5")}</div>
                      <div className="col-span-3">{textDialog.add.length}</div>
                    </div>
                  )}
                  {textDialog.remove.length > 0 && (
                    <div className="mt-2 grid h-full grid-cols-4 items-center gap-4">
                      <div>{t("routingSampleDialog6")}</div>
                      <div className="col-span-3">
                        {textDialog.remove.length}
                      </div>
                    </div>
                  )}
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default RoutingSample;
