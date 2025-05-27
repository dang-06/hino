import { CheckIcon, XIcon } from "@heroicons/react/outline";
import LoadingButton from "@mui/lab//LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { importCustomer } from "../api";
import { ImageConfig } from "../utils/common";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
// import "./importCustomerFromExcel.css";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ImportExcelLayout = ({ refetch, open, setOpen, apiPath }) => {
  const { t } = useTranslation();
  //   const [open, setOpen] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [modalResult, setModalResult] = useState(false);
  const [modalResultValue, setModalResultValue] = useState({
    type: "success",
    message: "",
  });
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState(null);

  const onFileChange = (files) => {
    // console.log(files);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFileList(newFile);
      onFileChange(newFile);
    }
  };

  const fileRemove = () => {
    setFileList(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFileList(null);
    setOpen(false);
  };

  const onUploadFile = async () => {
    setIsLoading(true);
    const fd = new FormData();
    fd.append("file", fileList);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };

    try {
      const response = await apiPath(fd, options);
      console.log("API Response:", response);
      setData(response);
      setUploadPercentage(100);
      setModalResultValue({
        type: "success",
        message: t("importSuccessfully"),
      });
      setTimeout(() => {
        setUploadPercentage(0);
        handleClose();
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Import error:", error);
      let message = "";

      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response);
        message =
          error.response.data?.message ||
          error.response.data?.title ||
          `${t("requestFailedWithStatus")} ${error.response.status}`;

        if (error.response.status === 401) {
          message = t("unauthorizedAccess");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        message = t("noResponseFromServer");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        message = error.message;
      }

      setModalResultValue({ type: "error", message });
      setUploadPercentage(0);
    }
    setModalResult(true);
    setIsLoading(false);
  };

  return (
    <>
      {/* <div className="mt-4 flex items-center space-x-4 sm:mt-0">
        <Button
          variant="outlined"
          component="span"
          fullWidth
          onClick={handleOpen}
          startIcon={<img src="/images/excel.svg" className="h-6 w-6" />}
          className="shadow-sm"
        >
          {t("importExcel")}
        </Button>
      </div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-medium capitalize">
                  {t("importExcelTitle1")}
                </span>
              </div>
              <a
                href="/templates/HC2_Plan_Template.xlsx"
                download
                className="self-end text-indigo-500 underline"
              >
                {t("downloadTemplate")}
              </a>
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    ref={wrapperRef}
                    className="drop-file-input mt-2 w-full"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <div className="drop-file-input__label">
                      <img src="/images/cloud-upload.png" alt="cloud upload" />
                      <p>{t("Drag & Drop your files here")}</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                  </div>
                  {fileList && (
                    <div className="drop-file-preview w-full">
                      <p className="drop-file-preview__title">
                        {t("readyToUpload")}
                      </p>
                      <div className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[fileList.type.split("/")[1]] ||
                            ImageConfig["xlsx"]
                          }
                          alt=""
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{fileList.name}</p>
                          <p>{fileList.size}B</p>
                        </div>
                        <span
                          className="drop-file-preview__item__del"
                          onClick={() => fileRemove(fileList)}
                        >
                          x
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Box
                  sx={{ width: "100%" }}
                  className={uploadPercentage > 0 ? "opacity-100" : "opacity-0"}
                >
                  <LinearProgressWithLabel value={uploadPercentage} />
                </Box>
              </div>
            </div>
            <div className=" flex items-center justify-end gap-4">
              <Button variant="outlined" onClick={handleClose}>
                {t("cancel")}
              </Button>
              <LoadingButton
                variant="contained"
                onClick={onUploadFile}
                disabled={fileList ? false : true}
                loading={isLoading}
              >
                {t("import")}
              </LoadingButton>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={modalResult}
        onClose={() => setModalResult(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-3/4 items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="flex flex-col justify-center gap-[30px] text-center">
              {modalResultValue.type == "success" && (
                <>
                  {data?.data?.data?.total_new_jobs_imported === 0 ? (
                    <>
                      <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <ExclamationIcon
                          className="h-[80px] w-[80px] text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-center sm:mt-0">
                        <h3 className="text-lg font-medium leading-6 text-red-600">
                          {t("importFailed")}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-full bg-[#21DF7F38]">
                        <CheckIcon
                          className="h-[80px] w-[80px] text-[#21DF7F]"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-center sm:mt-0">
                        <h3 className="text-lg font-medium leading-6 text-[#21DF7F]">
                          {t("importPlanDataSuccessfully")}
                        </h3>
                      </div>
                    </>
                  )}
                  <div className="flex flex-col gap-[4px] text-left  text-sm text-gray-700">
                    <p>
                      <strong>{t("totalNewJobsImported")}: </strong>
                      {data?.data?.data?.total_new_jobs_imported}
                    </p>
                    {data?.data?.data?.existed_vin_no?.length > 0 && (
                      <p>
                        <strong>{t("existedVinNo")}: </strong>
                        {data.data.data.existed_vin_no.join(", ")}
                      </p>
                    )}
                    {data?.data?.data?.existed_engine_no?.length > 0 && (
                      <p>
                        <strong>{t("existedEngineNo")}: </strong>
                        {data.data.data.existed_engine_no.join(", ")}
                      </p>
                    )}
                    {data?.data?.data?.missing_data_rows?.length > 0 && (
                      <p>
                        <strong>{t("missingDataRows")}:</strong>{" "}
                        {data.data.data.missing_data_rows.join(", ")}
                      </p>
                    )}
                  </div>
                </>
              )}

              {modalResultValue.type == "error" && (
                <>
                  <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <ExclamationIcon
                      className="h-[80px] w-[80px] text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-center sm:mt-0">
                    <h3 className="text-lg font-medium leading-6 text-red-600">
                      {t("importFailed")}
                      {/* <span className="font-semibold text-red-500">{deleteId}</span> */}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {modalResultValue.message}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mt-5 justify-center gap-2 text-center sm:mt-4">
              <button
                type="button"
                className="mx-auto mt-3 inline-flex w-3/4 justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
                onClick={() => setModalResult(false)}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImportExcelLayout;
