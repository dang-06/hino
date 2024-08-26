import React, { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { CircularProgress, IconButton, InputAdornment, Tooltip, Typography } from "@mui/material";
import { MdArrowDropDown, MdClear, MdFilter, MdFilter1, MdFilter2, MdFilterAlt, MdOutlineClear, MdSearch } from "react-icons/md";

const CustomSelect2 = ({ name, label, control, errors, readOnly=false, setValue, options, startAdornment, placeholder, multiple, menuStyle, required, infor, inforText, defaultValue="", ...rest }) => {
    const { t } = useTranslation();


    const resetValue = (e) => {
        console.log(control)
        console.log('click icon, ')
    }

    return (
        <div style={{width: '100%'}}>
            {label && <label className="font-regular text-secondary flex items-center mb-1 gap-1">
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
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={errors ? true : false}
                        {...rest}
                    >
                        <Select 
                            startAdornment={startAdornment} 
                            onChange={onChange} 
                            value={value} 
                            readOnly={readOnly}
                            displayEmpty
                            multiple={multiple}
                            MenuProps={{
                                sx: menuStyle,
                            }}
                            // renderValue={(selected) => {
                            //     console.log('selected',selected )
                            //     if(multiple){
                            //         if (selected.length === 0) {
                            //           return <em>Placeholder</em>;
                            //         }
                        
                            //         return selected.join(', ');
                            //     }else{
                            //         if(selected == 'none'){
                            //             return <MenuItem disabled value="">
                            //             <em>{4}</em>
                            //         </MenuItem>
                            //         }
                            //         return selected
                            //     }
                            // }}
                    
                        >
                            {placeholder && <MenuItem disabled selected={true} value={defaultValue}>
                                {t(placeholder)}
                            </MenuItem>}
                            {options.map((item) => (
                                <MenuItem key={item.id} value={item.id} disabled={item.disabled}>
                                    {t(item.value)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                />
                {errors && <small className="text-danger-500">{errors?.message}</small>}
        </div>
    );
};

export default CustomSelect2;
