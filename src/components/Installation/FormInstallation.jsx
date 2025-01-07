// Import necessary dependencies and components
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FiUserPlus } from 'react-icons/fi';
import * as yup from 'yup';
import {
    useAddInstallationMutation,
    useUpdateInstallationMutation
} from '../../services/apiSlice';
import CustomNumberField from '../FormField/CustomNumberField';
import CustomTextField from '../FormField/CustomTextField';
import Tooltip from '@mui/material/Tooltip';

// FormInstallation component - Handles installation form operations
const FormInstallation = ({
    selectedItem, // Selected installation item for editing
    triggleSubmit, // Trigger for form submission
    setTriggleSubmit, // Function to set submission trigger
    submitError, // Function to handle submission errors
    refetch, // Function to refetch data after operations
    setOpenForm // Function to control form visibility
}) => {
    const { t } = useTranslation();
    // Mutations for updating and adding installations
    const [updateForm, { isLoading: isLoading1 }] =
        useUpdateInstallationMutation();
    const [addForm, { isLoading: isLoading2 }] = useAddInstallationMutation();

    // Effect to handle form reset when selectedItem changes
    useEffect(() => {
        if (selectedItem && selectedItem.id) {
            reset(selectedItem, { keepDirtyValues: true });
        } else {
            reset(defaultValues, { keepDirtyValues: true });
        }
    }, [selectedItem]);

    // Default form values
    const defaultValues = {
        thaiName: '',
        id: '',
        englishName: ''
    };

    // Form validation schema
    const schema = yup.object().shape({});

    // Effect to handle form submission when triggered externally
    useEffect(
        _ => {
            if (triggleSubmit == true) {
                handleSubmit(onSubmit)();
                setTimeout(_ => {
                    if (Object.keys(errors).length > 0) {
                        submitError();
                    }
                }, 100);
            }
        },
        [triggleSubmit]
    );

    // Form hook setup with validation
    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    // Handle form submission
    const onSubmit = async data => {
        const transformData = { ...data };

        try {
            // Update existing installation or create new one
            if (transformData.id) {
                await updateForm(transformData).unwrap();
                toast.success(
                    t('message.success.update', { field: t('Installation') })
                );
            } else {
                await addForm(transformData).unwrap();
                toast.success(
                    t('message.success.add', { field: t('Installation') })
                );
            }
            // Reset form and update UI state
            setTriggleSubmit(false);
            reset(defaultValues);
            refetch();
            setOpenForm(false);
        } catch (error) {
            setTriggleSubmit(false);
            if (error?.data?.status === 400) {
                toast.error('Error');
            }
        }
    };

    // Handle form close
    const onClose = () => {
        setOpenForm(false);
        clearErrors();
        reset(defaultValues);
    };

    // Installation status state
    const [status, setStatus] = useState('not_started');

    // Component render
    return (
        <>
            <div
                className='flex h-full flex-col overflow-auto bg-white'
                style={{ height: 'calc(100vh - 110px)' }}
            >
                {!selectedItem?.id && (
                    <div className='items-top flex justify-between border-b px-2 py-6'>
                        <div className='flex'>
                            <div className='flex h-7 items-center justify-center gap-4'>
                                <button
                                    type='button'
                                    className='rounded-full bg-transparent p-1 text-[#3d3b3b] hover:bg-[#999] focus:outline-none focus:ring-2 focus:ring-white'
                                    onClick={onClose}
                                >
                                    <XIcon
                                        className='h-6 w-6'
                                        aria-hidden='true'
                                    />
                                </button>
                            </div>
                            <div className='ml-3 flex flex-col items-start'>
                                <h2 className='text-lg font-medium capitalize '>
                                    {t('inspectionForm', {
                                        field: t('Installation')
                                    })}
                                </h2>
                                {/* <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("Installation") })}
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className='mr-2'>
                            <Button variant='outlined' onClick={onClose}>
                                {t('cancel')}
                            </Button>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                className='ml-3'
                                onClick={() => handleSubmit(onSubmit)()}
                                loading={isLoading2}
                            >
                                {t('save')}
                            </LoadingButton>
                        </div>
                    </div>
                )}
                {/* form */}
                <div className='overflow-auto pb-[50px]'>
                    <form
                        noValidate
                        className='flex h-full flex-col'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='flex min-h-0 flex-1 flex-col'>
                            <div className='relative flex'>
                                <div className=' h-full w-full px-4 sm:px-6'>
                                    <div className='mb-6 flex justify-center'>
                                        <div className='border-b-2 border-green-600 px-4 text-green-600'>
                                            Page 1
                                        </div>
                                    </div>
                                    <form>
                                        {/* Status buttons */}
                                        <div className='space-y-4 px-20'>
                                            {/* Status */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    status
                                                </label>
                                                <div className='flex w-3/4 gap-4'>
                                                    <button
                                                        type='button'
                                                        className={`flex-1 rounded-md border px-4 py-2 ${
                                                            status ===
                                                            'not_started'
                                                                ? 'bg-gray-100'
                                                                : 'bg-white'
                                                        }`}
                                                        onClick={() =>
                                                            setStatus(
                                                                'not_started'
                                                            )
                                                        }
                                                    >
                                                        Not Started
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className={`flex-1 rounded-md border px-4 py-2 ${
                                                            status ===
                                                            'finished'
                                                                ? 'bg-gray-100'
                                                                : 'bg-white'
                                                        }`}
                                                        onClick={() =>
                                                            setStatus(
                                                                'finished'
                                                            )
                                                        }
                                                    >
                                                        Finished
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Sale Order */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    Sale Order
                                                </label>
                                                <div className='w-3/4'>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border px-3 py-2'
                                                    />
                                                </div>
                                            </div>

                                            {/* Ticket No */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    Ticket No.
                                                </label>
                                                <div className='w-3/4'>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border px-3 py-2'
                                                    />
                                                </div>
                                            </div>

                                            {/* Doc No */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    Doc No.
                                                </label>
                                                <div className='w-3/4'>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border px-3 py-2'
                                                    />
                                                </div>
                                            </div>

                                            {/* ประเภทการติดตั้ง */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    ประเภทการติดตั้ง
                                                </label>
                                                <div className='relative w-3/4'>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border px-3 py-2 pr-10'
                                                    />
                                                    <span className='absolute right-3 top-2.5'>
                                                        +
                                                    </span>
                                                </div>
                                            </div>

                                            {/* อุปกรณ์เสริม */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    อุปกรณ์เสริม
                                                </label>
                                                <div className='relative w-3/4'>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border px-3 py-2 pr-10'
                                                    />
                                                    <span className='absolute right-3 top-2.5'>
                                                        +
                                                    </span>
                                                </div>
                                            </div>

                                            {/* หมายเหตุ */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    หมายเหตุ
                                                </label>
                                                <div className='w-3/4'>
                                                    <textarea
                                                        className='w-full rounded-md border px-3 py-2'
                                                        rows='3'
                                                    />
                                                </div>
                                            </div>

                                            {/* วันที่นัดหมาย */}
                                            <div className='flex items-center'>
                                                <label className='w-1/4 text-sm text-gray-700'>
                                                    วันที่นัดหมาย
                                                </label>
                                                <div className='w-3/4'>
                                                    <input
                                                        type='datetime-local'
                                                        className='w-full rounded-md border px-3 py-2'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* form edit */}
            </div>
        </>
    );
};

export default FormInstallation;
