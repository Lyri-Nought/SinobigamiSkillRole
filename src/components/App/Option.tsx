import React, { useContext } from 'react';
import { FormControlLabel, Button, IconButton, Checkbox, Tooltip } from '@mui/material';
import { DataContext, DataProviderType } from '../../providers/App/DataProvider';
import Triangle from './../../svg/Triangle'

type Props = {
    isDetailedView: boolean;
    setIsDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
    selecting: number;
    setSelecting: React.Dispatch<React.SetStateAction<number>>;
}

export default function Option({isDetailedView, setIsDetailedView, selecting, setSelecting}: Props) {
    const characterData = useContext<DataProviderType | null>(DataContext);

    // selectingを切り替える関数
    function toggleSelecting(selection: number){
        if(selecting === selection){
            setSelecting(0);
        }else{
            setSelecting(selection);
        }
    }

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
                            onContextMenu={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                event.preventDefault();
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
                            checked={characterData?.mokuren}
                            onClick={() => {
                                if(characterData) characterData.setMokuren((prev) => !prev);
                            }}
                            onContextMenu={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                event.preventDefault();
                                if(characterData) characterData.setMokuren((prev) => !prev);
                            }}
                        />
                    }
                    label="木蓮"
                />
                <Button
                    className="draggable-disable"
                    color={(selecting === 1) ? "info" : "primary"}
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                    onClick={() => toggleSelecting(1)}
                    onContextMenu={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        event.preventDefault();
                        toggleSelecting(1);
                    }}
                >
                    妖理
                </Button>
                <Button
                    className="draggable-disable"
                    color={(selecting === 2) ? "info" : "primary"}
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                    onClick={() => toggleSelecting(2)}
                    onContextMenu={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        event.preventDefault();
                        toggleSelecting(2);
                    }}
                >
                    達人
                </Button>
            </div>
            <div>
                <Tooltip title="詳細表示">
                    <IconButton
                        className="draggable-disable"
                        edge="end"
                        color="primary"
                        style={{
                            margin: "0 -3px 0 4px",
                            padding: "3px",
                            transform: (isDetailedView) ? "rotate(90deg)" : "rotate(-90deg)"
                        }}
                        onClick={() => setIsDetailedView((prev) => !prev)}
                    >
                        <Triangle/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}