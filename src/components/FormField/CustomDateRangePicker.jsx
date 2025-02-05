import React, { useEffect, useState } from "react";
import { TextField, Popover, InputAdornment, IconButton } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { DateRangePicker } from 'react-date-range'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CustomDateRangePicker = ({ fromDate, setFromDate, toDate, setToDate,label }) => {
    const dateFormat = "DD/MM/YYYY";

    const [displayCalendar, setDisplayCalendar] = useState(false);
    const [inputValue, setInputValue] = useState(`${moment().startOf("month").format(dateFormat)} - ${ moment().format(dateFormat)}`);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const firstDayOfMonth = moment().startOf("month").toDate();
        const currentDate = moment().toDate();
    
        setFromDate(firstDayOfMonth);
        setToDate(currentDate);
      }, []);

    const onAdornmentClick = (e) => {
        setDisplayCalendar(true);
        setAnchorEl(e.currentTarget);
    };

    const onInputChange = (e) => {
        const inputValue = e.target.value;
        const { fromDate, toDate } = processInputValue(inputValue);

        setInputValue(inputValue);
        setFromDate(fromDate);
        setToDate(toDate);
    };

    const onPopoverClose = (e, reason) => {
        console.log(reason);
        setDisplayCalendar(false);
        setAnchorEl(null);
    };

    const onSelectDateRanges = ({ selection }) => {
        console.log(selection)
        let { startDate, endDate } = selection;

        startDate = moment(startDate);
        startDate = startDate.isValid() ? startDate.toDate() : undefined;

        endDate = moment(endDate);
        endDate = endDate.isValid() ? endDate.toDate() : undefined;

        let inputValue = "";
        if (startDate) inputValue += moment(startDate).format(dateFormat);
        if (endDate) inputValue += " - " + moment(endDate).format(dateFormat);

        setFromDate(startDate);
        setToDate(endDate);
        setInputValue(inputValue);
    };

    const processInputValue = (value) => {
        let [fromDate, toDate] = value.split("-").map((elm) => elm.trim());

        fromDate = moment(fromDate, dateFormat);
        fromDate = fromDate.isValid() ? fromDate.toDate() : undefined;

        toDate = moment(toDate, dateFormat);
        toDate = toDate.isValid() ? toDate.toDate() : undefined;

        return { fromDate, toDate };
    };

    return (
        <div>
            <TextField
                label={label}
                fullWidth={true}
                value={inputValue}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onAdornmentClick}>
                                <DateRangeIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                onChange={onInputChange}
            />
            <Popover
                open={displayCalendar}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                onClose={onPopoverClose}
            >
                <div>
                    <DateRangePicker
                        ranges={[
                            {
                                startDate: fromDate,
                                endDate: toDate,
                                key: "selection"
                            }
                        ]}
                        onChange={onSelectDateRanges}
                        staticRanges={undefined}
                        inputRanges={undefined}
                        maxDate={new Date()}
                        showMonthAndYearPickers={true}
                        moveRangeOnFirstSelection={false}
                        showDateDisplay={false}
                        scroll={{ enabled: true }}
                    />
                </div>
            </Popover>
        </div>
    );
};

export default CustomDateRangePicker;
