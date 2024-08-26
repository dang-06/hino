import React from "react";
import { useTranslation } from "react-i18next";
import vi from "/images/vi.svg";
import en from "/images/us.svg";
import th from "/images/th.svg";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import cookies from "js-cookie";

const DropdownLanguage = () => {
  const { i18n } = useTranslation();
  const currentLanguageMode = cookies.get("i18next") || "en";
  const currentLanguage = () => {
    if (currentLanguageMode === "vi") {
      return (
        <>
          <img src={vi} alt="vn" />
          <span className="hidden sm:block">Tiếng Việt</span>
        </>
      );
    } else if (currentLanguageMode === "en") {
      return (
        <>
          <img src={en} alt="en" />
          <span className="hidden sm:block">English</span>
        </>
      );
    } else {
      return (
        <>
          <img src={th} alt="th" />
          <span className="hidden sm:block">ไทย</span>
        </>
      );
    }
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-start gap-1">
            {currentLanguage()}
            <ChevronRightIcon
              className={`w-4 text-gray-600 ${
                open ? "" : "rotate-90 transform"
              }`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-1 rounded-lg bg-white shadow-lg">
            {({ close }) => (
              <ul className="py-1 text-gray-700 dark:text-gray-400">
                <li>
                  <a
                    onClick={() => {
                      i18n.changeLanguage("vi");
                      close();
                    }}
                    className={`flex items-center justify-start gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                      currentLanguageMode === "vi"
                        ? "disabled"
                        : "cursor-pointer"
                    } `}
                  >
                    <img src={vi} alt="vn" />{" "}
                    <span className="hidden sm:block">Tiếng Việt</span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      i18n.changeLanguage("en");
                      close();
                    }}
                    className={`flex items-center justify-start gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                      currentLanguageMode === "en"
                        ? "disabled"
                        : "cursor-pointer"
                    } `}
                  >
                    <img src={en} alt="us" className="w-5" />{" "}
                    <span className="hidden sm:block">English</span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      i18n.changeLanguage("th");
                      close();
                    }}
                    className={`flex items-center justify-start gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                      currentLanguageMode === "th"
                        ? "disabled"
                        : "cursor-pointer"
                    } `}
                  >
                    <img src={th} alt="th" />{" "}
                    <span className="hidden sm:block">ไทย</span>
                  </a>
                </li>
              </ul>
            )}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default DropdownLanguage;
