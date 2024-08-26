import React from "react";
import Modal from "@mui/material/Modal";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDeleteTruckMutation, useShipmentUpdateStatusMutation } from "../../services/apiSlice";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 3,
};
const CloseShipment = ({ open, setOpen, setCloseDetail, shipment }) => {
  const { t } = useTranslation();

  const [closeShipment, { isLoading: isLoading1, isError: isError1, error: error1 }] = useShipmentUpdateStatusMutation();


  const onDelete = async () => {
    try {
      const response = await closeShipment({id: shipment?.shipmentId, status: 7});
      toast.success(t("message.success.close", { field: t("shipment")}));
      setOpen(false);
      setCloseDetail(false)
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
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#00b11f2e] sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-[#00b11f]"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t("closeTitle", { field: t("shipment") })}{" "}
                <span className="font-semibold text-[#00b11f]">{shipment?.shipmentId}</span>
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {t("closeSubtitle", { name: t("shipment") })}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
            <LoadingButton
              variant="contained"
              color="info"
              onClick={onDelete}
              //loading={isLoading}
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

export default CloseShipment;
