import React from "react";
import Modal from "@mui/material/Modal";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDeleteUserMutation } from "../../services/apiSlice";
import toast from "react-hot-toast";

const DeleteUser = ({ open, setOpen, deleteId }) => {
  const { t } = useTranslation();

  const [deleteQuery, { isLoading }] = useDeleteUserMutation();

  const onDelete = async () => {
    try {
      await deleteQuery(deleteId);
      toast.success(t("message.success.delete", { field: t("user") }));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t("deleteTitle", { field: t("user") })}{" "}
                <span className="font-semibold text-red-500">{deleteId}</span>
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {t("deleteSubtitle", { name: t("user") })}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
            <LoadingButton
              variant="contained"
              color="error"
              onClick={onDelete}
            // loading={isLoading}
            >
              {t("submit")}
            </LoadingButton>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUser;
