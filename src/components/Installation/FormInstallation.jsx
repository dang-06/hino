
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
    "model": "",
    "lot_no": "",
    "vin_no": "",
    "engine_no": "",
    "installation_type": "",
    "note": "",
    "installation_location": "",
    "installation_date": null,
    "special_equipment": "",
    "manufacture_date": ""
  }

  // Validation
  const schema = yup.object().shape({
    model: yup.string().required(t("Model is required")),
    lot_no: yup.string().required(t("Lot number is required")),
    vin_no: yup.string().required(t("VIN number is required")),
    engine_no: yup.string().required(t("Engine number is required")),
    note: yup.string().nullable(),
    installation_location: yup.string().nullable(),
    installation_date: yup.date().nullable().required(t("Installation date is required")),
    special_equipment: yup.string().nullable(),
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
    const transformData = {
      ...data,
      installation_date: formatDate(data.installation_date),
      manufacture_date: formatDate(data.manufacture_date),
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
      console.log(error)
      console.log(data.vin_no)
      toast.error(t("vinNoAlreadyExists", { vin_no: data.vin_no }));
      // if (error?.data?.status === 400) {
      //   toast.error('Error');
      //   toast.error(error.data.validMsgList?.plateLicence[0]);
      // }
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
                  {t("addTitle", { field: t("Installation") })}
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
                        name="model"
                        label={t("model")}
                        control={control}
                        errors={errors.model}
                        required
                      />
                      <CustomTextField
                        name="lot_no"
                        label={t("lotNo")}
                        control={control}
                        errors={errors.lot_no}
                        required
                      />
                      <CustomTextField
                        name="vin_no"
                        label={t("vin")}
                        control={control}
                        errors={errors.vin_no}
                        required
                      />
                      <CustomTextField
                        name="engine_no"
                        label={t("engineNo")}
                        control={control}
                        errors={errors.engine_no}
                        required
                      />
                      <CustomSelect
                        name="installation_type"
                        label={t("installationType")}
                        control={control}
                        errors={errors.installation_type}
                        options={[
                          { id: 'Install Demo', value: t('Install Demo') },
                          { id: 'New Install', value: t('New Install') },
                          { id: 'Reinstall', value: t('Reinstall') },
                          { id: 'Transfer Installation', value: t('Transfer Installation') },
                          { id: 'Repair/Fix', value: t('Repair/Fix') },
                          { id: 'Uninstall Onelink', value: t('Uninstall Onelink') },
                          { id: 'Remove it for the customer', value: t('Remove it for the customer') },
                        ]}
                      />
                      <CustomTextField
                        name="note"
                        label={t("note")}
                        control={control}
                        errors={errors.note}
                      />
                      <CustomTextField
                        name="installation_location"
                        label={t("installationLocation")}
                        control={control}
                        errors={errors.installation_location}
                      />
                      <CustomDateField
                        name="installation_date"
                        label={t("installationDate")}
                        control={control}
                        errors={errors.installation_date}
                        required
                      />
                      <CustomTextField
                        name="special_equipment"
                        label={t("specialEquipment")}
                        control={control}
                        errors={errors.special_equipment}
                      />
                      <CustomDateField
                        name="manufacture_date"
                        label={t("manufactureDate")}
                        control={control}
                        errors={errors.manufacture_date}
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
                        // errors={errors.isActive}
                        options={[
                          { id: 'Install Demo', value: 'Install Demo' },
                          { id: 'New Install', value: 'New Install' },
                          { id: 'Reinstall', value: 'Reinstall' },
                          { id: 'Transfer Installation', value: 'Transfer Installation' },
                          { id: 'Repair/fix', value: 'Repair/fix' },
                          { id: 'Uninstall Onelink', value: 'Uninstall Onelink' },
                          { id: 'Remove it for the customer', value: 'Remove it for the customer' },
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
                      <CustomTextField
                        name="special_equipment"
                        label={t("specialEquipment")}
                        control={control}
                        errors={errors.englishName}
                      />
                      <CustomTextField
                        name="manufacture_date"
                        label={t("manufactureDate")}
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
