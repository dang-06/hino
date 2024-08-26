import React, { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const InputValidation = React.forwardRef(
  ({ id, label, errors, ...inputProps }, ref) => {
    const [showPass, setShowPass] = useState(false);

    const togglePassword = () => {
      setShowPass((prev) => !prev);
    };

    return (
      <>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}{" "}
          {inputProps.required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            ref={ref}
            {...inputProps}
            id={id}
            type={id === "password" ? (showPass ? "text" : "password") : "text"}
            className={`${
              errors
                ? "border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            } mt-1 block w-full rounded-md border py-2 pl-3 pr-8 shadow-sm  focus:outline-none  sm:text-sm`}
          />
          {id === "password" ? (
            !showPass ? (
              <MdOutlineVisibility
                className="absolute right-1.5 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
                onClick={togglePassword}
              />
            ) : (
              <MdOutlineVisibilityOff
                className="absolute right-1.5 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
                onClick={togglePassword}
              />
            )
          ) : null}
          {errors && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors && (
          <p className="mt-2 text-sm text-red-600">{errors.message}</p>
        )}
      </>
    );
  }
);

export default InputValidation;
