import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../utils/common";
import { BootstrapInput } from "./CustomTextField2";
import { Tooltip } from "@mui/material";

const CustomAsyncApiSelect2 = ({ fetchApi, control, errors, label, data, isLoading, isFetching, onChange, setSearch, multiple = true, className = "w-[300px]", defaultValue, value1, required, readOnly = false, infor, inforText = '', type = "text", placeholder, clearValue, ...rest }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('')
    useDebounce(() => {
        if (value) {
            fetchApi(value)
        }
    }, [value], 500
    );

    // useEffect(_ => {
    //     console.log(control)
    // }, [control])
    return (

        <Autocomplete
            fullWidth
            className={className}
            open={open}
            key={clearValue}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            defaultValue={defaultValue || null}
            onChange={(event, newValue) => {
                if (multiple) {
                    let list = newValue.map(i => i.id)
                    onChange(list)
                } else {
                    onChange(newValue?.id || null)
                }
            }}
            // value={value1}
            options={data || []}
            loading={isLoading || isFetching}
            onInputChange={(event, value, reason) => {
                if (reason == 'input' && event.type == 'change') {
                    setValue(value)
                }
            }}
            sx={{
                ".MuiAutocomplete-inputRoot": {
                    paddingRight: '0 !important'
                },
                ".MuiAutocomplete-tag": {
                    height: 'auto'
                }
            }}
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
                if (typeof option.text != 'string') {
                    option.text = option.text.toString()
                }
                return option.text
            }}
            isOptionEqualToValue={(option, value) => {
                return option.id == value.id
            }}
            renderOption={(props, option) => (
                <li {...props} className="grid cursor-pointer p-2 hover:bg-gray-200" key={option.id}>
                    <p className="col-span-2 pl-2">{option.text}</p>
                </li>
            )}
        />
    );
};

export default CustomAsyncApiSelect2;
