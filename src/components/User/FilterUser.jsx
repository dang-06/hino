import react, { useEffect, useState } from "react";
import { CustomAsyncSelect } from "..";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FilterUser = ({ fleets, filter, setFilter, triggleFiter, setTriggleFiter }) => {
    const { t } = useTranslation();

    const [selfFilter, setSelfFilter] = useState({roleName: "", userName: "", senderName: ""})

    const listRole = [
        {id: 'ADMIN', value: 'ADMIN'},
        {id: 'LEADER', value: 'LEADER'},
        {id: 'DRIVER', value: 'DRIVER'},
        {id: 'CENTER', value: 'CENTER'},
        {id: 'SENDER', value: 'SENDER'},
        {id: 'RECEIVER', value: 'RECEIVER'},
    ]

    useEffect(_ => {
        if(triggleFiter){
            // console.log(selfFilter)
            setFilter(selfFilter)

            setTimeout(_ => {
                setTriggleFiter(false)
            }, 100)
        }
    }, [triggleFiter])

    // useEffect(_ => {
    //     if(filter){
    //         setFilter(selfFilter)
    //     }
    // }, [filter])


    const handleChange = (e) => {

    }

    return (
        <>
            <div className="flex flex-col gap-3 mt-5">
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
                <div>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>{t("Role")}</InputLabel>
                        <Select
                            // value={filter.roleName} 
                            name="roleName"
                            defaultValue={filter.roleName || ''}
                            label="Role"
                            onChange={(e) => setSelfFilter(prevState => ({
                                ...prevState,
                                roleName: e.target.value || null
                            }))}
                        >
                            <MenuItem value="">All</MenuItem>
                        {listRole?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                                {item.value}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-full mt-2">
                    <TextField 
                        label={t('userName')}
                        variant="outlined"
                        name="userName"
                        fullWidth
                        defaultValue={filter.userName || ''}
                        onChange={(e) => setSelfFilter(prevState => ({
                            ...prevState,
                            userName: e.target.value || null
                        }))}
                    />
                </div>
                <div className="w-full">
                        <TextField
                            label={t('senderName')}
                            variant="outlined"
                            name="senderName"
                            fullWidth
                            defaultValue={filter.senderName || ''}
                            onChange={(e) => setSelfFilter(prevState => ({
                                ...prevState,
                                senderName: e.target.value || null
                            }))}
                        />
                    </div>
                {/* <div className="w-full">
                    <TextField
                        label={t('fullName')}
                        variant="outlined"
                        name="fullName"
                        fullWidth
                        defaultValue={filter.fullName}
                        onChange={(e) => setSelfFilter(prevState => ({
                            ...prevState,
                            fullName: e.target.value || null
                        }))}
                    />
                </div> */}
            </div>

        </>
    )
}

export default FilterUser