import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";

const CustomImageUpload = ({ name, label, control, errors, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box>
          <Typography variant="body1" gutterBottom>
            {t(label)}
          </Typography>
          <Button
            variant="contained"
            component="label"
            fullWidth
            color={errors ? "error" : "primary"}
          >
            {t("Upload Image")}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    onChange(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              {...rest}
            />
          </Button>
          {errors && (
            <Typography variant="caption" color="error">
              {errors?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default CustomImageUpload;
