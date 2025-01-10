
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
import {
  useAddInstallationMutation,
  useUpdateInstallationMutation
} from "../../services/apiSlice";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomTextField from "../FormField/CustomTextField";
import Tooltip from "@mui/material/Tooltip";
import CustomDateTimeField from "../FormField/CustomDateTimeField";
import CustomDateField from "../FormField/CustomDateField";
import CustomSelect from "../FormField/CustomSelect";
import CustomSelect2 from "../FormField/CustomSelect2";

const FormInstallation = ({ selectedItem, triggleSubmit, setTriggleSubmit, submitError, refetch, setOpenForm }) => {
  const { t } = useTranslation();
  const [updateForm, { isLoading: isLoading1 }] = useUpdateInstallationMutation();
  const [addForm, { isLoading: isLoading2 }] = useAddInstallationMutation();



  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      console.log(selectedItem)
      // const response = fetchStaffDetail(selectedItem.id)
      // response.then(i => {
      //   console.log(i.data)
      //   reset(i.data)
      // })
      reset(selectedItem, { keepDirtyValues: true })
    } else {
      reset(defaultValues, { keepDirtyValues: true })
    }
  }, [selectedItem])

  const defaultValues = {
    "id": "",
    "segent": "",
    "model": "",
    "lot_no": "",
    "vin_no": "",
    "engine_no": "",
    "installation_type": "",
    "accessories": "",
    "note": "",
    "installation_location": "",
    "installation_date": ""

  }

  // Validation
  const schema = yup.object().shape({

  });

  useEffect(_ => {
    // console.log('triggle')
    if (triggleSubmit == true) {
      handleSubmit(onSubmit)()
      setTimeout(_ => {
        if (Object.keys(errors).length > 0) {
          submitError()
        }
      }, 100)
    }
  }, [triggleSubmit])


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

  const onSubmit = async (data) => {
    const date = new Date(data.installation_date);
    const formattedDate = date.toISOString().split('T')[0];
    const transformData = {
      ...data,
      installation_date: formattedDate
    };

    try {
      if (transformData.id) {
        await updateForm(transformData).unwrap();
        toast.success(
          t("message.success.update", {
            field: t("Installation"),
          })
        );
      } else {
        await addForm(transformData).unwrap();
        toast.success(
          t("message.success.add", {
            field: t("Installation"),
          })
        );
      }
      setTriggleSubmit(false)
      reset(defaultValues);
      refetch();
      setOpenForm(false);
    } catch (error) {
      setTriggleSubmit(false)
      if (error?.data?.status === 400) {
        toast.error('Error');
        // toast.error(error.data.validMsgList?.plateLicence[0]);
      }
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
                  {t("inspectionForm", { field: t("Installation") })}
                </h2>
                {/* <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("Installation") })}
                                    </p>
                                </div> */}
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
                loading={isLoading2}
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
              {!selectedItem?.id ?
                <div className="relative flex">
                  <div className="px-4 sm:px-6 w-full h-full">
                    <div className="space-y-6 pt-6 pb-5">
                      <CustomTextField
                        name="segment"
                        label={t("segment")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="model"
                        label={t("model")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="lot_no"
                        label={t("lotNo")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="vin_no"
                        label={t("vin")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="engine_no"
                        label={t("engineNo")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomSelect
                        name="installation_type"
                        label={t("installationType")}
                        control={control}
                        // errors={errors.isActive}
                        options={[
                          { id: 'New', value: 'New' },
                          { id: 'Assigned', value: 'Assigned' },
                          { id: 'Finished Installation', value: 'Finished Installation' },
                          { id: 'Completed', value: 'Completed' },
                          { id: 'Need Update', value: 'Need Update' },
                          { id: 'Updated', value: 'Updated' },
                        ]}
                      />
                      <CustomSelect
                        name="accessories"
                        label={t("accessories")}
                        control={control}
                        // errors={errors.isActive}
                        options={[
                          { id: 'Install Demo', value: 'Install Demo' },
                          { id: 'Reinstall', value: 'Reinstall' },
                          { id: 'Stick to move the car', value: 'Stick to move the car' },
                          { id: 'Repair/fix', value: 'Repair/fix' },
                          { id: 'Remove Onlink', value: 'Remove Onlink' },
                          { id: 'Take it off at the customer', value: 'Take it off at the customer' },
                        ]}
                      />
                      <CustomTextField
                        name="note"
                        label={t("note")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="installation_location"
                        label={t("installationLocation")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomDateField
                        name="installation_date"
                        label={t("installationDate")}
                        control={control}
                        errors={errors.englishName}
                      />
                    </div>
                  </div>
                </div>
                :
                <div className="relative flex">
                  <div className="px-4 sm:px-6 w-full h-full">
                    <div className="space-y-6 pt-6 pb-5">
                      <CustomTextField
                        name="model"
                        label={t("model")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="lot_no"
                        label={t("lotNo")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="vin_no"
                        label={t("vin")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="engine_no"
                        label={t("engineNo")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomSelect
                        name="installation_type" 
                        label={t("installationType")}
                        control={control}
                        options={[
                          { id: 'New', value: t("new") },
                          { id: 'Assigned', value: t("assigned") },
                          { id: 'Finished Installation', value: t("finishedInstallation") },
                          { id: 'Completed', value: t("completed") },
                          { id: 'Need Update', value: t("needUpdate") },
                          { id: 'Updated', value: t("updated") },
                        ]}
                      />
                      <CustomSelect
                        name="accessories"
                        label={t("accessories")} 
                        control={control}
                        options={[
                          { id: 'Install Demo', value: t("installDemo") },
                          { id: 'Reinstall', value: t("reinstall") },
                          { id: 'Stick to move the car', value: t("stickToMoveTheCar") },
                          { id: 'Repair/fix', value: t("repairFix") },
                          { id: 'Remove Onlink', value: t("removeOnlink") },
                          { id: 'Take it off at the customer', value: t("takeItOffAtTheCustomer") },
                        ]}
                      />
                      <CustomTextField
                        name="note"
                        label={t("note")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="installation_location"
                        label={t("installationLocation")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomDateField
                        name="installation_date"
                        label={t("installationDate")}
                        control={control}
                        errors={errors.englishName}
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormInstallation;
