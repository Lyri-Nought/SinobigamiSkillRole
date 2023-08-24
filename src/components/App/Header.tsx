import React from 'react';
import { Paper, IconButton } from '@mui/material';
import Help from './../../svg/Help'
import Triangle from './../../svg/Triangle'

export default function Header() {
    return (
            <Paper
                elevation={4}
                style={{
                    color: "#fff",
                    backgroundColor: 'rgba(44, 44, 44, 0.87)',
                    padding: "0 24px",
                    height: "48px",
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: "bold"
                    }}
                >
                    特技判定
                </div>
                <div style={{margin: "0 0 0 auto"}}>
                    <IconButton
                        className="draggable-disable"
                        edge="end"
                        color="primary"
                        style={{
                            margin: "0",
                            padding: "3px"
                        }}
                    >
                        <Help />
                    </IconButton>
                    <IconButton
                        className="draggable-disable"
                        edge="end"
                        color="primary"
                        style={{
                            margin: "0 -3px 0 4px",
                            padding: "3px"
                        }}
                    >
                        <Triangle />
                    </IconButton>
                </div>
            </Paper>
    );
}