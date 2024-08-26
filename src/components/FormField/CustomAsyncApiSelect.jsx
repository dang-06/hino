import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../utils/common";
import { BootstrapInput } from "./CustomTextField2";
import { Tooltip } from "@mui/material";

const CustomAsyncApiSelect = ({ fetchApi, control, errors, label, data, isLoading, isFetching, onChange, setSearch, multiple = true, className = "w-[300px]", defaultValue, value1, required, readOnly = false, infor, inforText ='', type="text", placeholder, clearValue, ...rest }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('')
    useDebounce(() => {
        if(value){
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
                if(multiple){
                    let list = newValue.map(i => i.id)
                    onChange(list)
                }else{
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
            renderInput={(params) => {
                let a = Object.assign({...params})
                delete a['InputProps']
                delete a['InputLabelProps']
                return (
                    <>
                        {label && <label className="font-regular text-secondary flex items-center gap-1">
                            {t(label)}
                            {required  && <span className={errors ? 'text-danger-500' : 'text-green-500'}> *</span>}
                            {infor && 
                                <Tooltip title={t(inforText)} placement="bottom-start" arrow>
                                    <span className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 9.31375 9.31384 12 6 12C2.68616 12 0 9.31375 0 6C0 2.68625 2.68616 0 6 0C9.31384 0 12 2.68625 12 6ZM4.70239 4.65747H6.82398V9.17688C6.82398 9.61435 6.46933 9.96899 6.03186 9.96899C5.59439 9.96899 5.23975 9.61435 5.23975 9.17688V6.06226H4.70239C4.31447 6.06226 4 5.74778 4 5.35986C4 4.97194 4.31447 4.65747 4.70239 4.65747ZM5.00977 2.93247C5.00977 2.80778 5.03192 2.69149 5.07587 2.58359C5.12345 2.47236 5.18773 2.37629 5.26909 2.29539C5.35044 2.21449 5.44524 2.15048 5.55383 2.10326C5.60323 2.0824 5.65408 2.06615 5.70674 2.0545C5.77357 2.03987 5.84294 2.03247 5.91485 2.03247C6.03688 2.03247 6.15202 2.05604 6.26061 2.10326C6.29003 2.11599 6.31836 2.12998 6.3456 2.14515C6.41933 2.18623 6.4858 2.23634 6.54536 2.29539C6.62671 2.37629 6.691 2.47236 6.73858 2.58359C6.76328 2.63984 6.7818 2.69835 6.79342 2.75912C6.80432 2.815 6.80977 2.87279 6.80977 2.93247C6.80977 2.99965 6.80287 3.06492 6.78906 3.12822C6.77744 3.18239 6.76037 3.23512 6.73858 3.2864C6.691 3.3943 6.62671 3.48865 6.54536 3.56955C6.50359 3.61099 6.45856 3.64801 6.40989 3.6806C6.3634 3.71157 6.31364 3.73866 6.26061 3.76168C6.15202 3.80891 6.03688 3.83247 5.91485 3.83247C5.85129 3.83247 5.78991 3.82678 5.73071 3.81532C5.66933 3.80358 5.61049 3.7857 5.55383 3.76168C5.44524 3.71446 5.35044 3.65045 5.26909 3.56955C5.18773 3.48865 5.12345 3.3943 5.07587 3.2864C5.03192 3.17517 5.00977 3.05716 5.00977 2.93247Z" fill="#868FA0"/>
                                        </svg>
                                    </span>
                                </Tooltip>
                            }
                        </label>}
                        <BootstrapInput
                            {...a}
                            {...rest}
                            sx={{
                                '&.MuiInputBase-root':{
                                    border: '1px solid #464f617d',
                                    borderRadius: '6px',
                                    background: '#fff'
                                },
                                '&.MuiInputBase-root:focus':{
                                    boxShadow: 'rgba(16, 185, 129, 0.25) 0 0 0 0.2rem',
                                    borderColor: '#10B981'
                                },
                                '.MuiInputBase-input': {
                                    border: 'transparent !important'
                                },
                                '.MuiInputBase-input:focus': {
                                    border: 'none',
                                    boxShadow: 'none'
                                },
                            }}
                            // variant="outlined"
                            error={!!errors}
                            // helperText={errors ? errors.message : ""}
                            startAdornment={params.InputProps.startAdornment}
                           
                            {...params.InputProps}
                            endAdornment={
                                <Fragment>
                                    {isLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                        }
                        />
                        {errors && <small className="text-danger-500">{errors?.message}</small>}
                    </>
                )
            }}
            getOptionLabel={(option) => {
                if(typeof option.text != 'string'){
                    option.text =  option.text.toString()
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

export default CustomAsyncApiSelect;
