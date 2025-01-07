import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { Button, Tooltip } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FormDetailRelatedInspections = ({
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
            toast.success(t('message.success.update', { field: t('Related Inspections') }));
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
                    {/* Form fields for Related Inspections */}
                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Inspection ID
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.inspectionId}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Inspection Date
                        </label>
                        <div className="w-3/4">
                            <input
                                type="date"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.inspectionDate}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Inspector Name
                        </label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.inspectorName}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Inspection Status
                        </label>
                        <div className="w-3/4">
                            <select
                                className="w-full rounded-md border px-3 py-2"
                                defaultValue={selectedItem?.status}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Notes
                        </label>
                        <div className="w-3/4">
                            <textarea
                                className="w-full rounded-md border px-3 py-2"
                                rows="3"
                                defaultValue={selectedItem?.notes}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/4 text-sm text-gray-700">
                            Related Documents
                        </label>
                        <div className="w-3/4">
                            <input
                                type="file"
                                className="w-full rounded-md border px-3 py-2"
                                multiple
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormDetailRelatedInspections;
