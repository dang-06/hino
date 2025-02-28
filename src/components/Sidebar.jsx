import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    SortAscendingIcon,
    UsersIcon,
    XIcon,
} from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from "@mui/material";
import { FaWrench, FaCog, FaInfoCircle, FaTruckLoading, FaCommentDollar, FaBox, FaChartLine, FaMapMarkerAlt, FaTruck, FaRegPaperPlane, FaMapMarkedAlt, FaThLarge, FaUser, FaClipboardCheck, FaMoneyBillWave, FaBuilding, FaUserTie, FaRegUser, FaBriefcase, FaPlusSquare, FaCheckCircle, FaCheckDouble } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import PerfectScrollbar from "react-perfect-scrollbar";
import { LiaFileInvoiceSolid, LiaClipboardListSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { updateCommonValue } from "../features/common/commonSlice";

const navigation = [
    { name: "installation", href: "installation", icon: FaWrench, current: false },
    { name: "job", href: "job", icon: FaBriefcase, current: false },
    { name: "newJobs", href: "new-jobs", icon: FaPlusSquare, current: false },
    { name: "jobsFinished", href: "jobs-finished", icon: FaCheckCircle, current: false },
    { name: "jobsCompleted", href: "jobs-completed", icon: FaCheckDouble, current: false },
    { name: "usersManagement", href: "users-management", icon: FaUser, current: false },
    { name: "technicianKPI", href: "tech-kpi", icon: FaChartLine, current: false }
];

const toggleSideBar = (e) => {
    console.log(e)

    // let openSub = document.getElementsByClassName('sub-sidebar')
    let submenu = e.target.nextSibling
    // console.log(submenu, submenu.className)
    if (submenu) {

        if (submenu.className.includes('h-auto')) {
            submenu.className = submenu.className.replace('h-auto', 'h-[0]')
        } else {
            submenu.className = submenu.className.replace('h-[0]', 'h-auto')
        }

    }
}

const secondNavigation = [
    { name: "About", href: "about", icon: FaInfoCircle, current: false },
    { name: "App Gallery", href: "gallery", icon: FaThLarge, current: false },

]


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const [showSub, setShowSub] = useState('')
    const dispatch = useDispatch();
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    // useEffect(() => {
    //     console.log(sidebarOpen)
    // }, [sidebarOpen]);

    useEffect(() => {
        const currentNavItem = navigation.find(item => location.pathname.includes(item.href));
        if (currentNavItem) {
            dispatch(updateCommonValue({ field: 'currentPage', value: currentNavItem.name }));
        }
    }, [location.pathname, dispatch])
    return (
        // <Collapse>
        <div className="h-full overflow-x-hidden">
            <PerfectScrollbar>
                {/* <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {navigation.map((item, index) => {
                                            const current = location.pathname.includes(item.href);

                    return (
                        <ListItemButton>
                        <ListItemIcon>
                        <item.icon className={(current ? 'text-green-600 bg-gray-100' : 'text-[#0000008a]'  ) +" w-[21px] h-[21px] min-w-[21px] z-10"}></item.icon>
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                      </ListItemButton>
                    )
                })}
                </List> */}
                <ul className="h-full overflow-x-hidden">
                    {navigation.map((item, index) => {
                        // console.log(location.pathname.includes(item.href), item.href, location.pathname)
                        const current = location.pathname === `/${item.href}`;

                        return (
                            <li className="relative" key={index}>
                                <Tooltip title={item.name} placement="right-start" arrow>
                                    <>
                                        <Link className={classNames(
                                            "text-center px-4 flex py-2 rounded-full cursor-pointer ",
                                            current
                                                ? "bg-gray-100 text-green-600"
                                                : "hover:bg-gray-100 hover:text-green-600",
                                        )} to={item.href}
                                            onClick={(e) => {
                                                if (showSub == item.href) {
                                                    setShowSub('')
                                                } else {
                                                    setShowSub(item.href)
                                                }
                                            }}>
                                            <item.icon className={(current ? 'text-green-600 bg-gray-100' : 'text-[#0000008a]') + " w-[21px] h-[21px] min-w-[21px] z-10"}></item.icon>
                                            <span className="ml-4 whitespace-nowrap">
                                                {t(item.name)}
                                            </span>
                                        </Link>
                                        {item.children && (
                                            <span className="absolute top-[9px] text-primary-600 right-[10px] pl-[40px] z-1" onClick={(e) => {
                                                if (showSub == item.href) {
                                                    setShowSub('')
                                                } else {
                                                    setShowSub(item.href)

                                                }
                                                // toggleSideBar(e)
                                            }}>
                                                <FaChevronRight className={(showSub == item.href ? 'rotate-90' : 'rotate-0') + " origin-center w-4 h-4 transition-all cursor-pointer"} />
                                                {/* {(showSub ? <FaChevronRight className={showSub && 'rotate-45 '+" origin-center w-5 h-5 transition-all"} onClick={() => setShowSub(!showSub)}/> : <UsersIcon className="w-5 h-5" onClick={() => setShowSub(true)}/>)} */}
                                            </span>
                                        )}
                                    </>
                                </Tooltip>
                                {
                                    item.children && (
                                        <ul className={(showSub == item.href ? 'h-auto' : 'h-[0]') + " sub-sidebar transition-all duration-[500ms] overflow-hidden"}>
                                            {item.children.map((sub, subIndex) => {
                                                const listPath = location.pathname.split('/')
                                                const currentSub = listPath.includes(sub.href);
                                                return (
                                                    <li key={subIndex}>
                                                        <Tooltip title={sub.name} placement="right-start" arrow>
                                                            <Link className={classNames(
                                                                "text-center px-4 ml-[35px] text-[13px] flex py-2 rounded-full cursor-pointer ",
                                                                currentSub
                                                                    ? "bg-gray-100 text-green-600"
                                                                    : "hover:bg-gray-100 hover:text-green-600",
                                                            )} to={item.href + "/" + sub.href}>
                                                                <span className="ml-4 whitespace-nowrap">
                                                                    {t(sub.name)}
                                                                </span>
                                                            </Link>
                                                        </Tooltip>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })}
                </ul>
            </PerfectScrollbar>
            {
                secondNavigation && secondNavigation.length > 100 && (
                    <>
                        <Divider className="mb-2 mt-2" />
                        <ul className="overflow-hidden">
                            {secondNavigation.map((item, index) => {
                                // console.log(location.pathname.includes(item.href), item.href, location.pathname)
                                const current = location.pathname.includes(item.href);
                                return (
                                    <li key={index}>
                                        <Tooltip title={'item.name'} placement="right-start" arrow>

                                            <Link className={classNames(
                                                "text-center px-4 flex mb-2  py-2 rounded-full cursor-pointer ",
                                                current
                                                    ? "bg-gray-100 text-green-600"
                                                    : "hover:bg-gray-100 hover:text-green-600",
                                            )} to={item.href}>
                                                <item.icon className="w-[21px] h-[21px] min-w-[21px] text-[#0000008a]"></item.icon>
                                                <span className="ml-4 whitespace-nowrap">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </Tooltip>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )
            }
        </div >
        // </div>
        // </Collapse>
    );
};

export default Sidebar;
