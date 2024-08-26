import React from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Breadcrumbs = ({sidebarOpen}) => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const { t } = useTranslation();

  return (
    <div className="bg-white">

        <nav className="py-3 border-l border-b px-2" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
            <li>
            <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </Link>
            </div>
            </li>
            {pathNames.map((name, index) => {
            const routeTo = `${pathNames.slice(0, index + 1).join("/")}`;
            return (
                <li key={name}>
                <div className="flex items-center">
                    <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <Link
                    to={routeTo}
                    className="ml-4 text-[13px] font-light text-gray-500 hover:text-gray-700 capitalize"
                    >
                    {t(name)}
                    </Link>
                </div>
                </li>
            );
            })}
        </ol>
        </nav>
    </div>
  );
};

export default Breadcrumbs;
