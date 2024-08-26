import React, { Fragment } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import { Button } from "devextreme-react";
import { LoadingButton } from "@mui/lab";
import { FaArrowLeft } from "react-icons/fa";

const FilterRightBar = ({ open, setOpen, children, triggleFilter, setTriggleFiter }) => {
    // const location = useLocation();
    // const pathNames = location.pathname.split("/").filter((x) => x);
    const { t } = useTranslation();
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <div className=" h-[100vh] top-0 left-0 fixed z-[999]">
                    <span className="w-[100vw] h-[100vh] fixed top-0 left-0 z-10" onClick={() => setOpen(false)}></span>
                    <div className="pointer-events-none fixed inset-y-0 shadow-sm right-0 z-20 flex max-w-full overflow-hidden pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto flex flex-col w-screen max-w-[400px] bg-white shadow-lg">
                                <div className="px-4 h-[57px] py-3 border-b">
                                    <h3 className="text-[20px] flex items-center cursor-pointer" onClick={() => setOpen(false)}>
                                        <FaArrowLeft className="w-5 h-5 mr-3"/>
                                        <span>Filter</span>
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-auto p-3">
                                    {children}
                                </div>
                                <div className="self-end w-full border-t">
                                     <div className="flex flex-shrink-0 justify-end gap-4 px-4 h-[50px] py-3">
                                        <button className="border rounded-lg hover:bg-[#eeeaea] border-[#e4e4e4] w-[100px]" onClick={() => setOpen(false)}>
                                            {t("Close")}
                                        </button>
                                        {/* <button className="bg-primary-800 hover:bg-primary-900 text-white w-[100px] rounded-lg" onClick={() => {setTriggleFiter(true)}}>
                                            {t("search")}
                                        </button> */}
                                        <LoadingButton
                                            onClick={() => {setTriggleFiter(true)}}
                                            type="submit"
                                            variant="contained"
                                            loading={triggleFilter}
                                        >
                                            {t("search")}
                                        </LoadingButton>
                                    </div>
                                </div>
                                {/* <AddTruckForm refetch={refetch} fleets={fleets} setOpenForm={setOpenForm} /> */}
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition.Root>
        </>
    );
};

export default FilterRightBar;
