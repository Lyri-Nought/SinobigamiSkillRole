import React from 'react';
import { Paper, FormGroup, FormControlLabel, Button, IconButton, Checkbox } from '@mui/material';
import Help from './../../svg/Help'
import Triangle from './../../svg/Triangle'

export default function Header() {
    return (
        <div style={{margin: "0 0 0 auto"}}>
            <FormControlLabel
                className="draggable-disable"
                control={
                    <Checkbox
                        color="info"
                        // checked={false}
                        onClick={() => {}}
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
    );
}