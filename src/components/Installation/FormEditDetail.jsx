import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { Button, Tooltip } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FormEditDetail = ({
    selectedItem,
    triggleSubmit,
    setTriggleSubmit,
    submitError,
    refetch,
    setOpenForm
}) => {
    const { t } = useTranslation();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: selectedItem || {}
    });

    useEffect(() => {
        if (selectedItem) {
            reset(selectedItem);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (triggleSubmit) {
            handleSubmit(onSubmit)();
        }
    }, [triggleSubmit]);

    const onSubmit = async (data) => {
        try {
            // Xử lý logic cập nhật dữ liệu ở đây
            console.log('Submitted data:', data);
            toast.success(t('message.success.update', { field: t('Installation') }));
            setTriggleSubmit(false);
            refetch();
            setOpenForm(false);
        } catch (error) {
            setTriggleSubmit(false);
            toast.error('Error updating data');
            submitError();
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Form fields go here */}
                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Sale Order
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.saleOrder}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Ticket No.
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.ticketNo}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Installation Type
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.installationType}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Additional Devices
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.additionalDevices}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Notes
                        </label>
                        <div className="w-3/4">
                            <textarea
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.notes}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Appointment Date
                        </label>
                        <div className="w-3/4">
                            <input
                                type="date"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.appointmentDate}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Vehicle Plate Number
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.vehiclePlateNumber}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Odometer Reading
                        </label>
                        <div className="w-3/4">
                            <input
                                type="number"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.odometerReading}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormEditDetail;