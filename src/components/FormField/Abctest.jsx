import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../utils/common";

const Abctest = ({ fetchApi, control, errors, label, data, isLoading, isFetching, onChange, setSearch, multiple = true, className = "w-[300px]", defaultValue, ...rest }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('')
    useDebounce(() => {
        if(value){
            fetchApi(value)
        }
      }, [value], 500
    );
    useEffect(_ => {
        console.log(control)
    }, [control])
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
            onChange={(event, newValue) => {
                if(multiple){
                    let list = newValue.map(i => i.id)
                    onChange(list)
                }else{
                    onChange(newValue?.id)
                }
            }}
            options={data || []}
            loading={isLoading || isFetching}
            onInputChange={(event, value, reason) => {
                if (reason == 'input' && event.type == 'change') {
                    setValue(value)
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
                if(typeof option.text != 'string'){
                    option.text =  option.text.toString()
                    console.log(option.text)
                }
                return option.text
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => (
                <li {...props} className="grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-200" key={option.id}>
                    <p className="col-span-2 pl-2">{option.text}</p>
                </li>
            )}
        />
    );
};

export default Abctest;
