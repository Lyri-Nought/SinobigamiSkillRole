import React from 'react';
import { Paper } from '@mui/material';

export default function HelpModal() {
    return (
            <Paper
                elevation={4}
                style={{
                    color: "#fff",
                    backgroundColor: 'rgba(44, 44, 44, 0.87)',
                    borderRadius: "4px 4px 0 0",
                    width: "600px",
                    height: "100%",
                    margin: "3rem"
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: "16px 24px"
                        }}
                    >
                        シノビガミ特技判定ツールの使い方
                    </h2>
                </div>
                <div>
                    <h2>hoge</h2>
                </div>
            </Paper>
    );
}