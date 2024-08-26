import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const CustomCheckbox = ({ name, control, label, size, ...rest }) => {
    const { t } = useTranslation();
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <FormControlLabel
                    control={
                        <Checkbox sx={{paddingTop: 0, paddingBottom: 0}} size={size} checked={value} onChange={onChange} />
                    }
                    label={t(label)}
                />
            )}
        />
    )
}

export default CustomCheckbox