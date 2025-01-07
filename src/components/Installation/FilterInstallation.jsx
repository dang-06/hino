import react, { useEffect, useState } from 'react';
import { CustomAsyncSelect } from '..';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';

const FilterInstallation = ({
    fleets,
    filter,
    setFilter,
    triggleFiter,
    setTriggleFiter
}) => {
    const { t } = useTranslation();

    const [selfFilter, setSelfFilter] = useState({});

    useEffect(
        _ => {
            if (triggleFiter) {
                setFilter(selfFilter);

                setTimeout(_ => {
                    setTriggleFiter(false);
                }, 100);
            }
        },
        [triggleFiter]
    );

    // useEffect(_ => {
    //     if(filter){
    //         setFilter(selfFilter)
    //     }
    // }, [filter])

    const handleChange = e => {};

    return (
        <>
            <div className='flex flex-col gap-3'>
                {/* <div className="w-full">
                    <CustomAsyncSelect
                        label="branchName"
                        data={fleets?.content.map((item) => ({
                            id: item.groupId,
                            text: item.groupName,
                        }))}
                        isFetching={isFetchingFleet}
                        isLoading={isLoadingFleet}
                        // onChange={handleChange}
                        onChange={(e) => setSelfFilter(prevState => ({
                            ...prevState,
                            branchName: e.target.value || null
                        }))}
                    />
                </div> */}
                <div className='w-full'>
                    <TextField
                        label={t('phone')}
                        variant='outlined'
                        name='phone'
                        fullWidth
                        defaultValue={filter.phone}
                        onChange={e =>
                            setSelfFilter(prevState => ({
                                ...prevState,
                                phone: e.target.value || null
                            }))
                        }
                    />
                </div>
                <div className='w-full'>
                    <TextField
                        label={t('fullName')}
                        variant='outlined'
                        name='fullName'
                        fullWidth
                        defaultValue={filter.fullName}
                        onChange={e =>
                            setSelfFilter(prevState => ({
                                ...prevState,
                                fullName: e.target.value || null
                            }))
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default FilterInstallation;
