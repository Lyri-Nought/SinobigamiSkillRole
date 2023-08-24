import React, { useContext } from 'react';
import { FormControlLabel, Button, IconButton, Checkbox } from '@mui/material';
import { DataContext, DataProviderType } from '../../providers/App/DataProvider';
import Triangle from './../../svg/Triangle'

export default function Option() {
    const characterData = useContext<DataProviderType | null>(DataContext);

    return (
        <div
            style={{
                padding: "0 24px",
                margin: "0 0 0 auto",
                borderBottom: "solid 1px rgb(152, 152, 152)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <div>
                <FormControlLabel
                    className="draggable-disable"
                    control={
                        <Checkbox
                            color="info"
                            checked={characterData?.makaiKogaku}
                            onClick={() => {
                                if(characterData) characterData.setMakaiKogaku((prev) => !prev);
                            }}
                        />
                    }
                    label="魔界工学"
                />
                <FormControlLabel
                    className="draggable-disable"
                    control={
                        <Checkbox
                            color="info"
                            // checked={false}
                            onClick={() => {}}
                        />
                    }
                    label="木蓮"
                />
                <Button
                    className="draggable-disable"
                    color="primary"
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                >
                    妖理
                </Button>
                <Button
                    className="draggable-disable"
                    color="primary"
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                >
                    達人
                </Button>
            </div>
            <div>
                <IconButton
                    className="draggable-disable"
                    edge="end"
                    color="primary"
                    style={{
                        margin: "0 -3px 0 4px",
                        padding: "3px"
                    }}
                    onClick={() => {}}
                >
                    <Triangle/>
                </IconButton>
            </div>
        </div>
    );
}