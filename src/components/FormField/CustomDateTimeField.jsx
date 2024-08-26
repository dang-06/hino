import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DateTimePicker  } from "@mui/x-date-pickers/DateTimePicker ";

const CustomDateTimeField = ({ name, label, format = "HH:mm DD/MM/YYYY", control, errors, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <DateTimePicker
          value={value}
          onChange={(value) => {
            onChange(dayjs(value).format());
          }}
          inputFormat={format}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t(label)}
              variant="outlined"
              fullWidth
              error={!!errors}
              helperText={
                errors
                  ? errors?.message
                  : ""
              }
              {...rest}
            />
          )}
        />
      )}
    />
  );
};

export default CustomDateTimeField;
