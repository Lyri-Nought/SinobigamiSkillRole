import React, { useContext } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';

export default function FieldCell({fieldName, index}: {fieldName: string, index: number}){
    const characterData = useContext<DataProviderType | null>(DataContext);

    return (
        <td
            style={{
                paddingLeft: "1rem",
                borderLeft: `${(index === 0) ? "none" : "solid 1px rgb(152, 152, 152)"}`,
                borderBottom: "solid 1px rgb(152, 152, 152)"
            }}
            colSpan={2}
        >
            <FormControlLabel
                className="draggable-disable"
                control={
                    <Checkbox
                        color="primary"
                        checked={characterData?.fields[index]}
                        onClick={() => {
                            if(characterData){
                                characterData.setFields((prev) => {
                                    const newGaps = [...prev];
                                    newGaps[index] = !prev[index];
                                    return newGaps;
                                })
                            }
                        }}
                    />
                }
                label={fieldName}
            />
        </td>
    );
};