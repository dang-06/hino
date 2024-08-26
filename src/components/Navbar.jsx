/* This example requires Tailwind CSS v2.0+ */
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, ChevronRightIcon, MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { DropdownLanguage } from ".";
import navigationData from "../data/navigation.json";
import userNavigationData from "../data/user_navigation.json";
import { logout } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, FilledInput, Tooltip } from '@mui/material';
import { RiMenuLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { MdArrowDropDown } from "react-icons/md";
import { TextField, Typography } from "@mui/material";

// import { useLazyGetUnAssignDOQuery } from "../services/apiSlice";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const common = useSelector(state => state.common)

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        console.log(item);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };

    const textFieldStyle = {
        padding: '10.5px !important',
    };


    const formatResult = (item) => {
        // console.log(item);
        return (
            <div className="result-wrapper">
                <span className="result-span"> {item}</span>
            </div>
        );
    };

    return (
        <div>
            <Popover as="nav" className="bg-white">
                {({ open }) => (
                    <>
                        <div className="flex">
                            <div className="w-[250px] text-center bg-white border-b">
                                <span>
                                    {/* <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            id="Group_13419" 
                                            
                                            width="46.008" 
                                            height="46.008" 
                                            viewBox="0 0 46.008 46.008">
                                            <defs>
                                                <linearGradient id="linear-gradient" x1="-3.708" y1="8.974" x2="-3.708" y2="8.961" gradientUnits="objectBoundingBox">
                                                <stop offset="0" stopColor="#3ccb51"/>
                                                <stop offset="1" stopColor="#32d74b"/>
                                                </linearGradient>
                                            </defs>
                                            <path id="Rectangle_5492"  d="M316.846,124.008H303.161A16.161,16.161,0,0,1,287,107.846V94.161A16.161,16.161,0,0,1,303.161,78h10.964a18.882,18.882,0,0,1,18.882,18.882v10.964A16.161,16.161,0,0,1,316.846,124.008Z" transform="translate(-287 -78)" fill="url(#linear-gradient)"/>
                                            <path id="Path_23077" d="M341.817,104.654l-3.568,9.16a.028.028,0,0,1-.053,0l-3.071-8.146a1.575,1.575,0,0,0-1.6-1.032H332.8s.008.138,0,0h-1.559a.028.028,0,0,0-.024.039l.4.991q.974,2.561,2,5.3t2.009,5.37a4.175,4.175,0,0,0,.3.609,3.278,3.278,0,0,0,.519.669,3.029,3.029,0,0,0,.739.544,2.211,2.211,0,0,0,1,.247h.028a2.212,2.212,0,0,0,1.053-.249,3.192,3.192,0,0,0,.717-.508,2.845,2.845,0,0,0,.548-.7,4.757,4.757,0,0,0,.29-.614c.737-1.935,1.42-3.7,2.031-5.258q.389-1,.764-1.944t.673-1.724l.473-1.239c.1-.261.161-.418.176-.453l.525-1.036a.029.029,0,0,0-.026-.042l-3.595,0A.029.029,0,0,0,341.817,104.654Z" transform="translate(-304.796 -88.721)" fill="#fff"/>
                                            <path id="Path_23078"  d="M318.5,106.385a6.927,6.927,0,0,0-4.891-2.032h-.081a6.782,6.782,0,0,0-2.66.538,6.965,6.965,0,0,0-3.7,3.69,6.679,6.679,0,0,0-.541,2.677,6.927,6.927,0,0,0,4.242,6.435,6.779,6.779,0,0,0,2.651.538h.067a6.946,6.946,0,0,0,6.946-6.963h0a6.7,6.7,0,0,0-.541-2.689A6.964,6.964,0,0,0,318.5,106.385Zm-1.532,6.317a3.81,3.81,0,0,1-.8,1.175,3.591,3.591,0,0,1-1.179.781,3.474,3.474,0,0,1-1.427.283h-.023a3.557,3.557,0,0,1-1.4-.284,3.608,3.608,0,0,1-1.164-.777,3.816,3.816,0,0,1-.8-1.177,3.48,3.48,0,0,1-.292-1.434,3.411,3.411,0,0,1,.292-1.4,3.817,3.817,0,0,1,.8-1.175,3.626,3.626,0,0,1,1.17-.787,3.564,3.564,0,0,1,1.4-.282h.032a3.659,3.659,0,0,1,1.42.286,3.571,3.571,0,0,1,1.172.777,3.829,3.829,0,0,1,.8,1.179,3.423,3.423,0,0,1,.289,1.411,3.475,3.475,0,0,1-.291,1.426Z" transform="translate(-294.9 -88.607)" fill="#fff"/>
                                            <g id="Group_13059"  transform="translate(5.394 15.776)">
                                                <path id="Path_23079"  d="M296.028,111.523l.032,9.617a.028.028,0,0,0,.029.029H299.3a.029.029,0,0,0,.029-.029l-.028-7.88a1.77,1.77,0,0,0-1.767-1.763l-1.476,0A.029.029,0,0,0,296.028,111.523Z" transform="translate(-296.028 -107.258)" fill="#fff"/>
                                                <circle id="Ellipse_1689" cx="1.65" cy="1.65" r="1.65" fill="#fff"/>
                                            </g>
                                        </svg> */}
                                </span>
                                <div className="w-full h-full flex">
                                    <RiMenuLine className="text-danger w-[21px] h-[21px] min-w-[21px] m-[14px] ml-[20px] mr-[20px] z-10 cursor-pointer" onClick={() => toggleSidebar(!sidebarOpen)} />
                                    <Link to="dashboard" className="h-[21px] max-w-[155px]">
                                        <img
                                            className="block h-auto w-auto"
                                            src="/images/onelinkHino.png"
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 px-3 flex h-16 items-center justify-between bg-white border-b">
                                <div className="flex ">
                                    <div className="flex flex-shrink-0 items-center ">
                                        {/* <Link to="dashboard" className="gap-[15px] flex">
                                            <img
                                                className="block h-8 w-auto"
                                                src="/images/wareflex-logo-main.png"
                                                alt="logo"
                                            />
                                            <img
                                                className="block h-8 w-auto"
                                                src="/images/fsimage.png"
                                                alt="logo"
                                            />
                                        </Link> */}
                                        {/* <h2 className="text-[22px] font-bold items-center flex">{common?.currentPage}</h2>
                                        <span className="ml-1 rounded-full px-1 h-[25px] leading-[24px] text-center bg-[#ECFDF5] text-[#10B981]"> {common.totalRecord}</span> */}

                                        {/* <span className="text-[14px] ml-2 text-[#2baf00] rounded-full w-[25px] h-[25px] leading-[24px] text-center bg-[#e5ffcf]">{common.totalRecord}</span> */}
                                    </div>
                                    {/* <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-4">
                                        {navigationData.filter(i => !i.hidden).map((item) => {
                                            const current = location?.pathname.includes(item.href);
                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        current
                                                            ? "border-primary-500 text-gray-900"
                                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                                        "inline-flex items-center border-b-2 px-1 pt-1 font-medium "
                                                    )}
                                                    aria-current={current ? "page" : undefined}
                                                >
                                                    {t(item.name)}
                                                </Link>
                                            );
                                        })}
                                    </div> */}
                                </div>
                                {/* <div className="w-1/4 ">
                                    <div className="w-[24] relative flex items-center justify-center h-[40px]" >
                                    <TextField className="ml-2"
                                            type="date"
                                            defaultValue="dd/mm/yy"
                                        />
                                        <TextField className=" mr-2"
                                            type="date"
                                            defaultValue="dd/mm/yy"
                                        />
                                    </div>
                                </div> */}
                                <div className="searchSection w-5/12 ">
                                    <div className="w-[24] relative flex items-center justify-center h-[35px]" >
                                        <SearchIcon className="absolute h-6 w-6 mr-8 left-[12px] top-[7px] text-[#666]" aria-hidden="true" />
                                        <input type="search" placeholder={`Search ${common?.currentPage}`} className="text-[#666] overflow-hidden rounded-[8px] h-[40px] pl-[50px] pr-3 flex-1 bg-gray-100 outline-none border-0 bg-[#f7f7f7] focus:bg-[#fff] focus:shadow-2xl" />
                                    </div>
                                </div>
                                <div className="hidden space-x-3 sm:ml-6 sm:flex sm:items-center">
                                    <button className="text-center border-0 h-[32px] flex items-center justify-center w-[32px] outline-none rounded-sm transition-all duration-[400ms] overflow-hidden border-[#0000003b] hover:bg-[#f1f1f1]">
                                        <span className="inline-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M5.80597 8.51163C5.80597 4.91535 8.57913 2 12 2C15.4209 2 18.194 4.91535 18.194 8.51163V11.329C18.194 12.4999 18.6829 13.6196 19.5463 14.4265C20.4952 15.3131 19.8566 16.8837 18.5472 16.8837H5.45275C4.14343 16.8837 3.50485 15.3131 4.45368 14.4265C5.31715 13.6196 5.80597 12.4999 5.80597 11.329V8.51163Z" fill="#868FA0" />
                                                <path d="M12.0001 22C13.6795 22 15.0409 20.7208 15.0409 19.1429C15.0409 19.1161 15.0405 19.0895 15.0397 19.0629C15.033 18.8324 14.8203 18.6648 14.5749 18.6622L9.43734 18.6075C9.19201 18.6048 8.9753 18.7679 8.96307 18.9981C8.96052 19.0461 8.95923 19.0943 8.95923 19.1429C8.95923 20.7208 10.3207 22 12.0001 22Z" fill="#868FA0" />
                                            </svg>
                                        </span>
                                    </button>
                                    {/* <div className="border rounded-[6px] border-[#0000003b] flex relative">
                                        <Tooltip title={'Sync'} placement="bottom-start" arrow>

                                            <button className="p-[5px] border-0 h-[30px] w-[30px] outline-none transition-all duration-[400ms] overflow-hidden border-[#0000003b] hover:bg-[#f1f1f1]">
                                                <TbRefresh className="m-auto"/>
                                            </button>
                                        </Tooltip>

                                        <Menu as="div" className="">
                                            <div>
                                                <Tooltip title={'View app status'} placement="bottom-start" arrow>
                                                 
                                                    <Menu.Button className="p-[5px] border-0 h-[30px] w-[30px] outline-none border-l transition-all duration-[400ms] overflow-hidden border-[#0000003b] hover:bg-[#f1f1f1]">
                                                        <MdArrowDropDown className="w-[20px] h-[20px]" />
                                                    </Menu.Button>
                                                </Tooltip>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-[250px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item className="bg-primary-100 px-2 py-3 text-[12px]">
                                                        <p>Last Sync: 18 phút trước</p>
                                                    </Menu.Item>
                                                    {userNavigationData.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) =>
                                                                item.onClick ? (
                                                                    <div
                                                                        className={classNames(
                                                                            active ? "bg-gray-100" : "",
                                                                            "text-gray-70 block cursor-pointer px-4 py-2"
                                                                        )}
                                                                        onClick={handleLogout}
                                                                    >
                                                                        {t(item.name)}
                                                                    </div>
                                                                ) : (
                                                                    <Link
                                                                        to={item.href}
                                                                        className={classNames(
                                                                            active ? "bg-gray-100" : "",
                                                                            "flex items-center px-4 py-2 text-gray-700"
                                                                        )}
                                                                    >
                                                                        <TbRefresh />
                                                                        <span className="ml-2">

                                                                        {t(item.name)}
                                                                        </span>
                                                                    </Link>
                                                                )
                                                            }
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                    </div> */}

                                    <DropdownLanguage />
                                    {/* <button
                                        type="button"
                                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    >
                                        <BellIcon className="h-5 w-5" aria-hidden="true" />
                                    </button> */}

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative z-10 ml-3">
                                        <div>
                                            <Menu.Button className="flex max-w-xs items-center gap-2 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 px-2">
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                {/* <span className="">{user?.fullName}</span> */}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigationData.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) =>
                                                            item.onClick ? (
                                                                <div
                                                                    className={classNames(
                                                                        active ? "bg-gray-100" : "",
                                                                        "text-gray-70 block cursor-pointer px-4 py-2"
                                                                    )}
                                                                    onClick={handleLogout}
                                                                >
                                                                    {t(item.name)}
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    to={item.href}
                                                                    className={classNames(
                                                                        active ? "bg-gray-100" : "",
                                                                        "block px-4 py-2 text-gray-700"
                                                                    )}
                                                                >
                                                                    {t(item.name)}
                                                                </Link>
                                                            )
                                                        }
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>

                                <div className="-mr-2 flex items-center gap-2 sm:hidden">
                                    {/* Mobile menu button */}
                                    <DropdownLanguage />
                                    <button
                                        type="button"
                                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    >
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    <Popover.Button className="inline-flex items-center justify-center rounded-full bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>

                        <Transition.Root as={Fragment}>
                            <div className="lg:hidden">
                                <Transition.Child
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="duration-150 ease-in"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <Transition.Child
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="duration-150 ease-in"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Popover.Panel
                                        focus
                                        className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                                    >
                                        {({ close }) => (
                                            <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="pt-3 pb-2">
                                                    <div className="flex items-center justify-between px-4">
                                                        <div>
                                                            <img
                                                                className="h-8 w-auto"
                                                                src="/images/logo-color.svg"
                                                                alt="logo"
                                                            />
                                                        </div>
                                                        <div className="-mr-2">
                                                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                                                <XIcon
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </Popover.Button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 space-y-1 px-2">
                                                        {navigationData.map((item) => {
                                                            const current =
                                                                location?.pathname === item.href;
                                                            return (
                                                                <Link
                                                                    key={item.name}
                                                                    to={item.href}
                                                                    onClick={() => close()}
                                                                    className={classNames(
                                                                        current
                                                                            ? "text-primary-500"
                                                                            : "border-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-800",
                                                                        "block rounded-md px-3 py-2 text-base font-medium"
                                                                    )}
                                                                >
                                                                    {t(item.name)}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="pt-4 pb-2 ">
                                                    <div className="flex items-center px-5">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-3 min-w-0 flex-1">
                                                            <div className="truncate text-base font-light text-gray-800">
                                                                {user.name}
                                                            </div>
                                                            <div className="truncate font-light text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                                        >
                                                            <BellIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 space-y-1 px-2">
                                                        {userNavigationData.map((item) =>
                                                            item.onClick ? (
                                                                <div
                                                                    key={item.name}
                                                                    onClick={() => dispatch(logout())}
                                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                                >
                                                                    {t(item.name)}
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    key={item.name}
                                                                    to={item.href}
                                                                    onClick={() => close()}
                                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                                >
                                                                    {t(item.name)}
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Popover.Panel>
                                </Transition.Child>
                            </div>
                        </Transition.Root>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default Navbar;
