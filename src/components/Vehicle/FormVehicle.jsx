import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FiUserPlus } from "react-icons/fi";
import * as yup from "yup";
import { useAddVehicleMutation, useUpdateVehicleMutation } from "../../services/apiSlice";
import CustomTextField from "../FormField/CustomTextField";
import Tooltip from "@mui/material/Tooltip";
import CustomDateField from "../FormField/CustomDateField";
import CustomSelect from "../FormField/CustomSelect";

const FormVehicle = ({ selectedItem, triggleSubmit, setTriggleSubmit, submitError, refetch, setOpenForm }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [addVehicle] = useAddVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      console.log("Selected item:", selectedItem);
      reset(selectedItem, { keepDirtyValues: true });
    } else {
      reset(defaultValues, { keepDirtyValues: true });
    }
  }, [selectedItem]);

  const defaultValues = {
    "id": "",
    "vin_no": "",
    "equipmentid": "",
    "simno": "",
    "active_date": null,
    "expire_date": null,
    "network_carrier": ""
  };

  // Validation
  const schema = yup.object().shape({
    vin_no: yup.string().required(t("Vin No is required")),
    equipmentid: yup.string().required(t("Equipment ID is required")),
    simno: yup.string().nullable(),
    // active_date: yup.date().nullable(),
    // expire_date: yup.date().nullable(),
    // network_carrier: yup.string().nullable()
  });

  useEffect(() => {
    if (triggleSubmit === true) {
      handleSubmit(onSubmit)();
      setTimeout(() => {
        if (Object.keys(errors).length > 0) {
          submitError();
        }
      }, 100);
    }
  }, [triggleSubmit]);

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const formatDate = (date) => {
    if (date && !isNaN(Date.parse(date))) {
      const _date = new Date(date);
      _date.setDate(_date.getDate() + 1);
      const formattedDate = _date.toISOString().split('T')[0];
      return formattedDate;
    } else {
      return '';
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      vin_no: data.vin_no,
      equipmentid: data.equipmentid,
      simno: data.simno,
    };

    try {
      if (data.id) {
        await updateVehicle(data).unwrap();
      } else {
        await addVehicle(payload).unwrap();
      }
      
      toast.success(
        data.id
          ? t("message.success.update", { field: t("Vehicle") })
          : t("message.success.add", { field: t("Vehicle") })
      );
      
      setTriggleSubmit(false);
      reset(defaultValues);
      refetch();
      setOpenForm(false);
    } catch (error) {
      setTriggleSubmit(false);
      console.error("API error:", error);
      
      const errorMessage = error?.data?.message || '';
      
      if (errorMessage.toLowerCase().includes('vin no')) {
        toast.error(t("vinNoAlreadyExists", { vin_no: data.vin_no }));
      } else {
        toast.error(t("An error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setOpenForm(false);
    clearErrors();
    reset(defaultValues);
  };

  return (
    <>
      <div className="flex h-full flex-col bg-white overflow-auto" style={{ height: 'calc(100vh - 110px)' }}>
        {!selectedItem?.id && (
          <div className="flex py-6 px-2 justify-between items-top border-b">
            <div className="flex">
              <div className="flex h-7 items-center justify-center gap-4">
                <button
                  type="button"
                  className="bg-transparent hover:bg-[#999] text-[#3d3b3b] p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={onClose}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col ml-3 items-start">
                <h2 className="text-lg font-medium capitalize ">
                  {t("addTitle", { field: t("Vehicle") })}
                </h2>
              </div>
            </div>
            <div className="mr-2">
              <Button variant="outlined" onClick={onClose}>
                {t("cancel")}
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                className="ml-3"
                onClick={() => handleSubmit(onSubmit)()}
                loading={isLoading}
              >
                {t("save")}
              </LoadingButton>
            </div>
          </div>
        )}
        <div className="overflow-auto pb-[50px]">
          <form
            noValidate
            className="flex h-full flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative flex">
                <div className="px-4 sm:px-6 w-full h-full">
                  <div className="space-y-6 pt-6 pb-5">
                    <CustomTextField
                      name="vin_no"
                      label={t("Vin No")}
                      control={control}
                      errors={errors.vin_no}
                      required
                    />
                    <CustomTextField
                      name="equipmentid"
                      label={t("Equipment ID")}
                      control={control}
                      errors={errors.equipmentid}
                      required
                    />
                    <CustomTextField
                      name="simno"
                      label={t("Sim No")}
                      control={control}
                      errors={errors.simno}
                    />
                    {/* <CustomDateField
                      name="active_date"
                      label={t("Active Date")}
                      control={control}
                      errors={errors.active_date}
                    />
                    <CustomDateField
                      name="expire_date"
                      label={t("Expire Date")}
                      control={control}
                      errors={errors.expire_date}
                    />
                    <CustomSelect
                      name="network_carrier"
                      label={t("Network Carrier")}
                      control={control}
                      errors={errors.network_carrier}
                      options={[
                        { id: 'Viettel', value: 'Viettel' },
                        { id: 'Mobifone', value: 'Mobifone' },
                        { id: 'Vinaphone', value: 'Vinaphone' },
                      ]}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormVehicle;