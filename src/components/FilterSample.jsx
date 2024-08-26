import react, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomDateField from "./FormField/CustomDateField";
import { Box, Input, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Popper, TextField } from "@mui/material";
import { MdArrowDropDown, MdArrowRight, MdFilterAlt, MdSearch } from "react-icons/md";
import PopperBox from "./FilterBy/PopperBox";
import PopperEvent from "./FilterBy/PopperEvent";
import { useDebounce } from "../utils/common";
import { TbSlash } from "react-icons/tb";
import { updateFilterValue } from "../features/vehicle/vehicleSlice";

const FilterSample = ({ triggleFiter, setTriggleFiter, menu, page, updateFilterField, updateFilterProperty, setFilter }) => {
    const { t } = useTranslation();


    const { filter: { searchField, searchValue, searchProperty } } = useSelector(state => state[page])
    const dispatch = useDispatch()

    useEffect(_ => {
        console.log(page)
    }, [])

    useEffect(_ => {
        console.log(searchProperty)
    }, [searchProperty])


    const [expandedList, setExpandedList] = useState(false)
    const handleClick = (e) =>
        setExpandedList(expandedList ? null : e.currentTarget);
    const closeExpanded = () => setExpandedList(false);

    const [searchValueText, setSearchValueText] = useState("")

    useDebounce(() => {
        dispatch(updateFilterValue(searchValueText))
        if (searchValueText) {
            // console.log(searchValueText)
        }
    }, [searchValueText], 500);

    const handleUpdate = (e) => {
        let data = Object.assign({ ...searchProperty[e.key] })
        data[e.field] = e.data
        dispatch(updateFilterProperty({field: [e.key], value: data}))
    }

    const submitSeach = () => {
        if(searchField){

            setFilter({[searchField?.key]: searchValue})
        }
        // console.log(searchField, searchValue, searchProperty)
    }

    return (
        <div className="flex h-full flex-col">
            <div className="relative flex my-auto gap-[15px]">
                <div className="flex">
                    <div>
                        <button className="min-w-[100px] hover:border-[#444] relative h-full flex items-center gap-2 border border-[#0000003b] pl-[12px] pr-[8px] py-[4px] text-secondary"
                            style={{
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                                right: '-1px',
                            }}
                            onClick={handleClick}>
                            <span><MdFilterAlt size={14} color="#757575" /></span>
                            <span className="flex-1 inline-flex w-max">{searchField?.label}</span>
                            <span>
                                <MdArrowDropDown size={20} />
                            </span>
                        </button>
                        <PopperBox
                            anchorEl={expandedList}
                            handleClickAway={closeExpanded}
                            open={Boolean(expandedList)}
                            position="bottom-start"
                            className="bg-white min-w-[200px] py-1 mt-1 border-gray-300 border shadow-lg rounded-[8px]"
                        >
                            <List
                                sx={{ width: '100%', paddingTop: '3px', paddingBottom: '3px' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                {(Object.values(searchProperty) || []).map((item, index) => {
                                    return (
                                        item.isNested ?
                                            <PopperEvent key={index} item={item} label={item.label} handleUpdate={handleUpdate} />
                                            :
                                            <ListItemButton
                                                onClick={e => {
                                                    dispatch(updateFilterField(item))
                                                    closeExpanded()
                                                }}
                                                key={index} sx={{
                                                    paddingTop: '1px',
                                                    paddingBottom: '1px',
                                                }}>
                                                <ListItemText primary={item.label} />
                                            </ListItemButton>
                                    )
                                })}
                            </List>
                        </PopperBox>
                    </div>

                    <TextField
                        name="searchValue"
                        variant="outlined"
                        fullWidth
                        sx={{
                            '.MuiInputBase-root': {
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                paddingLeft: '7px',
                                paddingRight: '7px'
                            },
                            '.MuiInputBase-input': {
                                paddingLeft: 0
                            }
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><MdSearch className="w-5 h-6 text-[15px]" /></InputAdornment>,
                            endAdornment:   <InputAdornment position="end">
                                                <button className="bg-red border rounded" onClick={_ => submitSeach()}>
                                                    <TbSlash  className="w-5 h-6 text-[15px]" />
                                                </button>
                                            </InputAdornment>,
                        }}
                        placeholder="Search"
                        size="small"
                        onChange={e => setSearchValueText(e.target.value || '')}
                    />
                </div>
            </div>
        </div>
    )
}

export default FilterSample