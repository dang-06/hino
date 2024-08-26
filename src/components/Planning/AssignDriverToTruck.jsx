import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { fetchDrivers, assignDriverToTruck } from "../../api";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineUserAdd } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 3,
};

const AssignDriverToTruck = ({ truck, refetch }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (!selectedGroup) return;
    const getDrivers = async () => {
      try {
        const response = await fetchDrivers({
          rowsPerPage: 1000,
          groupId: selectedGroup,
          isMapped: false,
        });
        setDrivers(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getDrivers();
  }, [selectedGroup]);

  // Validation
  const schema = yup.object().shape({
    driverId: yup
      .string()
      .required(t("message.validation.required", { field: t("driverName") })),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      truckId: truck.id,
      driverId: null,
    },
  });

  const handleOpen = () => {
    setSelectedGroup(truck.groupId);
    setOpen(true);
  };

  const onClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await assignDriverToTruck(data);
      toast.success(
        t("message.success.assigned", { from: t("driver"), to: t("truck") })
      );
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.title);
    }
  };

  return (
    <>
      <Tooltip title={t("assignDriver")} placement="top-start" arrow>
        <a
          onClick={handleOpen}
          className="group cursor-pointer rounded-lg border border-gray-200 p-1 text-indigo-500 hover:bg-indigo-500"
        >
          <AiOutlineUserAdd className="h-5 w-5 group-hover:text-white" />
        </a>
      </Tooltip>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="focus:outline-none">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" component="h2" className="capitalize">
              {t("assignDriver")}
            </Typography>
            <div className="mt-4 space-y-4">
              <p className="font-medium">
                {t("plateLicense")}:{" "}
                <span className="text-orange-500">{truck.plateLicence}</span>
              </p>
              <Controller
                name="driverId"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={null}
                    onChange={(event, newValue) => {
                      onChange(newValue.id);
                    }}
                    id="combo-box-demo"
                    options={drivers.map((item) => ({
                      id: item.id,
                      label: item.fullName,
                    }))}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("driver")}
                        variant="standard"
                        error={!!errors.driverId}
                        helperText={
                          errors.driverId ? errors.driverId?.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
              <div className="text-right">
                <Button type="submit" variant="outlined">
                  {t("confirm")}
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AssignDriverToTruck;
