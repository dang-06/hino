import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FilterSelect = ({label, data, isLoading, isFetching, onChange, setSearch, errors, multiple=true, className="w-[300px]", defaultValue, ...rest }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
   
  return (
    <Autocomplete
      fullWidth
      className={className}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      defaultValue={defaultValue}
      onChange={(event, newValue) => onChange(newValue?.id)}
      options={data || []}
      loading={isLoading || isFetching}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          {...rest}
          label={t(label)}
          variant="outlined"
          error={!!errors}
          helperText={errors ? errors.message : ""}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      getOptionLabel={(option) => {
        return option.text
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <li {...props} className="grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-200" key={option.id}>
          {/* <p className="font-medium text-amber-800">{option.id}</p> */}
          <p className="col-span-2 pl-2">{option.text}</p>
        </li>
      )}
    />
  );
};

export default FilterSelect;
