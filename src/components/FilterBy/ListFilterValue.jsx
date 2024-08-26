import React, { useEffect, useState } from "react"
import { BootstrapInput } from "../FormField/CustomTextField2"
import { Checkbox, FormControlLabel, InputAdornment } from "@mui/material"
import { MdSearch } from "react-icons/md"

const ListFilterValue = ({ name, listData = [], setListData, multiple }) => {

    const [search, setSearch] = useState('')

    useEffect(_ => {
        console.log(search)
    }, [search])

    const handleChange = (e, index) => {
        let a = JSON.parse(JSON.stringify(listData))
        a[index].checked = e.target.checked
        setListData(Object.assign({
            key: name, 
            field: 'children',
            data: [...a]
        }))
    }

    const handleChangeAll = () => {
        if(isCheckAll){
            listData = listData.map(item => Object.assign({
                ...item, 
                checked: false
            }))
        }else{
            listData = listData.map(item => Object.assign({
                ...item, 
                checked: true
            }))
        }
        // let a = obj
        setListData(Object.assign({
            key: name, 
            field: 'children',
            data: [...listData]
        }))
    }

    let isCheckAll = listData.every(i => i.checked)
    let isInde = listData.every(i => !i.checked)

    return (
        <>
            <div className="max-h-[300px] h-full overflow-auto">
                <BootstrapInput startAdornment={<InputAdornment position="start"><MdSearch className="w-6 h-6 text-[15px]" /></InputAdornment>} placeholder="Search" value={search} onChange={e => setSearch(e?.target?.value)}/>
                <div className="mt-2 max-h-[250px] h-full overflow-auto">

                    <div className="flex flex-col flex-wrap">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        padding: '5px 5px 5px 10px'
                                    }}
                                    checked={isCheckAll}
                                    indeterminate={!isCheckAll && !isInde}
                                    name='All'
                                    onChange={handleChangeAll}
                                />
                            }
                            label='All'
                        />
                        {listData && listData.filter(i => i.label.toLowerCase().includes(search)).map((item, index) => (
                            <FormControlLabel
                                key={index}
                                defaultChecked={item.checked}
                                control={
                                    <Checkbox
                                        sx={{
                                            padding: '5px 5px 5px 10px'
                                        }}
                                        // defaultChecked={item.checked}
                                        name={item.name}
                                        checked={item.checked}
                                        onChange={e => handleChange(e, index)}
                                    />
                                }
                                label={item.label}
                            />

                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListFilterValue
