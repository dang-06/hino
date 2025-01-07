import React from 'react';

const RelatedInspections = () => {
    return (
        <div className='flex flex-col space-y-4 pl-20'>
            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>ทะเบียนรถ</div>
                <div className='w-2/3'>70-6904</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Chassis No.</div>
                <div className='w-2/3'>FL8JNKA21554</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Color</div>
                <div className='w-2/3'>ขาว</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Model</div>
                <div className='w-2/3'>—</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Vehicle Type</div>
                <div className='w-2/3'>—</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Type by Law</div>
                <div className='w-2/3'>รถบรรทุก ลักษณะ 4 ไม่ประจำทาง</div>
            </div>

            <div className='flex space-x-4'>
                <div className='w-1/3 text-gray-600'>Create Date</div>
                <div className='w-2/3'>2021-07-30 9:30:43</div>
            </div>

            <div className='mt-6'>
                <div className='mb-4 font-medium text-gray-700'>
                    Related Inspections
                </div>
                <div className='flex items-center space-x-4 rounded border p-4'>
                    <img
                        src='/path/to/vehicle/image'
                        alt='Vehicle'
                        className='h-20 w-20 rounded object-cover'
                    />
                    <div className='flex-1'>
                        <div className='font-medium'>
                            Sale Order : Soub-127283
                        </div>
                        <div className='text-sm text-gray-500'>Finished</div>
                    </div>
                    <div className='flex space-x-2'>
                        <button className='rounded p-2 text-gray-600 hover:bg-gray-100'>
                            <svg
                                className='h-5 w-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                            </svg>
                        </button>
                        <button className='rounded p-2 text-gray-600 hover:bg-gray-100'>
                            <svg
                                className='h-5 w-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                />
                            </svg>
                        </button>
                        <button className='rounded p-2 text-gray-600 hover:bg-gray-100'>
                            <svg
                                className='h-5 w-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 4v16m8-8H4'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedInspections;
