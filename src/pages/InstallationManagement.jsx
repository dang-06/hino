import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { FiUserPlus, FiTrash2 } from 'react-icons/fi';
import { BsFilter } from 'react-icons/bs';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AiFillEdit, AiOutlineExpandAlt } from 'react-icons/ai';
import { MdOutlineCheckBox, MdOutlineClose } from 'react-icons/md';
import { CiCircleChevRight } from 'react-icons/ci';
import {
    IoChevronBack,
    IoChevronForward,
    IoFilterOutline
} from 'react-icons/io5';
import { useGetInstallationQuery } from '../services/apiSlice';
import LinearProgress from '@mui/material/LinearProgress';
import FormInstallation from '../components/Installation/FormInstallation';
import DeleteInstallation from '../components/Installation/DeleteInstallation';
import DetailInstallation from '../components/Installation/DetailInstallation';
import FilterInstallation from '../components/Installation/FilterInstallation';
import FilterRightBar from '../components/FilterRightBar';
import FormDisplay from '../components/FormDisplay';
import Tooltip from '@mui/material/Tooltip';
import { Checkbox, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RelatedInspections from '../components/Installation/RelatedInspections';
import FormEditDetail from '../components/Installation/FormEditDetail';
import FormDetailRelatedInspections from '../components/Installation/FormDetailRelatedInspections';
import { useSearch } from '../context/SearchContext';

const vehicles = [  
    {
        id: 1,
        saleOrder: 'SOBU-TESLA',
        ticketNo: 'TN8927',
        image: 'https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg',
        numberPlate: '70-1220',
        date: '3/22/2023 2:16:00 PM',
        description: 'ติดตั้ง Demo , ซ่อมแซม/แกไข , ถอนกลับ Onelink'
    },
    {
        id: 2,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description:
            'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข'
    },
    {
        id: 3,
        saleOrder: 'SOBU-TESLA',
        ticketNo: 'TN8927',
        image: 'https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg',
        numberPlate: '70-1220',
        date: '3/22/2023 2:16:00 PM',
        description: 'ดตั้ง Demo , ซ่อมแซม/แกไข , ถอนกลับ Onelink'
    },
    {
        id: 4,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description:
            'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข'
    },
    {
        id: 5,
        saleOrder: 'SOBU-TESLA',
        ticketNo: 'TN8927',
        image: 'https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg',
        numberPlate: '70-1220',
        date: '3/22/2023 2:16:00 PM',
        description: 'ติดตั้ง Demo , ซ่อมแซม/แกไข , ถอนกลับ Onelink'
    },
    {
        id: 6,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description:
            'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข'
    },
    {
        id: 7,
        saleOrder: 'SOBU-TESLA',
        ticketNo: 'TN8927',
        image: 'https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg',
        numberPlate: '70-1220',
        date: '3/22/2023 2:16:00 PM',
        description: 'ติดตั้ง Demo , ซ่อมแซม/แกไข , ถอนกลับ Onelink'
    },
    {
        id: 8,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description:
            'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข'
    }
];

// const VehicleCard = ({ vehicle }) => {
//     return (
//         <div className="card focus:shadow-2xl hover:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
//             <div className="flex items-center p-4">
//                 <img
//                     src={vehicle.image}
//                     alt={vehicle.numberPlate}
//                     className="w-11 h-11 object-cover rounded-full mr-4"
//                 />
//                 <div className="flex flex-col">
//                     <h3 className="text-sm font-semibold">Sale Order: {vehicle.saleOrder}</h3>
//                     <p className="text-xs text-gray-500">Ticket No.: {vehicle.ticketNo}</p>
//                 </div>
//             </div>
//             <img src={vehicle.image} alt={vehicle.numberPlate} className="w-full h-2/5 object-cover" />

//             <div className='p-4 h-1/6'>
//                 <p className="text-lg mt-2 font-bold">{vehicle.numberPlate}</p>
//                 <p className="text-xs text-gray-500">{vehicle.date}</p>
//             </div>
//             <p className="text-sm pl-4 pr-4 h-[13%] flex justify-between items-center">{vehicle.description}</p>
//             <div className="pl-4 pr-4">
//                 <div className="flex justify-between items-center mt-auto">
//                     <a href="#" className="text-green-600 text-sm mt-4 block">VIEW MAP (สถานที่)</a>
//                     <div className='flex justify-between items-center'>
//                         <button className="text-green-600 flex-1"></button>
//                         <button className="text-gray-600 flex-1"><FiTrash2 size={20} /></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const InstallationManagement = () => {
    const { t } = useTranslation();
    const { searchTerm } = useSearch();

    const filteredVehicles = React.useMemo(() => {
        return vehicles.filter(
            vehicle =>
                vehicle.saleOrder
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                vehicle.ticketNo
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                vehicle.numberPlate
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                vehicle.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const [criterias, setCriterias] = useState({
        page: 0,
        rowsPerPage: 25
        // groupId: "",
        // isMapped: false,
    });
    const { data, isLoading, isFetching, isSuccess, refetch } =
        useGetInstallationQuery(criterias);
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});
    const [openEditMain, setOpenEditMain] = useState(false);
    const [openEditRelated, setOpenEditRelated] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [triggleSubmit, setTriggleSubmit] = useState(false);
    const [triggleFiter, setTriggleFiter] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState({});
    const [tableData, settableData] = useState([]);
    const [enableCheckbox, setEnableCheckbox] = useState(false);
    const [showMoreDetail, setShowMoreDetail] = useState(false);

    const updateFilter = value => {
        setCriterias({ ...criterias, ...value });
    };

    const showDetailRow = params => {
        // console.log(params)
        setSelectedRow(params);
        if (enableCheckbox) {
            setSelectedCheckbox(prevState => ({
                ...prevState,
                [params.id]: prevState[params.id] ? !prevState[params.id] : true
            }));
        } else {
            setShowDetail(true);
        }
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = vehicles.findIndex(i => i.id == selectedRow.id);
            if (findIndex > 0) {
                setSelectedRow(vehicles[findIndex - 1]);
            }
        }
    };
    const getNextRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = vehicles.findIndex(i => i.id == selectedRow.id);
            if (findIndex >= 0 && findIndex < vehicles.length - 1) {
                setSelectedRow(vehicles[findIndex + 1]);
            }
        }
    };

    const onShowModalDelete = id => {
        setOpen(true);
    };

    const onDoneDelete = e => {
        setOpen(false);
        setShowDetail(false);
        refetch();
    };

    const handleShowMoreDetail = rowData => {
        setShowMoreDetail(true);
        // Có thể thêm xử lý khác nếu cần
    };

    const handleCloseDetail = type => {
        if (type === 'moreDetail') {
            setShowMoreDetail(false);
        } else {
            setShowDetail(false);
            setOpenEditMain(false);
            setOpenEditRelated(false);
        }
    };

    return (
        <>
            <div className=' flex'>
                <div className='h-full min-h-[calc(100vh_-_100px)] flex-1 transition-all duration-[300ms] lg:mx-auto lg:max-w-full'>
                    <div className='flex h-full flex-col bg-white shadow-sm'>
                        <div className='h-[50px] border-b pl-4 sm:flex sm:items-center'>
                            <div className='sm:flex-auto'>
                                <h1 className='text-xl font-semibold text-gray-900'>
                                    {t('Installation')}
                                </h1>
                            </div>
                            <div className='mt-4 flex items-center justify-between sm:ml-16 sm:mt-0 sm:flex-none'>
                                <Button
                                    variant='contained'
                                    className='flex-1 px-6 capitalize'
                                    startIcon={
                                        <FiUserPlus className='h-5 w-5' />
                                    }
                                    onClick={() => {
                                        setOpenForm(true);
                                    }}
                                >
                                    {t('add')}
                                </Button>
                                <div className='ml-2 mr-3 h-6 border-l-2 border-solid border-gray-300'></div>
                                <button className='flex-1 text-gray-600'>
                                    <BsFilter size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div
                        className='overflow-auto p-4'
                        style={{ maxHeight: 'calc(100vh - 106px)' }}
                    >
                        <h3 className='mb-2 text-lg font-semibold'>Finished</h3>

                        <Grid
                            container
                            spacing={2}
                            columns={{ xs: 2, sm: 6, md: 12 }}
                        >
                            {filteredVehicles.map((vehicle, index) => (
                                <Grid
                                    item
                                    xs={showDetail ? 12 : 2}
                                    sm={showDetail ? 12 : 3}
                                    md={showDetail ? 12 : 3}
                                    key={index}
                                >
                                    <div
                                        className='card h-[400px] w-full overflow-hidden rounded-lg border bg-white shadow-md hover:shadow-2xl focus:shadow-2xl'
                                        onClick={() => showDetailRow(vehicle)}
                                    >
                                        <div className='flex items-center p-4'>
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.numberPlate}
                                                className='mr-4 h-11 w-11 rounded-full object-cover'
                                            />
                                            <div className='flex flex-col'>
                                                <h3 className='text-sm font-semibold'>
                                                    Sale Order:{' '}
                                                    {vehicle.saleOrder}
                                                </h3>
                                                <p className='text-xs text-gray-500'>
                                                    Ticket No.:{' '}
                                                    {vehicle.ticketNo}
                                                </p>
                                            </div>
                                        </div>
                                        <img
                                            src={vehicle.image}
                                            alt={vehicle.numberPlate}
                                            className='h-2/5 w-full object-cover'
                                        />

                                        <div className='h-1/6 p-4'>
                                            <p className='mt-2 text-lg font-bold'>
                                                {vehicle.numberPlate}
                                            </p>
                                            <p className='text-xs text-gray-500'>
                                                {vehicle.date}
                                            </p>
                                        </div>
                                        <p className='flex h-[13%] items-center justify-between pl-4 pr-4 text-sm'>
                                            {vehicle.description}
                                        </p>
                                        <div className='pl-4 pr-4'>
                                            <div className='mt-auto flex items-center justify-between'>
                                                <a
                                                    href='#'
                                                    className='mt-4 block text-sm text-green-600'
                                                >
                                                    VIEW MAP (สถานที่)
                                                </a>
                                                <div className='flex items-center justify-between'>
                                                    <button className='mr-5 flex-1 text-gray-700'>
                                                        <CiCircleChevRight
                                                            size={20}
                                                        />
                                                    </button>
                                                    <button className='flex-1 text-gray-600'>
                                                        <FiTrash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    {/* detail */}
                </div>
                <div
                    className={
                        (showDetail ? 'w-7/12' : 'w-[0px]') +
                        ' border-l transition-all  duration-[300ms]'
                    }
                >
                    <div className='bg-white'>
                        <div className='flex h-[50px] items-center justify-between border-b px-3'>
                            <div className='title text-[16px]'>
                                {selectedRow?.saleOrder}
                            </div>
                            <div className='action flex items-center gap-[8px]'>
                                {openEditMain ? (
                                    <>
                                        <Tooltip
                                            title={'Cancel'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <button
                                                onClick={() =>
                                                    setOpenEditMain(false)
                                                }
                                                className='btn-primary rounded-[5px] border border-primary-500 px-3 py-[5px] text-[13px] text-primary-900 hover:bg-primary-100'
                                            >
                                                <span>Cancel</span>
                                            </button>
                                        </Tooltip>
                                        <Tooltip
                                            title={'Edit'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <LoadingButton
                                                type='submit'
                                                variant='contained'
                                                className='ml-3'
                                                onClick={() =>
                                                    setTriggleSubmit(true)
                                                }
                                                loading={triggleSubmit}
                                            >
                                                {t('save')}
                                            </LoadingButton>
                                        </Tooltip>
                                        <Divider
                                            orientation='vertical'
                                            flexItem
                                            variant='middle'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Tooltip
                                            title={'Delete'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <button
                                                onClick={() =>
                                                    onShowModalDelete(
                                                        selectedRow.id
                                                    )
                                                }
                                                className='rounded-[5px] border p-1 outline-none hover:bg-[#f1f1f1]'
                                            >
                                                <FaRegTrashAlt
                                                    className='h-6 w-6 flex-shrink-0 cursor-pointer text-[#10B981]'
                                                    aria-hidden='true'
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip
                                            title={'Edit'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <button
                                                onClick={() =>
                                                    setOpenEditMain(true)
                                                }
                                                className='btn-primary flex items-center rounded-[5px] bg-[#10B981] px-3 py-[6px] text-[13px] text-white'
                                            >
                                                <FaEdit className='mr-2' />
                                                <span>Edit</span>
                                            </button>
                                        </Tooltip>
                                        <Divider
                                            orientation='vertical'
                                            flexItem
                                            variant='middle'
                                        />
                                        &nbsp;
                                        {/* <IoFilterOutline className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" /> */}
                                        <Tooltip
                                            title={'Back'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <button
                                                className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                                onClick={getPrevRow}
                                            >
                                                <IoChevronBack
                                                    className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                    aria-hidden='true'
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip
                                            title={'Next'}
                                            placement='bottom-start'
                                            arrow
                                        >
                                            <button
                                                className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                                onClick={getNextRow}
                                            >
                                                <IoChevronForward
                                                    className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                    aria-hidden='true'
                                                />
                                            </button>
                                        </Tooltip>
                                    </>
                                )}

                                <Tooltip
                                    title={'Expand'}
                                    placement='bottom-start'
                                    arrow
                                >
                                    <button className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'>
                                        <AiOutlineExpandAlt
                                            className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                            aria-hidden='true'
                                        />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    title={'Close'}
                                    placement='bottom-start'
                                    arrow
                                >
                                    <button
                                        className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                        onClick={() =>
                                            handleCloseDetail('main')
                                        }
                                    >
                                        <MdOutlineClose
                                            className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                            aria-hidden='true'
                                        />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className='h-[calc(100vh_-_110px)] overflow-auto lg:mx-auto lg:max-w-full'>
                        <div
                            className='m-auto min-h-[50vh] overflow-auto'
                            style={{ height: 'calc(100vh - 110px)' }}
                        >
                            {showDetail &&
                                (openEditMain ? (
                                    <FormEditDetail
                                        selectedItem={selectedRow}
                                        refetch={() => {
                                            refetch();
                                            setOpenEditMain(false);
                                        }}
                                        triggleSubmit={triggleSubmit}
                                        setTriggleSubmit={setTriggleSubmit}
                                        setOpenForm={setShowDetail}
                                        submitError={() =>
                                            setTriggleSubmit(false)
                                        }
                                    />
                                ) : (
                                    <DetailInstallation
                                        detailRow={selectedRow}
                                        onShowMoreDetail={handleShowMoreDetail}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                {showMoreDetail && (
                    <div
                        className={
                            (showDetail ? 'w-7/12' : 'w-[0px]') +
                            ' border-l transition-all duration-[300ms]'
                        }
                    >
                        <div className='bg-white'>
                            <div className='flex h-[50px] items-center justify-between border-b px-3'>
                                <div className='title text-[16px]'>
                                    {selectedRow?.numberPlate}
                                </div>
                                <div className='action flex items-center gap-[8px]'>
                                    {openEditRelated ? (
                                        <>
                                            <Tooltip
                                                title={'Cancel'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <button
                                                    onClick={() =>
                                                        setOpenEditRelated(
                                                            false
                                                        )
                                                    }
                                                    className='btn-primary rounded-[5px] border border-primary-500 px-3 py-[5px] text-[13px] text-primary-900 hover:bg-primary-100'
                                                >
                                                    <span>Cancel</span>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                title={'Edit'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <LoadingButton
                                                    type='submit'
                                                    variant='contained'
                                                    className='ml-3'
                                                    onClick={() =>
                                                        setTriggleSubmit(true)
                                                    }
                                                    loading={triggleSubmit}
                                                >
                                                    {t('save')}
                                                </LoadingButton>
                                            </Tooltip>
                                            <Divider
                                                orientation='vertical'
                                                flexItem
                                                variant='middle'
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip
                                                title={'Delete'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <button
                                                    onClick={() =>
                                                        onShowModalDelete(
                                                            selectedRow.id
                                                        )
                                                    }
                                                    className='rounded-[5px] border p-1 outline-none hover:bg-[#f1f1f1]'
                                                >
                                                    <FaRegTrashAlt
                                                        className='h-6 w-6 flex-shrink-0 cursor-pointer text-[#10B981]'
                                                        aria-hidden='true'
                                                    />
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                title={'Edit'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <button
                                                    onClick={() =>
                                                        setOpenEditRelated(true)
                                                    }
                                                    className='btn-primary flex items-center rounded-[5px] bg-[#10B981] px-3 py-[6px] text-[13px] text-white'
                                                >
                                                    <FaEdit className='mr-2' />
                                                    <span>Edit</span>
                                                </button>
                                            </Tooltip>
                                            <Divider
                                                orientation='vertical'
                                                flexItem
                                                variant='middle'
                                            />
                                            &nbsp;
                                            {/* <IoFilterOutline className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" /> */}
                                            <Tooltip
                                                title={'Back'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <button
                                                    className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                                    onClick={getPrevRow}
                                                >
                                                    <IoChevronBack
                                                        className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                        aria-hidden='true'
                                                    />
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                title={'Next'}
                                                placement='bottom-start'
                                                arrow
                                            >
                                                <button
                                                    className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                                    onClick={getNextRow}
                                                >
                                                    <IoChevronForward
                                                        className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                        aria-hidden='true'
                                                    />
                                                </button>
                                            </Tooltip>
                                        </>
                                    )}

                                    <Tooltip
                                        title={'Expand'}
                                        placement='bottom-start'
                                        arrow
                                    >
                                        <button className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'>
                                            <AiOutlineExpandAlt
                                                className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </Tooltip>
                                    <Tooltip
                                        title={'Close'}
                                        placement='bottom-start'
                                        arrow
                                    >
                                        <button
                                            className='rounded-full p-1 outline-none hover:bg-[#f1f1f1]'
                                            onClick={() =>
                                                handleCloseDetail('moreDetail')
                                            }
                                        >
                                            <MdOutlineClose
                                                className='h-6 w-6 flex-shrink-0 cursor-pointer text-gray-500'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className='h-[calc(100vh_-_110px)] overflow-auto lg:mx-auto lg:max-w-full'>
                            <div
                                className='m-auto min-h-[50vh] overflow-auto'
                                style={{ height: 'calc(100vh - 110px)' }}
                            >
                                {showDetail &&
                                    (openEditRelated ? (
                                        <FormDetailRelatedInspections
                                            selectedItem={selectedRow}
                                            refetch={() => {
                                                refetch();
                                                setOpenEditRelated(false);
                                            }}
                                            triggleSubmit={triggleSubmit}
                                            setTriggleSubmit={setTriggleSubmit}
                                            setOpenForm={setShowDetail}
                                            submitError={() =>
                                                setTriggleSubmit(false)
                                            }
                                        />
                                    ) : (
                                        <RelatedInspections />
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <FilterRightBar
                open={openFilter}
                setOpen={setOpenFilter}
                triggleFiter={triggleFiter}
                setTriggleFiter={setTriggleFiter}
            >
                <FilterInstallation
                    fleets={[]}
                    filter={criterias}
                    setFilter={updateFilter}
                    triggleFiter={triggleFiter}
                    setTriggleFiter={setTriggleFiter}
                />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm}>
                <FormInstallation
                    selectedItem={null}
                    refetch={refetch}
                    setTriggleSubmit={setTriggleSubmit}
                    setOpenForm={setOpenForm}
                />
            </FormDisplay>
        </>
    );
};

export default InstallationManagement;
