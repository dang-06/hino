import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  FlagIcon,
  LinkIcon,
  UsersIcon,
  LocationMarkerIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { FiUser } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/constants";

const navigation = [
  // { name: "profile", href: "profile", icon: FiUser },
  // { name: "settings", href: "#!", icon: CogIcon },
  // {
  //   name: "notification",
  //   href: "#!",
  //   icon: BellIcon,
  // },
  // {
  //   name: "paymentOfServices",
  //   href: "#!",
  //   icon: CreditCardIcon,
  // },
  // { name: "language", href: "#!", icon: FlagIcon },
  // { name: "link", href: "#!", icon: LinkIcon },
];
const secondaryNavigation = [
  {
    name: "Staff",
    href: "staff",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "Delivery Status",
    href: "delivery-status",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "Delivery Type",
    href: "delivery-type",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "Document Type",
    href: "document-type",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "ID Pickup",
    href: "pickup",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "ID Sender",
    href: "sender",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "ID Site DC",
    href: "site",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "area",
    href: "area",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "IDDeliveryShipTo",
    href: "delivery-rtt",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "Type Of Cargo",
    href: "type-of-cargo",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
  {
    name: "Unit",
    href: "unit",
    icon: UsersIcon,
    role: [ROLES.Company, ROLES.Admin],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MasterData = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <>
          <Outlet />

      {/* <div className="flex h-full py-8 pl-2">
        <nav
          className="w-80 flex-shrink-0 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="space-y-1 px-2">
            {secondaryNavigation
              .filter((x) => x.role.indexOf(role) > -1)
              .map((item, index) => {
                const current = "/master-data/" + item.href === location.pathname;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={classNames(
                      current ? "bg-white text-primary-500" : "",
                      "group flex items-center rounded-md px-2 py-2 text-base hover:bg-white hover:text-primary-500"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        current
                          ? "text-primary-500"
                          : "text-gray-400 group-hover:text-primary-500",
                        "mr-4 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {t(item.name)}
                  </Link>
                );
              })}
          </div>
          <div className="mt-4 pt-4">
            <div className="space-y-1 px-2">
              {navigation.map((item) => {
                const current = "/master-data/" + item.href === location.pathname;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      current
                        ? "bg-white text-primary-500"
                        : "hover:bg-white hover:text-primary-500",
                      "group flex items-center rounded-md px-2 py-2 text-base"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-primary-500"
                          : "text-gray-400 group-hover:text-primary-500",
                        "mr-4 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {t(item.name)}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="flex-1">
        </div>
      </div> */}
    </>
  );
};

export default MasterData;
