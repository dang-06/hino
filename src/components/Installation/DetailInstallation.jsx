import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FiUserPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import {
    useAddInstallationMutation,
    useUpdateInstallationMutation
} from '../../services/apiSlice';
import CustomDateField from '../FormField/CustomDateField';
import CustomNumberField from '../FormField/CustomNumberField';
import CustomSelect from '../FormField/CustomSelect';
// import { addInstallation } from "../../api";
import CustomTextField from '../FormField/CustomTextField';
import { AiFillEdit } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import { fetchInstallationDetail } from '../../api';
import { CiCircleChevRight } from 'react-icons/ci';

const DetailInstallation = ({ detailRow, onShowMoreDetail }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);
    const { masterDatas } = useSelector(state => state.masterDatas);
    const [updateInstallation, { isLoading }] = useUpdateInstallationMutation();

    useEffect(() => {
        // if(selectedInstallationEdit){
        //     console.log(selectedInstallationEdit)
        //     const response = fetchInstallationDetail(selectedInstallationEdit.id)
        //     response.then(i => {
        //         console.log(i.data)
        //         reset(i.data)
        //     })
        // }
        // reset(Installation)
        console.log(detailRow);
    }, [detailRow]);

    const onClose = () => {
        // setOpenEdit(false);
        // clearErrors();
        // reset();
    };

    const handleShowMoreDetail = () => {
        onShowMoreDetail && onShowMoreDetail(detailRow);
    };

    return (
        <>
            <div className='flex'>
                <div className='w-5/12 flex-1 p-4'>
                    <img
                        className='rounded'
                        src={`${detailRow.image}`}
                        alt=''
                    />
                </div>
                <div
                    className='w-5/12 flex-1 overflow-auto bg-white p-4'
                    style={{ height: 'calc(100vh - 110px)' }}
                >
                    <div className='flex'>
                        <div className='gap-10 space-y-4'>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    Ticket No.
                                </div>
                                <div className='w-2/3'>
                                    Ticket No. : {`${detailRow.ticketNo}`}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    ประเภทการติดตั้ง
                                </div>
                                <div className='w-2/3'>
                                    ติดตั้งใหม่, ติดตั้งใหม่, ถอดคืน Onelink,
                                    ซ่อมแซม/แก้ไข
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    อุปกรณ์เสริม
                                </div>
                                <div className='w-2/3'>
                                    Speed Alert, อุปกรณ์เสริมหาย
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    หมายเหตุ
                                </div>
                                <div className='w-2/3'>ติดตั้งใหม่</div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    วันที่นัดหมาย
                                </div>
                                <div className='w-2/3'>
                                    {`${detailRow.date}`}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    ทะเบียนรถ
                                </div>
                                <div className='flex w-2/3'>
                                    <div>{detailRow.numberPlate}</div>
                                    <button
                                        className='ml-60 flex-1 text-gray-700'
                                        onClick={handleShowMoreDetail}
                                    >
                                        <CiCircleChevRight size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3 text-gray-600'>
                                    Odometer reading
                                </div>
                                <div className='w-2/3'>2100</div>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <div className='text-gray-600'>
                                    รูปถ่ายตัวรถ
                                </div>
                                <img
                                    className='rounded'
                                    src={`${detailRow.image}`}
                                    alt='รูปถ่ายตัวรถ'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <div className='text-gray-600'>เลขตัวรถ</div>
                                <img
                                    className='rounded'
                                    src={`${detailRow.image}`}
                                    alt='เลขตัวรถ'
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className='w-5/12 flex-1 overflow-auto bg-white p-4'
                        style={{ height: 'calc(100vh - 110px)' }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default DetailInstallation;
