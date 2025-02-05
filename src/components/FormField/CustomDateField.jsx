import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDateField = ({ name, label, format = "DD/MM/YYYY", control, errors, minDate, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
     
      render={({ field: { value, onChange } }) => (
        <DatePicker
          value={value ? value : null}
          sx={{ width: '100%' }}
          minDate={minDate ? minDate : null}
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

export default CustomDateField;
