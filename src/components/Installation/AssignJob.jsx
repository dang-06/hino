import React, { Fragment, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import {
  useAssignJobMutation
} from "../../services/apiSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { CustomAsyncSelect } from "..";
import CustomAsyncApiSelect from "../FormField/CustomAsyncApiSelect";
import * as api from "../../api";
import CustomSelect from "../FormField/CustomSelect";
import CustomAsyncApiSelect2 from "../FormField/CustomAsyncApiSelect2";


const AssignJob = ({ open, setOpen }) => {
  const { t } = useTranslation();

  const [assignJob, { isLoading: isLoading }] = useAssignJobMutation();
  const [listTechnician, setListTechnician] = useState([])
  const [isLoadingTechnician, setIsLoadingTechnician] = useState(false)
  const [isLoadingJob, setIsLoadingJob] = useState(false)
  const [listJob, setListjob] = useState([])

  const defaultValues = {
    "technician_id": "",
    "job_ids": [],
  }


  useEffect(() => {
    reset(defaultValues);
  }, [])

  useEffect(() => {
    fetchTechnician()
  }, [])


  // Validation
  const schema = yup.object().shape({

  });

  const fetchTechnician = async () => {
    try {
      setIsLoadingTechnician(true)
      const response = await api.fetchTechnician();
      if (response.status === 200) {
        console.log(response);

        const value = (response?.data?.data || []).map(x => {
          return Object.assign({ id: x.user_id, value: x.full_name })
        })
        setListTechnician(value)
        console.log(value)
        setIsLoadingTechnician(false)
      }
      setIsLoadingTechnician(false)
    } catch (error) {
      setIsLoadingTechnician(false)
      // toast.error(error.response.data?.title);
    }
  }

  const fetchJob = async (name) => {
    try { 
      setIsLoadingJob(true)
      const response = await api.fetchJob(`status=New&search=${name}`);
      if (response.status === 200) {
        const value = (response?.data?.data.jobs || []).map(x => {
          return Object.assign({ id: x.job_id, text: `${x.vin_no} || ${x.installation_location} || ${x.job_status}` })
        })
        setListjob(value)
        console.log(setListjob(value))
        setIsLoadingJob(false)
      }
      setIsLoadingJob(false)
    } catch (error) {
      setIsLoadingJob(false)
      // toast.error(error.response.data?.title);
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const transformData = {
      ...data,
    };

    try {

      await assignJob(transformData).unwrap();
      toast.success(
        t("message.success.add", {
          field: t("Installation"),
        })
      );
      setTriggleSubmit(false)
      reset(defaultValues);
      setOpen(false);
    } catch (error) {
      setTriggleSubmit(false)
      if (error?.data?.status === 400) {
        toast.error('Error');
        // toast.error(error.data.validMsgList?.plateLicence[0]);
      }
    }
  };

  const onClose = () => {
    setOpen(false);
    clearErrors();
    reset(defaultValues);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-auto rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
          <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-2xl font-medium capitalize">
              {t("assignJobToTechnician")}
            </span>
          </div>
          <form
            noValidate
            className="flex h-full flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative flex">
                <div className="px-4 sm:px-6 w-full h-full flex flex-col gap-3 justify-between">
                  <div className="space-y-3 pt-6 pb-5 basis-1/2">
                    <CustomSelect
                      name="technician_id"
                      label={t("technicianId")}
                      control={control}
                      // errors={errors.isActive}
                      options={listTechnician}
                    />
                    <CustomAsyncApiSelect2
                      className="w-full"
                      name="job_ids"
                      fetchApi={fetchJob}
                      label="jobs"
                      defaultValue={[]}
                      data={listJob}
                      multiple={true}
                      errors={errors.job_ids}
                      isFetching={isLoadingJob}
                      isLoading={isLoadingJob}
                      control={control}
                      onChange={(e) => {
                        setValue(`job_ids`, e, { shouldValidate: true })
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end gap-4">
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
                {t("submit")}
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssignJob;
