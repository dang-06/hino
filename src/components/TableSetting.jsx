import react, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import CustomTextField from "./FormField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import CustomDateField from "./FormField/CustomDateField";
import { Box, Input, InputAdornment, Modal, Typography } from "@mui/material";
import { MdFilterAlt, MdSearch } from "react-icons/md";
import CustomSelect from "./FormField/CustomSelect";
import CustomSelect2 from "./FormField/CustomSelect2";
import { LoadingButton } from "@mui/lab";
import { useDrag } from 'react-dnd'
import update from 'immutability-helper'
import { Card } from "./Dnd/ItemDnd";

const TableSetting = ({ filter, setFilter, triggleFiter, setTriggleFiter, open, setOpen, listColOrigin, listCol = [], setListCol }) => {
    const { t } = useTranslation();

    const [listColFull, setListColFull] = useState(listCol)

    const [listColTemp, setListColTemp] = useState([])

    const [isLoading, setLoading] = useState(false)

    useEffect(_ => {
        setListColTemp(listColFull.filter(i => i.checked))
    }, [listColFull])

    // const siteLocation = useSelector(state => state.mapLocation)

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        console.log(dragIndex, hoverIndex)
        setListColTemp((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])



    const renderCard = useCallback(
        (card, index) => {
            return (
                <Card
                    key={card.field}
                    index={index}
                    id={card.field}
                    text={card.headerName}
                    moveCard={moveCard}
                />
            )
        },
        [],
    )

    const submit = () => {
        let a = listColTemp.map((item,index) => {
            item.index = index
            return item
        })
        console.log([...listColFull])
        console.log([...listColFull.filter(i => i.checked)])
        setListCol(listColFull)
        setOpen(false)
    }

    const schema = yup.object().shape({


    })


    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        resetField,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            preset: 1

        },
    });

    const onSubmit = async (data) => {
        let formData = ({ ...data, dateFrom: dayjs(data.dateFrom).startOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]'), dateTo: dayjs(data.dateTo).endOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]') })
        // console.log('form ', data)
        setFilter(formData)
    }

    const onClose = () => {
        setListColFull(listCol)
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => onClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Table Setting"
            >
                <div className="flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-[80vw] sm:p-6">
                        <div className="flex flex-col sm:items-start">
                            <Box>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Table Settings
                                </Typography>
                                <Typography id="modal-modal-description" className="text-[#777]" sx={{ mt: 2 }}>
                                    Table Column
                                </Typography>
                                <div className="my-2">
                                    <div className="group-cb flex flex-wrap gap-2">
                                        {
                                            listColFull.map((i, index) => (
                                                <label className="container-cbx" key={index}>
                                                    <input type="checkbox" defaultChecked={i.checked} onChange={e => {
                                                        let newState = [...listColFull];
                                                        newState[index] = {... newState[index], checked: e.target.checked};
                                                        // listColFull[index]['checked'] = e.target.checked; // <-- mutation!
                                                        // listColFull
                                                        // console.log(listColFull)
                                                        setTimeout(_ => {
                                                            setListColFull(newState)
                                                        }, 100)
                                                        // console.log(123 )
                                                    }} />
                                                    <span className="checkmark"></span>
                                                    <span className="label">{i.headerName}</span>
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>

                                <Typography id="modal-modal-description" className="text-[#777]" sx={{ mt: 2 }}>
                                    Column Orders
                                </Typography>
                                <div className="mt-2">
                                    <div className="flex flex-wrap gap-2 bg-[#cdcdcd] px-3 py-2" style={{}}>{listColTemp.map((card, i) => renderCard(card, i))}</div>

                                </div>

                                <Typography id="modal-modal-description" className="text-[#777]" sx={{ mt: 2 }}>
                                    Preset Name
                                </Typography>
                                <div>
                                    
                                    <CustomSelect2
                                        name="preset"
                                        
                                        control={control}
                                        setValue={setValue}
                                        size="small"
                                        sx={{
                                            mt: 1, minWidth: 100, width: '50%',
                                            
                                            
                                        }}
                                        errors={errors.preset}
                                        options={[
                                            { id: 'all', value: "All" },
                                            { id: 1, value: 'Default Present' },
                                            { id: 2, value: 'Name' },
                                        ]}
                                    />
                                </div>
                            </Box>

                            <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <LoadingButton
                                    variant="contained"
                                    color="error"
                                    onClick={submit}
                                    loading={isLoading}
                                >
                                    {t("submit")}
                                </LoadingButton>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => onClose()}
                                >
                                    {t("cancel")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default TableSetting