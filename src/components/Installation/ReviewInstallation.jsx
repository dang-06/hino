import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { useReviewInstallationMutation } from "../../services/apiSlice";
import toast from "react-hot-toast";
import { FaClipboardList, FaQuestionCircle } from "react-icons/fa";

const ReviewInstallation = ({ open, setOpen, reviewId }) => {
  const { t } = useTranslation();

  const [reviewQuery, { isLoading }] = useReviewInstallationMutation();

  const onReview = async (reviewed_status) => {
    try {
      const data = {
        job_id: reviewId,
        body: {
          reviewed_status: reviewed_status
        }
      }
      await reviewQuery(data);
      toast.success(t("message.success.Review", { field: t("Installation") }));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(reviewId)
      , [reviewId]
  })


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="sr-only">{t("close")}</span>
            ✕
          </button>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <FaQuestionCircle className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t("ReviewTitle")}{" "}
                <span className="font-semibold text-blue-500">{reviewId}</span>
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {t("ReviewSubtitle")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
            <LoadingButton
              variant="contained"
              color="success"
              onClick={() => onReview("Completed")}
              loading={isLoading}
            >
              {t("complete")}
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color="secondary"
              onClick={() => onReview("Need Update")}
            >
              {t("needUpdate")}
            </LoadingButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewInstallation;
