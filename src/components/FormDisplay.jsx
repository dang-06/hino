import React, { Fragment } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";

const FormDisplay = ({ open, setOpen, children }) => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <div className="w-[100vw] h-[100vh] top-0 left-0 fixed z-[999]">
                    <span className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#00000080] z-10" onClick={() => setOpen(false)}></span>
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
                            <div className="pointer-events-auto w-screen max-w-5xl bg-white">
                                {children}
                                {/* <AddTruckForm fleets={[]}/> */}
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition.Root>
        </>
    );
};

export default FormDisplay;
