import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputValidation from "../components/FormField/InputValidation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ROLES } from "../constants/constants";
import { getProfile, updateProfile } from "../api";
import toast from "react-hot-toast";

const Profile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth);
  const { role } = user?.user;

  const schema = yup.object().shape({
    companyName: yup
      .string()
      .required(t("message.validation.required", { field: t("companyName") })),
    fullName: yup
      .string()
      .required(t("message.validation.required", { field: t("fullName") })),
    phoneNumber: yup
      .string()
      .required(
        t("message.validation.required", {
          field: t("phone"),
        })
      )
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("message.validation.invalid", {
          field: t("phone"),
        })
      ),
    email: yup.string().email(
      t("message.validation.invalid", {
        field: t("email"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchProfile = async () => {
    let url = "";
    if (role === ROLES.Carrier) {
      url = "/api/carrier/profile";
    } else if (role === ROLES.Company) {
      url = "/api/company/profile";
    } else if (role === ROLES.Driver) {
      url = "/api/driver/profile";
    }

    try {
      const response = await getProfile(url);
      const data = response.data;
      if (role === ROLES.Company) {
        setValue("companyId", data.companyId);
        setValue("companyName", data.companyName);
        setValue("address", data.address);
        setValue("taxCode", data.taxCode);
        setValue("bankAccount", data.bankAccount);
        setValue("bankName", data.bankName);
        setValue("bankNumber", data.bankNumber);
        setValue("description", data.description);
      } else {
        setValue("companyName", data.companyName);
        setValue("fullName", data.fullName);
        setValue("address", data.address);
        setValue("phoneNumber", data.phoneNumber);
        setValue("email", data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    let url = "";
    if (role === ROLES.Carrier) {
      url = "/api/carrier/profile/update";
    } else if (role === ROLES.Company) {
      url = "/api/company/profile/update";
    } else if (role === ROLES.Driver) {
      url = "/api/driver/profile/update";
    }

    try {
      await updateProfile(url, data);
      toast.success(t("message.success.update", { field: t("profile") }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="px-4 sm:px-6 lg:mx-auto lg:max-w-full lg:px-8"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can recieve mail.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <InputValidation
                id="companyName"
                label={t("companyName")}
                {...register("companyName")}
                errors={errors.companyName}
                placeholder={t("companyName")}
                required
                disabled={role !== ROLES.Company}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputValidation
                id="fullName"
                label={t("fullName")}
                {...register("fullName")}
                errors={errors.fullName}
                placeholder={t("fullName")}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <InputValidation
                id="address"
                label={t("address")}
                {...register("address")}
                errors={errors.address}
                placeholder={t("address")}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <InputValidation
                id="phoneNumber"
                label={t("phoneNumber")}
                {...register("phoneNumber")}
                errors={errors.phoneNumber}
                placeholder={t("phoneNumber")}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <InputValidation
                id="email"
                label={t("email")}
                {...register("email")}
                errors={errors.email}
                placeholder={t("email")}
              />
            </div>

            {role === ROLES.Company && (
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <InputValidation
                  id="taxCode"
                  label={t("taxCode")}
                  {...register("taxCode")}
                  errors={errors.taxCode}
                  placeholder={t("taxCode")}
                />
              </div>
            )}

            {role !== ROLES.Company && (
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <InputValidation
                  id="idCard"
                  label={t("idCard")}
                  {...register("idCard")}
                  errors={errors.idCard}
                  placeholder={t("idCard")}
                />
              </div>
            )}

            {role === ROLES.Company && (
              <>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <InputValidation
                    id="bankAccount"
                    label={t("bankAccount")}
                    {...register("bankAccount")}
                    errors={errors.bankAccount}
                    placeholder={t("bankAccount")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <InputValidation
                    id="bankName"
                    label={t("bankName")}
                    {...register("bankName")}
                    errors={errors.bankName}
                    placeholder={t("bankName")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <InputValidation
                    id="bankNumber"
                    label={t("bankNumber")}
                    {...register("bankNumber")}
                    errors={errors.bankNumber}
                    placeholder={t("bankNumber")}
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("description")}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    {...register("description")}
                    rows={10}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    defaultValue=""
                    placeholder={t("description")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <LoadingButton type="submit" variant="contained">
            {t("save")}
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default Profile;
