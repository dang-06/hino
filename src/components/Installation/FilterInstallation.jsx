import react, { useEffect, useState } from "react";
import { CustomAsyncSelect } from "..";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import CustomSelect from "../FormField/CustomSelect";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { DesktopDatePicker, DatePicker } from "@mui/x-date-pickers";
import CustomDateField from "../FormField/CustomDateField";
import { useForm } from "react-hook-form";
import CustomTextField from "../FormField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  expenseTypes,
  listStaffPosition,
  listStaffType,
  reportTypes,
} from "../../constants/constants";

const FilterInstallation = ({
  filter,
  setFilter,
  triggleFiter,
  setTriggleFiter,
}) => {
  const { t } = useTranslation();

  const siteLocation = useSelector((state) => state.mapLocation);

  const schema = yup.object().shape({
    // from_date: yup.date().default(() => new Date()),
    // to_date: yup
    //     .date()
    //     .when(
    //         "createdFrom",
    //         (dateTo, schema) => dateTo && schema.min(dateTo, 'From date must greater or equal To date')),
  });

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      from_date: "",
      to_date: "",
      status: "",
    },
  });

  const watchType = watch("reportType", 1); // you can supply default value as second argument

  useEffect(
    (_) => {
      if (filter) {
        console.log(filter);
        reset(filter);
      }
    },
    [filter]
  );

  useEffect(
    (_) => {
      // alert( triggleFiter)
      if (triggleFiter) {
        handleSubmit(onSubmit)();
        // setFilter(selfFilter)

        setTimeout((_) => {
          setTriggleFiter(false);
        }, 100);
      }
    },
    [triggleFiter]
  );

  useEffect((_) => {
    reset();
  }, []);

  const onSubmit = async (data) => {
    let formData = {
      ...data,
      from_date: data.from_date
        ? dayjs(data.from_date).startOf("date").format("YYYY-MM-DD")
        : "",
      to_date: data.to_date
        ? dayjs(data.to_date).endOf("date").format("YYYY-MM-DD")
        : "",
    };
    setFilter(formData);
  };

  // useEffect(_ => {
  //     if(filter){
  //         setFilter(selfFilter)
  //     }
  // }, [filter])

  const handleChange = (e) => {};

  return (
    <>
      <form
        noValidate
        className="flex h-full flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex">
          <div className=" h-full max-w-full  px-4 sm:px-6">
            <div className="space-y-4 pb-5 pt-6">
              <CustomTextField
                name="search"
                label={t("searchJob")}
                control={control}
                errors={errors.search}
                // required
              />
              <CustomSelect
                name="status"
                label="status"
                control={control}
                setValue={setValue}
                options={[
                  { id: "", value: t("all") },
                  { id: "New", value: t("new") },
                  // { id: 'Assigned', value: t("assigned") },
                  {
                    id: "Finished Installation",
                    value: t("finishedInstallation"),
                  },
                  { id: "Completed", value: t("completed") },
                  { id: "Need Update", value: t("needUpdate") },
                  { id: "Updated", value: t("updated") },
                ]}
              />
              <CustomDateField
                name="from_date"
                label={t("fromDate")}
                control={control}
                errors={errors.from_date}
              />

              <CustomDateField
                name="to_date"
                label={t("toDate")}
                control={control}
                errors={errors.to_date}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default FilterInstallation;
