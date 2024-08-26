import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const MultipleSelectCheckbox = ({ dataSource, name, label, control, errors, options, setValue, getValues, resetField, ...rest }) => {
    const { t } = useTranslation();

    const [variantName, setVariantName] = useState([]);

    useEffect(_ => {
        setVariantName(control._defaultValues[name])
        // console.log('control', control._defaultValues[name])
    }, [control._defaultValues[name]])

    useEffect(_ => {
        console.log('data', dataSource)
    })

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // console.log(value);

        const filterdValue = value.filter(
            (item) => variantName.findIndex((o) => o.id === item.id) >= 0
        );

        let duplicatesRemoved = value.filter((item, itemIndex) =>
            value.findIndex((o, oIndex) => o.id === item.id && oIndex !== itemIndex)
        );

        // console.log(duplicatesRemoved);

        // let map = {};

        // for (let list of value) {
        //   map[Object.values(list).join('')] = list;
        // }
        // console.log('Using Map', Object.values(map));

        let duplicateRemoved = [];

        value.forEach((item) => {
            // if()
            let index = duplicateRemoved.findIndex((o) => o.id === item.id)
            if (index >= 0) {
                duplicateRemoved.splice(index, 1);
                // duplicateRemoved = duplicateRemoved.filter((x) => x.id !== item.id);

            } else {
                duplicateRemoved.push(item);
            }
        });
        // console.log(duplicateRemoved.map(i => i.id))   

        // console.log(name)
        let ids = duplicateRemoved.map(i => i.id)
        // setValue(name, ids)
        resetField(name, { defaultValue: duplicateRemoved })
        setVariantName(duplicateRemoved);
    };

    const isSelected = (value, record) => {

    }

    // const handleChange = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   const preventDuplicate = value.filter(
    //     (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    //   );
    //   setVariantName(
    //     // On autofill we get a the stringified value.
    //     typeof preventDuplicate === 'string'
    //       ? preventDuplicate.split(',')
    //       : preventDuplicate
    //   );
    // };

    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                    <FormControl
                        variant="outlined"
                        sx={{ m: 0, minWidth: 120 }}
                        fullWidth
                        error={errors ? true : false}
                        {...rest}>
                        <InputLabel >{t(label)}</InputLabel>
                        <Select
                            id="demo-multiple-checkbox"
                            multiple
                            // value={variantName}
                            name={name}
                            ref={ref}

                            fullWidth
                            // onChange={handleChange}
                            onChange={(e) => {
                                // console.log(e)
                                onChange(e);
                                handleChange(e)
                            }}
                            value={value}
                            input={<OutlinedInput label={label} />}
                            renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                            MenuProps={MenuProps}
                        >
                            {dataSource.map((variant) => {
                                return (
                                    <MenuItem key={variant.id} value={variant} disabled={variant.disabled}>
                                        <Checkbox
                                            checked={
                                                variantName && variantName.findIndex((item) => item.id === variant.id) >= 0
                                            }
                                        />
                                        <ListItemText primary={variant.name} />
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        {errors && <FormHelperText>{errors.message}</FormHelperText>}
                    </FormControl>
                )}
            />
        </div>
    );
}

export default MultipleSelectCheckbox
